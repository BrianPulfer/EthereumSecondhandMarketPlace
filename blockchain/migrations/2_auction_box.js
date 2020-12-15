const ItemManager = artifacts.require("ItemManager");

//Benefeciary address, auction duration
module.exports = function (deployer) {
  deployer.deploy(ItemManager);
};
