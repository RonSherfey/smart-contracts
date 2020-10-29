const { ether, expectRevert, expectEvent, time } = require('@openzeppelin/test-helpers');
const { web3 } = require('@openzeppelin/test-environment');
const { assert } = require('chai');
const { hex } = require('../utils').helpers;
const { calculateSellValue } = require('../utils').tokenPrice;
const { BN } = web3.utils;
const Decimal = require('decimal.js');
const { accounts } = require('../utils');
const { setupContractState } = require('./utils');

const {
  nonMembers: [fundSource],
  members: [memberOne],
} = accounts;


const sellSpread = 250; // multiplied by 10000

async function assertSellValues(
  { initialAssetValue, mcrEth, maxPercentage, daiRate, ethRate, poolBalanceStep, mcr, maxRelativeError,
    pool1, token, buyValue, poolData, tokenData, tokenController }
) {
  let { a, c, tokenExponent, totalAssetValue, mcrPercentage } = await setupContractState(
    { fundSource, initialAssetValue, mcrEth, daiRate, ethRate, mcr, pool1, token, buyValue, poolData, tokenData }
  );

  let highestRelativeError = 0;
  while (mcrPercentage < maxPercentage * 100) {
    console.log({ totalAssetValue: totalAssetValue.toString(), mcrPercentage: mcrPercentage.toString() });

    const pool1Balance = await web3.eth.getBalance(pool1.address);

    const preEstimatedTokenBuyValue = await mcr.getTokenBuyValue(pool1Balance, buyValue);

    const preBuyBalance = await token.balanceOf(memberOne);

    await pool1.buyTokens(preEstimatedTokenBuyValue, {
      from: memberOne,
      value: buyValue
    });
    const postBuyBalance = await token.balanceOf(memberOne);
    const tokensReceived = postBuyBalance.sub(preBuyBalance);

    const minEthOut = buyValue.mul(new BN(10000 - (sellSpread + 10))).div(new BN(10000));

    const balancePreSell = await web3.eth.getBalance(memberOne);

    const precomputedEthValue =  await mcr.getTokenSellValue(tokensReceived);
    console.log({ precomputedEthValue: precomputedEthValue.toString(),
      postBuyBalance: postBuyBalance.toString(),
      tokensReceived: tokensReceived.toString()});

    await token.approve(tokenController.address, tokensReceived, {
      from: memberOne
    });
    await pool1.sellTokens(tokensReceived, minEthOut, {
      from: memberOne
    });
    const balancePostSell = await web3.eth.getBalance(memberOne);
    const sellEthReceived = Decimal(balancePostSell).sub(Decimal(balancePreSell));

    const expectedEthOut = Decimal(buyValue.toString()).mul(10000 - sellSpread).div(10000);

    //assert(sellEthReceived.lt(expectedEthOut));
    const relativeError = expectedEthOut.sub(sellEthReceived).abs().div(expectedEthOut);
    highestRelativeError = Math.max(relativeError.toNumber(), highestRelativeError);
    console.log({ relativeError: relativeError.toString() });
    assert(
      relativeError.lt(maxRelativeError),
      `Resulting eth value ${sellEthReceived.toFixed()} is not close enough to expected ${expectedEthOut.toFixed()}
       Relative error: ${relativeError}`
    );

    await pool1.sendTransaction({
      from: fundSource,
      value: poolBalanceStep
    });

    ({ totalAssetValue, mcrPercentage } = await mcr.getTotalAssetValueAndMCRPercentage());
  }

  console.log({ highestRelativeError: highestRelativeError.toString() });
}

describe('sellTokens', function () {

  const daiRate = new BN('39459');
  const ethRate = new BN('100');
  const maxPercentage = 400;

  it('burns tokens from member in exchange for 1k ETH for mcrEth = 160k', async function () {
    const { pool1, poolData, token, tokenData, mcr, tokenController } = this;

    const mcrEth = ether('160000');
    const initialAssetValue = mcrEth;
    const buyValue = ether('1000');
    const poolBalanceStep = ether('20000');
    const maxRelativeError = Decimal(0.0005);

    await assertSellValues({
      initialAssetValue, mcrEth, maxPercentage, buyValue, poolBalanceStep, maxRelativeError,
      mcr, pool1, token, poolData, daiRate, ethRate, tokenData, tokenController
    });
  });

  it.only('burns tokens from member in exchange for 1k ETH for mcrEth = 160k', async function () {
    const { pool1, poolData, token, tokenData, mcr, tokenController } = this;

    const mcrEth = ether('160000');
    const initialAssetValue = mcrEth;
    const buyValue = ether('1');
    const poolBalanceStep = ether('20000');
    const maxRelativeError = Decimal(0.0005);

    await assertSellValues({
      initialAssetValue, mcrEth, maxPercentage, buyValue, poolBalanceStep, maxRelativeError,
      mcr, pool1, token, poolData, daiRate, ethRate, tokenData, tokenController
    });
  });
});

