const MilkDelivery = artifacts.require("MilkDelivery");

module.exports = function(deployer){
    deployer.deploy(MilkDelivery);
}