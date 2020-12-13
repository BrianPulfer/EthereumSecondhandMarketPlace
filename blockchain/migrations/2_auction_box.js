const AuctionBox = artifacts.require("AuctionBox");

//Benefeciary address, auction duration
module.exports = function (deployer) {
  deployer.deploy(AuctionBox);
};
