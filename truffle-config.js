const HDWalletProvider = require('@truffle/hdwallet-provider');
require("dotenv").config();

const MNEMONIC = process.env.MNEMONIC;
const ALCHEMY_APP_URL = process.env.ALCHEMY_APP_URL;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      // confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      // timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      // skipDryRun: true,     // Skip dry run before migrations? (default: false for public nets )
      // networkCheckTimeout: 1000000000
    },

    rinkeby: {
      provider: () => new HDWalletProvider(MNEMONIC, `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_APP_URL}`),
      network_id: 4,
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true,     // Skip dry run before migrations? (default: false for public nets )
      networkCheckTimeout: 1000000000
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
     timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "^0.8.0",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
       optimizer: {
         enabled: true,
         runs: 200
       },
      //  evmVersion: "byzantium"
      }
    }
  },

  plugins:[
    'truffle-plugin-verify'
  ],
  
  api_keys:{
    etherscan: ETHERSCAN_API_KEY
  },
  
  db: {
    enabled: false
  }
};
