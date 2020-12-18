const { accounts, web3 } = require('hardhat');
const { ether, expectRevert, time } = require('@openzeppelin/test-helpers');
const { assert } = require('chai');
const Decimal = require('decimal.js');
const { toBN } = web3.utils;
const { buyCover, coverToCoverDetailsArray } = require('../utils/buyCover');
const { getSignedQuote } = require('../utils/getQuote');
const { enrollMember, enrollClaimAssessor } = require('../utils/enroll');
const { hex } = require('../utils').helpers;

const [, member1, member2, member3, member4, coverHolder, nonMember1, payoutAddress] = accounts;

const coverTemplate = {
  amount: 1, // 1 eth
  price: '30000000000000000', // 0.03 eth
  priceNXM: '10000000000000000000', // 10 nxm
  expireTime: '8000000000',
  generationTime: '1600000000000',
  currency: hex('ETH'),
  period: 60,
  contractAddress: '0xC0FfEec0ffeeC0FfEec0fFEec0FfeEc0fFEe0000',
};

const ETH = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';

describe.only('makeCoverBegin', function () {

  beforeEach(async function () {
    await enrollMember(this.contracts, [member1, member2, member3, coverHolder]);
  });

  it.only('buys cover for member, ETH is added to pool, NXM is locked and cover fields stored', async function () {
    const { qd, p1: pool, tk: token, tf: tokenFunctions, qd: quotationData } = this.contracts;
    const cover = { ...coverTemplate };
    const member = member1;

    const poolBalanceBefore = toBN(await web3.eth.getBalance(pool.address));
    const nxmSupplyBefore = await token.totalSupply();
    const memberNXMBalanceBefore = await token.balanceOf(member);
    await buyCover({ ...this.contracts, cover, coverHolder: member });

    const coverCount = await qd.getCoverLength();
    assert.equal(coverCount.toString(), '2');

    const coverId = 1;

    const coverFieldsPart1 = await qd.getCoverDetailsByCoverID1(coverId);
    const coverFieldsPart2 = await qd.getCoverDetailsByCoverID2(coverId);
    const storedCover = { ...coverFieldsPart1, ...coverFieldsPart2 };

    assert.equal(storedCover._memberAddress, member);
    assert.equal(storedCover._scAddress, cover.contractAddress);
    assert.equal(storedCover._currencyCode, web3.utils.padRight(cover.currency, 8));
    assert.equal(storedCover._sumAssured.toString(), cover.amount);
    assert.equal(storedCover.premiumNXM.toString(), cover.priceNXM);
    assert.equal(storedCover.coverPeriod.toString(), cover.period);
    //  TODO: assert validUntil to be uint expiryDate = now.add(uint(_coverPeriod).mul(1 days));
    // assert.equal(storedCover.validUntil.toString(), cover.expireTime);

    const expectedLockedNXM = toBN(cover.priceNXM).divn(10);
    const memberLockedNXM = await tokenFunctions.getUserLockedCNTokens(member, 1);
    assert.equal(memberLockedNXM.toString(), expectedLockedNXM.toString());

    const poolBalanceAfter = toBN(await web3.eth.getBalance(pool.address));
    assert.equal(poolBalanceAfter.toString(), poolBalanceBefore.add(toBN(cover.price)).toString());

    const totalSumAssured = await qd.getTotalSumAssured(hex('ETH'));
    const expectedTotalSumAsssured = toBN(cover.amount);
    assert.equal(totalSumAssured.toString(), expectedTotalSumAsssured.toString());

    const memberNXMBalanceAfter = await token.balanceOf(member);
    assert.equal(memberNXMBalanceAfter.toString(), memberNXMBalanceBefore.toString());

    const expectedTotalNXMSupply = nxmSupplyBefore.add(expectedLockedNXM);
    const totalNXMSupplyAfter = await token.totalSupply();
    assert.equal(expectedTotalNXMSupply.toString(), totalNXMSupplyAfter.toString());
  });

  it('reverts when currency is not ETH', async function () {
    const cover = { ...coverTemplate, currency: hex('DAI') };
    await expectRevert(
      buyCover({ ...this.contracts, cover, coverHolder: member1 }),
      'Pool: Unexpected asset type',
    );
  });

  it('reverts for non-member', async function () {
    const cover = { ...coverTemplate };
    await expectRevert(
      buyCover({ ...this.contracts, cover, coverHolder: nonMember1 }),
      'Caller is not a member',
    );
  });

  it('reverts if msg.value does not match cover premium', async function () {
    const { qt, p1 } = this.contracts;
    const cover = { ...coverTemplate };

    const vrsData = await getSignedQuote(
      coverToCoverDetailsArray(cover),
      cover.currency,
      cover.period,
      cover.contractAddress,
      qt.address,
    );

    await expectRevert(p1.makeCoverBegin(
      cover.contractAddress,
      cover.currency,
      coverToCoverDetailsArray(cover),
      cover.period,
      vrsData[0],
      vrsData[1],
      vrsData[2],
      { from: coverHolder, value: toBN(cover.price).subn(1) },
    ),
    'Pool: ETH amount does not match premium',
    );
  });

  it('revert if smart contract address is the 0 address', async function () {
    const cover = { ...coverTemplate, contractAddress: '0x0000000000000000000000000000000000000000' };
    await expectRevert(
      buyCover({ ...this.contracts, cover, coverHolder: nonMember1 }),
      'Caller is not a member',
    );
  });

  it('revert if smart contract address is the 0 address', async function () {
    const cover = { ...coverTemplate, contractAddress: '0x0000000000000000000000000000000000000000' };
    await expectRevert(
      buyCover({ ...this.contracts, cover, coverHolder: nonMember1 }),
      'Caller is not a member',
    );
  });
});