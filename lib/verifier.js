const fs = require('fs');
const path = require('path');
const { artifacts } = require('hardhat');
const fetch = require('node-fetch');

const { sleep, to } = require('./helpers');
const flatten = require('truffle-flattener');

const ETHERSCAN_SUBDOMAIN = {
  mainnet: 'api',
  rinkeby: 'api-rinkeby',
  ropsten: 'api-ropsten',
  kovan: 'api-kovan',
  goerli: 'api-goerli',
};

class Verifier {

  constructor (web3, apiKey, network) {
    this.web3 = web3;
    this.apiKey = apiKey;
    this.network = network;
    this.root = path.normalize(path.join(__dirname, '..'));
    this.addresses = {};
    this.sources = {};
  }

  add (name, address, argTypes, argValues) {

    if (!this.addresses[name]) {
      this.addresses[name] = new Set();
    }

    const constructorArgs = argTypes && argTypes.length
      ? this.web3.eth.abi.encodeParameters(argTypes, argValues)
      : null;

    this.addresses[name].add({ address, constructorArgs });
  }

  dump () {
    return Object.keys(this.addresses).reduce((list, name) => ({
      ...list,
      [name]: [...this.addresses[name]].map(c => c.address),
    }), {});
  }

  async submit () {

    if (typeof ETHERSCAN_SUBDOMAIN[this.network] !== 'string') {
      console.log(`Verification skipped: network "${this.network}" is not supported`);
      return;
    }

    const results = [];

    for (const contractName of Object.keys(this.addresses)) {

      const artifact = await artifacts.readArtifact(contractName);
      const { sourceName } = artifact;

      const fqn = `${sourceName}:${contractName}`;
      const { input, solcLongVersion: compilerVersion } = await artifacts.getBuildInfo(fqn);
      const { enabled: optimizer, runs: optimizerRuns } = input.settings.optimizer;

      const contractSource = await flatten([sourceName], this.root);
      const savepath = path.join(this.root, 'build/flattened');

      fs.mkdirSync(savepath, { recursive: true }); // make sure the directory exist
      fs.writeFileSync(path.join(savepath, `${contractName}.sol`), contractSource);

      for (const details of this.addresses[contractName]) {

        const { address: contractAddress, constructorArgs } = details;

        const args = {
          contractAddress,
          contractSource,
          contractName,
          constructorArgs,
          compilerVersion,
          optimizer,
          optimizerRuns,
        };

        const [, verifyError] = await to(this.verify(args));

        if (verifyError) {
          console.log(`Failed to verify ${contractName} @ ${contractAddress}`);
          console.log('Error:', verifyError.stack);
          throw verifyError;
        }

        results.push({ contractName, contractAddress });
      }
    }

    return results;
  }

  async verify (params) {

    const {
      contractAddress,
      contractName,
      contractSource,
      constructorArgs,
      compilerVersion,
      optimizer,
      optimizerRuns,
    } = params;

    const apikey = this.apiKey;
    const network = this.network;

    if (!ETHERSCAN_SUBDOMAIN[network]) {
      throw new Error(`Unknown network ${network}`);
    }

    const apiSubdomain = ETHERSCAN_SUBDOMAIN[network];
    const etherscanApiUrl = `https://${apiSubdomain}.etherscan.io/api`;

    // drop suffix and prefix with `v`:
    // 0.5.7+commit.6da8b019.Emscripten.clang -> 0.5.7+commit.6da8b019
    const compilerRegex = /^(\d+\.\d+\.\d+\+commit\.[0-9a-f]{8}).*$/;
    const compiler = compilerVersion.replace(compilerRegex, 'v$1');

    // drop 0x prefix
    const constructorArguements = (constructorArgs || '').replace(/^0x/, '');

    const method = 'POST';
    const headers = { 'Content-type': 'application/x-www-form-urlencoded' };
    const data = {
      apikey,
      module: 'contract',
      action: 'verifysourcecode',
      contractaddress: contractAddress,
      contractname: contractName,
      sourceCode: contractSource,
      constructorArguements, // intentional typo - original etherscan API has this quirk
      compilerversion: compiler,
      optimizationUsed: optimizer ? 1 : 0,
      runs: optimizerRuns,
    };

    const fetchOptions = { method, headers, body: new URLSearchParams(data).toString() };
    let attempts = 5;

    console.log('Verifying', {
      contractAddress,
      contractName,
      compiler,
      apiSubdomain,
    });

    while (true) {

      const response = await fetch(etherscanApiUrl, fetchOptions);
      const responseBody = await response.json();
      const { status, message, result } = responseBody;

      // etherscan didn't see the contract code yet, retry in 5 seconds
      if (
        typeof result === 'string' &&
        result.startsWith('Unable to locate ContractCode') &&
        --attempts > 0
      ) {
        await sleep(10000);
        continue;
      }

      if (response.status !== 200 || status !== '1') {
        throw new Error(`Verification failed: status=${status}, message=${message}, result=${result}`);
      }

      return responseBody;
    }
  }

}

module.exports = Verifier;
