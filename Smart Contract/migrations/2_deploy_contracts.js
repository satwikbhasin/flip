const CoinFlipContract = artifacts.require("CoinFlipContract");

module.exports = function(deployer) {
  deployer.deploy(CoinFlipContract);
};
