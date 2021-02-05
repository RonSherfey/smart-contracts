const fetch = require('node-fetch');
const { artifacts, web3, accounts, network } = require('hardhat');
const { ether, expectRevert, time } = require('@openzeppelin/test-helpers');
const Decimal = require('decimal.js');

const { submitGovernanceProposal } = require('./utils');
const { hex } = require('../utils').helpers;
const { ProposalCategory, Role } = require('../utils').constants;

const {
  toDecimal,
  calculateRelativeError,
  percentageBN,
  calculateEthForNXMRelativeError,
} = require('../utils').tokenPrice;

const { BN, toBN } = web3.utils;

const OwnedUpgradeabilityProxy = artifacts.require('OwnedUpgradeabilityProxy');
const MemberRoles = artifacts.require('MemberRoles');
const Pool = artifacts.require('Pool');
const NXMaster = artifacts.require('NXMaster');
const TemporaryNXMaster = artifacts.require('TemporaryNXMaster');
const NXMToken = artifacts.require('NXMToken');
const Governance = artifacts.require('Governance');
const PoolData = artifacts.require('PoolData');
const TokenFunctions = artifacts.require('TokenFunctions');
const Claims = artifacts.require('Claims');
const ClaimsReward = artifacts.require('ClaimsReward');
const Quotation = artifacts.require('Quotation');
const MCR = artifacts.require('MCR');
const Pool2 = artifacts.require('Pool2');
const LegacyPool1 = artifacts.require('LegacyPool1');
const LegacyMCR = artifacts.require('LegacyMCR');
const PriceFeedOracle = artifacts.require('PriceFeedOracle');
const ERC20 = artifacts.require('ERC20');
const SwapAgent = artifacts.require('SwapAgent');
const TwapOracle = artifacts.require('TwapOracle');
const QuotationData = artifacts.require('QuotationData');
const ClaimsData = artifacts.require('ClaimsData');

const Address = {
  ETH: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
  DAI: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  SAI: '0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359',
  WNXM: '0x0d438F3b5175Bebc262bF23753C1E53d03432bDE',
  DAIFEED: '0x773616E4d11A78F511299002da57A0a94577F1f4',
  UNIFACTORY: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
  NXMHOLDER: '0xd7cba5b9a0240770cfd9671961dae064136fa240',
};

let isHardhat;
const hardhatRequest = async (...params) => {

  if (isHardhat === undefined) {
    const nodeInfo = await web3.eth.getNodeInfo();
    isHardhat = !!nodeInfo.match(/Hardhat/);
  }

  if (isHardhat) {
    return network.provider.request(...params);
  }
};

const getAddressByCodeFactory = abis => code => abis.find(abi => abi.code === code).address;
const fund = async to => web3.eth.sendTransaction({ from: accounts[0], to, value: ether('1000000') });
const unlock = async member => hardhatRequest({ method: 'hardhat_impersonateAccount', params: [member] });

const claimIds = [72, 73, 74, 75];

describe.only('NXM sells and buys', function () {

  this.timeout(0);

  it('initializes contracts', async function () {

    const { mainnet: { abis } } = await fetch('https://api.nexusmutual.io/version-data/data.json').then(r => r.json());
    const getAddressByCode = getAddressByCodeFactory(abis);

    const masterAddress = getAddressByCode('NXMASTER');
    const token = await NXMToken.at(getAddressByCode('NXMTOKEN'));
    const memberRoles = await MemberRoles.at(getAddressByCode('MR'));
    const governance = await Governance.at(getAddressByCode('GV'));
    const pool1 = await LegacyPool1.at(getAddressByCode('P1'));
    const poolData = await PoolData.at(getAddressByCode('PD'));
    const mcr = await LegacyMCR.at(getAddressByCode('MC'));
    const quotationData = await QuotationData.at(getAddressByCode('QD'));
    const claimsData = await ClaimsData.at(getAddressByCode('CD'));
    const claims = await Claims.at(getAddressByCode('CL'));
    const master = await NXMaster.at(masterAddress);

    this.masterAddress = masterAddress;
    this.master = master;
    this.token = token;
    this.memberRoles = memberRoles;
    this.governance = governance;
    this.pool1 = pool1;
    this.poolData = poolData;
    this.mcr = mcr;
    this.getAddressByCode = getAddressByCode;
    this.quotationData = quotationData;
    this.claimsData = claimsData;
    this.claims = claims;
    this.master = master;
  });

  it('fetches board members and funds accounts', async function () {

    const { memberArray: boardMembers } = await this.memberRoles.members('1');
    const voters = boardMembers.slice(0, 5);

    for (const member of [...voters, Address.NXMHOLDER]) {
      await fund(member);
      await unlock(member);
    }

    this.voters = voters;
  });

  it('assess claim 72', async function () {
    const { quotationData, claimsData, claims, master, voters } = this;

    const coverHolder = '';

    const claimId = 72;

    const data = await claimsData.getClaim(claimId);

    console.log(data);

    const cover = await quotationData.getCoverDetailsByCoverID1(data.coverId);
    console.log({
      sumAssured: cover._sumAssured.toString(),
      _memberAddress: cover._memberAddress.toString(),
    });
    const memberAddress = cover._memberAddress;
    const sumAssuredWei = ether(cover._sumAssured.toString());

    const balanceBefore = await web3.eth.getBalance(memberAddress);

    const minVotingTime = await claimsData.minVotingTime();
    const maxVotingTime = await claimsData.maxVotingTime();
    await time.increase(maxVotingTime.addn(1));
    //     await claims.submitCAVote(claimId, '1', { from: voter1 });

    const voteStatusAfter = await claims.checkVoteClosing(claimId);
    console.log({
      voteStatusAfter: voteStatusAfter.toString(),
    });
    assert(voteStatusAfter.toString(), '-1', 'voting should be closed');

    await master.closeClaim(claimId, {
      from: voters[0],
    }); // trigger changeClaimStatus

    const { statno: claimStatus } = await claimsData.getClaimStatusNumber(claimId);
    assert.strictEqual(claimStatus.toNumber(), 14, 'claim status should be 14 (accepted, payout done)');

    const balanceAfter = await web3.eth.getBalance(memberAddress);

    assert(balanceAfter.sub(balanceBefore), sumAssuredWei.toString());

    // const [coverId] = await quotationData.getAllCoversOfUser(coverHolder);
    // // await claims.submitClaim(coverId, { from: coverHolder });
    //
    // const minVotingTime = await claimsData.minVotingTime();
    // await time.increase(minVotingTime.addn(1));
    // await claims.submitCAVote(claimId, '1', { from: voter1 });
    //
    // const voteStatusAfter = await claims.checkVoteClosing(claimId);
    // assert(voteStatusAfter.eqn(-1), 'voting should be closed');
    //
    // const { statno: claimStatus } = await claimsData.getClaimStatusNumber(claimId);
    // assert.strictEqual(claimStatus.toNumber(), 14, 'claim status should be 14 (accepted, payout done)');
    //
    // const balanceAfter = toBN(await web3.eth.getBalance(payoutAddress));
  });
});
