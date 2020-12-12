var SimpleAuction = artifacts.require("./SimpleAuction.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleAuction, 6000, "0x3328d0173de51d85b666ddb6562af2a72892382d");
};
