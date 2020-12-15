const Item = artifacts.require("Item");

module.exports = function (deployer) {
  deployer.deploy(Item, 6000, "0xbd6ff06a0178a5c3677a85e45b46c25f64843731",'url', 'title', 'description');
};
