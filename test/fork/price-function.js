const fetch = require('node-fetch');
const { artifacts, run, web3, accounts} = require('hardhat');
const { ether, time } = require('@openzeppelin/test-helpers');

const { encode1 } = require('./external');
const { logEvents, hex } = require('../utils').helpers;

const MemberRoles = artifacts.require('MemberRoles');
const Pool1 = artifacts.require('Pool1');
const NXMaster = artifacts.require('NXMaster');
const NXMToken = artifacts.require('NXMToken');
const Governance = artifacts.require('Governance');
const PooledStaking = artifacts.require('PooledStaking');
const TokenController = artifacts.require('TokenController');
const TokenFunctions = artifacts.require('TokenFunctions');
const Claims = artifacts.require('Claims');
const MCR = artifacts.require('MCR');
const PriceFeedOracle = artifacts.require('PriceFeedOracle');

const upgradeProxyImplementationCategoryId = 5;
const newContractAddressUpgradeCategoryId = 29;
const addNewInternalContractCategoryId = 34;

async function submitGovernanceProposal (categoryId, actionHash, members, gv, submitter) {

  const proposalTitle = 'proposal';
  const proposalSD = 'proposal';
  const proposalDescHash = 'proposal';
  const incentive = 0;
  const proposalId = await gv.getProposalLength();
  console.log(`Creating proposal ${proposalId}`);

  await gv.createProposal(proposalTitle, proposalSD, proposalDescHash, 0, { from: submitter });
  await gv.categorizeProposal(proposalId, categoryId, incentive, { from: submitter });
  await gv.submitProposalWithSolution(proposalId, 'proposal', actionHash, { from: submitter });

  console.log(`Voting for proposal ${proposalId}`);

  for (let i = 0; i < members.length; i++) {
    await gv.submitVote(proposalId, 1, { from: members[i] });
  }

  console.log(`Closing proposal`);
  await time.increase(604800);
  logEvents(await gv.closeProposal(proposalId, { from: submitter }));

  const proposal = await gv.proposal(proposalId);
  assert.equal(proposal[2].toNumber(), 3);
}

describe('payout address update', function () {
  this.timeout(0);

  it('performs contract upgrades', async function () {
    const versionData = await fetch('https://api.nexusmutual.io/version-data/data.json').then(r => r.json());
    console.log(versionData);
    const [{ address: masterAddress }] = versionData.mainnet.abis.filter(({ code }) => code === 'NXMASTER');
    const master = await NXMaster.at(masterAddress);

    const { contractsName, contractsAddress } = await master.getVersionData();
    console.log(contractsName);

    const nameToAddressMap = {
      NXMTOKEN: await master.dAppToken(),
    };

    for (let i = 0; i < contractsName.length; i++) {
      nameToAddressMap[web3.utils.toAscii(contractsName[i])] = contractsAddress[i];
    }

    const mr = await MemberRoles.at(nameToAddressMap['MR']);
    const tk = await NXMToken.at(nameToAddressMap['NXMTOKEN']);
    const gv = await Governance.at(nameToAddressMap['GV']);

    const [funder] = accounts;

    console.log('Fetch board members..');
    const members = await mr.members('1');
    const boardMembers = members.memberArray;

    console.log(boardMembers);

    for (const member of boardMembers) {
      console.log(`Topping up ${member}`);
      await web3.eth.sendTransaction({ from: funder, to: member, value: ether('100') });
    }

    const firstBoardMember = boardMembers[0];

    /*
     Required upgrades:
       contracts/modules/capital/MCR.sol
       contracts/modules/capital/Pool1.sol
       contracts/modules/claims/Claims.sol
       contracts/modules/token/TokenFunctions.sol
       contracts/oracles/PriceFeedOracle.sol
    */


    console.log(`Deploying new TokenFunctions..`);
    const newTF = await TokenFunctions.new({ from: firstBoardMember });

    console.log(`Deploying new Claims..`);
    const newCL = await Claims.new({ from: firstBoardMember });

    console.log(`Deploying new MCR..`);
    const newMCR = await MCR.new({ from: firstBoardMember });


    console.log(`Deploying PriceFeedOracle..`);
    const assets = [];
    const aggregators = [];
    const daiAddress = '0x6b175474e89094c44da98b954eedeac495271d0f';
    const priceFeedOracle = await PriceFeedOracle.new(assets, aggregators, daiAddress);

    console.log(`Deploying new Pool..`);
    const newP1 = await Pool1.new(priceFeedOracle.address, { from: firstBoardMember });

    const upgradeMultipleContractsActionHash = encode1(
      ['bytes2[]', 'address[]'],
      [[hex('TF'), hex('CL'), hex('MCR'), hex('P1')], [newTF.address, newCL.address, newMCR.address, newP1.address]],
    );

    await submitGovernanceProposal(
      newContractAddressUpgradeCategoryId, upgradeMultipleContractsActionHash, boardMembers, gv, boardMembers[1],
    );

    const storedTFAddress = await master.getLatestAddress(hex('TF'));
    const storedCLAddress = await master.getLatestAddress(hex('CL'));
    const storedMCRAddress = await master.getLatestAddress(hex('MCR'));
    const storedP1Address = await master.getLatestAddress(hex('P1'));

    assert.equal(storedTFAddress, newTF.address);
    assert.equal(storedCLAddress, newCL.address);
    assert.equal(storedMCRAddress, newMCR.address);
    assert.equal(storedP1Address, newP1.address);

    console.log(`Successfully upgraded.`);

    this.firstBoardMember = firstBoardMember;
    this.master = master;
    this.tk = tk;
    this.tc = await TokenController.at(await master.getLatestAddress(hex('TC')));
    this.ps = await PooledStaking.at(await master.getLatestAddress(hex('PS')));

  });
})