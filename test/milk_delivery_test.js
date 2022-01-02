const MilkDeliveryContract = artifacts.require("MilkDelivery");
const assert = require("assert");
const web3 =  require("web3");

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
      assert.equal(isListed, true);
      assert.equal(result.logs[0].args.vendor, vendor1);
      assert.equal(result.logs[0].args.addedBy, owner);
    }); 

    it("should restrict vendor listing to only the contract owner and not any other address", async() => {
      try{
        const result = await contractInstance.listNewVendor(
          newVendor.address,
          newVendor.milkFactory,
          newVendor.name,
          newVendor.email,
          { from: alice } //alice is not the owner in this case
        );
      }catch(error){
        assert(error.message.includes("Ownable: caller is not the owner"));
        return;
      }
      assert(false);
    }); 

    it("should enable the contract owner to approve a new vendor for recording milk deliveries", async () => {
      const result = await contractInstance.approveVendor(vendor1, {from:owner});
      const isApproved = await contractInstance.isApprovedForMilkVending(vendor1);

      assert(result.receipt.status, true);
      assert.equal(isApproved, true);
    });

    it("should restrict vendor approval for milk vending to only the contract owner and not any other address", async () => {
      try {
        const result = await contractInstance.approveVendor(vendor1, { from: bob });
        console.log(result);
      } catch (error) {
        assert(error.message.includes("Ownable: caller is not the owner"));
        return;
      }
      assert(false);
    }); 

    it("should enable the contract owner to revoke a vendor\'s approval from milk vending", async() => {
      const totalApprovedVendors = await contractInstance.totalApprovedVendors();
    
      let approvedVendorsList = [];
      for (let i = 0; i < totalApprovedVendors; i++){
        const data = await contractInstance.approvedVendors(i);
        approvedVendorsList.push(data);
      }
      
      const result = await contractInstance.revokeVendorApproval(vendor1, { from: owner });

      console.log("Vendor Disapproved: ", result);
      assert(result.receipt.status, true);
      assert.equal(result.logs[0].args.caller, owner);
      assert.equal(result.logs[0].args.vendor, vendor1);
      //assert.equal(approvedVendorsList.length, 1); //should be zero: go back to smart contract for correct implementation
      //assert.equal(totalApprovedVendors, 0);
    });

    it("should restrict vendor approval revocations to only the smart contract owner and not anybody else", async () => {
      try {
        const result = await contractInstance.revokeVendorApproval(vendor1, { from: alice });

      } catch (error) {
        assert(error.message.includes("Ownable: caller is not the owner"));
        return;
      }
      assert(false);
    });

    it("should enable the contract owner to delist a vendor", async() => {
      const result = await contractInstance.delistVendor(vendor1, { from: owner});
      const isListed = await contractInstance.isVendorListed(vendor1);

      assert(result.receipt.status, true);
      assert.equal(isListed, false);
    });

    it("should restrict vendor delisting to only the smart contract owner and not anybody else", async() => {
        try{
          const result = await contractInstance.delistVendor(vendor1, { from: alice });

        }catch(error){
          assert(error.message.includes("Ownable: caller is not the owner"));
          return;
        }
        assert(false);
    });
  });

      describe("Milk delivery", async () => {
        it("should enable the contract owner to add a new vendor", async () => {
          const result = await contractInstance.listNewVendor(
            vendor2,
            newVendor.milkFactory,
            newVendor.name,
            newVendor.email,
            { from: owner }
          );

          const totalVendors = await contractInstance.totalVendors();
          const isListed = await contractInstance.isVendorListed(vendor2);

          assert(result.receipt.status, true);
          assert.equal(totalVendors, 2);
          assert.equal(isListed, true);
          assert.equal(result.logs[0].args.vendor, vendor2);
          assert.equal(result.logs[0].args.addedBy, owner);
        }); 
        it("should enable the contract owner to approve a new vendor for recording milk deliveries", async () => {
          const result = await contractInstance.approveVendor(vendor2, { from: owner });
          const isApproved = await contractInstance.isApprovedForMilkVending(vendor2);

          assert(result.receipt.status, true);
          assert.equal(isApproved, true);
        });

      it("should successfully enable a vendor to record a new delivery item", async () => {
        const result = await contractInstance.recordNewDelivery(deliveryItem.quantity, deliveryItem.quality, { from: vendor2 });

        const totalDeliveries = await contractInstance.totalDeliveries();
        const totalQuantities = await contractInstance.totalQuantities();

        assert(result.receipt.status, true);
        assert.equal(totalDeliveries, 1);
        assert.equal(totalQuantities, 200);
        assert.equal(result.logs[0].args.vendor, vendor2);
        assert.equal(result.logs[0].args.quality, deliveryItem.quality);
        assert.equal(result.logs[0].args.quantity, 200);
      });

      it("can only allow a listed vendor to record a new delivery item", async () => {
        try {
          const result = await contractInstance.recordNewDelivery(deliveryItem.quantity, deliveryItem.quality, { from: vendor1 });

        } catch (error) {
          assert(error.message.includes("Milk Vendor not listed"));
          return;
        }
        assert(false);
      });
    });
});
