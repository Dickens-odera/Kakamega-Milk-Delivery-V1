const MilkDeliveryContract = artifacts.require("MilkDelivery");

contract("MilkDeliveryContract", function (accounts) {
  let contractInstance;
  beforEach(async() => {
    contractInstance = await MilkDeliveryContract.deploye();
    [owner, alice, bob, vendor1, vendor2] = accounts;
  });
  describe("deployment", function () {
    it("should deploy successfully", async() => {
      assert(contractInstance,"milk delivery contract deployed successfully");
    });
  });

  describe("Milk delivery", async() => {
    it("should enable the contract owner to approve a new vendor", async() => {
      const result = await contractInstance.approveVendor(vendor1);
      
    });

    it("should successfully enable a vendor to record a new delivery item", async() => {
        
    });
  });
});
