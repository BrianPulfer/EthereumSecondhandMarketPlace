const SimpleAuction = artifacts.require("SimpleAuction");

//Benefeciary address, auction duration
module.exports = function (deployer) {
  deployer.deploy(SimpleAuction, 600, "0xbd6ff06a0178a5c3677a85e45b46c25f64843731");
};
