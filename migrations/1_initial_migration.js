require('dotenv').config()
const UnifundSmartContract = artifacts.require("UnifundSmartContract");

module.exports = function(deployer) {
  deployer.deploy(UnifundSmartContract, process.env[`${process.env.MODE}_USDF_CONTRACT_ADDRESS`]);
};

//utool migrate --network mainnet --reset



