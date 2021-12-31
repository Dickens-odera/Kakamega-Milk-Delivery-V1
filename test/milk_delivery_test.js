const MilkDeliveryContract = artifacts.require("MilkDelivery");
const assert = require("assert");

contract("MilkDeliveryContract", function (accounts) {
  let contractInstance;
  let newVendor;
  let deliveryItem;
  beforeEach(async() => {
    contractInstance = await MilkDeliveryContract.deployed();
    [owner, alice, bob, vendor1, vendor2, vendor3] = accounts;

    newVendor = {
          address: vendor1,
          milkFactory: "Milk Burgers",
          name:"John Doe", 
          email: "john@milk.burgers.com"
      };

    deliveryItem = {
      quantity: 200,
      quality: 1
    };
  });

  describe("deployment", function () {
    it("should deploy successfully", async() => {
      assert(contractInstance,"milk delivery contract deployed successfully");
    });
  });

  describe("Vendor functionalities", async() => {
    it("should enable the contract owner to add a new vendor", async() => {
      const result = await contractInstance.listNewVendor(
        newVendor.address,
        newVendor.milkFactory, 
        newVendor.name, 
        newVendor.email,
        {from: owner}
        );

      const totalVendors = await contractInstance.totalVendors();
      const isListed = await contractInstance.isVendorListed(vendor1);

      assert(result.receipt.status, true);
      assert.equal(totalVendors, 1);
      assert.equal(isListed, true);;
      assert.equal(result.logs[0].args.vendor, vendor1);
      assert.equal(result.logs[0].args.addedBy, owner);
    }); 

    it("should enable the contract owner to approve a new vendor for recording milk deliveries", async () => {
      const result = await contractInstance.approveVendor(vendor1, {from:owner});
      const isApproved = await contractInstance.isApprovedForMilkVending(vendor1);

      assert(result.receipt.status, true);
      assert.equal(isApproved, true);
    });
  });

  describe("Milk delivery", async() => {
    it("should successfully enable a vendor to record a new delivery item", async() => {
      const result = await contractInstance.recordNewDelivery(deliveryItem.quantity,deliveryItem.quality, {from: vendor1});

      const totalDeliveries = await contractInstance.totalDeliveries();
      const totalQuantities = await contractInstance.totalQuantities();

      assert(result.receipt.status, true);
      assert.equal(totalDeliveries, 1);
      assert.equal(totalQuantities, 200);
      assert.equal(result.logs[0].args.vendor, vendor1);
      assert.equal(result.logs[0].args.quality, deliveryItem.quality);
      assert.equal(result.logs[0].args.quantity, 200);
    });

    it("can only allow a listed vendor to record a new delivery item", async() => {
        try{
          const result = await contractInstance.recordNewDelivery(deliveryItem.quantity, deliveryItem.quality, { from: vendor2 });

        }catch(error){
          assert(error.message.includes("Milk Vendor not listed"));
          return;
        }
        assert(false);
    });
  });
});
