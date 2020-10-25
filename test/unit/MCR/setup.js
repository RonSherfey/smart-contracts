const { contract, defaultSender } = require('@openzeppelin/test-environment');
const { ether, expectRevert } = require('@openzeppelin/test-helpers');
const { assert } = require('chai');

const { Role, ParamType } = require('../utils').constants;
const accounts = require('../utils').accounts;
const { hex } = require('../utils').helpers;

const MasterMock = contract.fromArtifact('MasterMock');
const PoolData = contract.fromArtifact('PoolData');
const TokenData = contract.fromArtifact('TokenData');
const TokenMock = contract.fromArtifact('NXMTokenMock');
const Pool1 = contract.fromArtifact('Pool1');
const MCR = contract.fromArtifact('MCR');

async function setup () {

  const master = await MasterMock.new();

  const daiFeedAddress = '0x0000000000000000000000000000000000000001';
  const daiAddress = '0x0000000000000000000000000000000000000011';

  const poolData = await PoolData.new(accounts.notariseAddress, daiFeedAddress, daiAddress);
  const tokenData = await TokenData.new(accounts.notariseAddress);
  const pool1 = await Pool1.new();
  const token = await TokenMock.new();
  const mcr = await MCR.new();
  await token.mint(defaultSender, ether('10000'));

  // set contract addresses
  await master.setTokenAddress(token.address);
  await master.setLatestAddress(hex('P1'), pool1.address);
  await master.setLatestAddress(hex('PD'), poolData.address);
  await master.setLatestAddress(hex('TD'), tokenData.address);
  await master.setLatestAddress(hex('MC'), mcr.address);

  await mcr.changeMasterAddress(master.address);
  await mcr.changeDependentContractAddress();

  await pool1.changeMasterAddress(master.address);
  await pool1.changeDependentContractAddress();

  for (const member of accounts.members) {
    await master.enrollMember(member, Role.Member);
  }

  for (const advisoryBoardMember of accounts.advisoryBoardMembers) {
    await master.enrollMember(advisoryBoardMember, Role.AdvisoryBoard);
  }

  for (const internalContract of accounts.internalContracts) {
    await master.enrollInternal(internalContract);
  }

  // there is only one in reality, but it doesn't matter
  for (const governanceContract of accounts.governanceContracts) {
    await master.enrollGovernance(governanceContract);
  }

  // initialize token
  // await token.setOperator(tokenController.address);


  this.master = master;
  this.token = token;
  this.pool1 = pool1;
  this.mcr = mcr;
  this.poolData = poolData;
  this.tokenData = tokenData;
}

module.exports = setup;