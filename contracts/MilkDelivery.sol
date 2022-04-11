// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./interfaces/MilkDeliveryInterface.sol";

/**
  * @title Milk Delivery Contract
  * @dev A smart contract that enables dairy farmers to record their daily produce
 */
contract MilkDelivery is Ownable, AccessControl,MilkDeliveryInterface {
  using SafeMath for uint256;
  using Counters for Counters.Counter;

  Counters.Counter private milkDeliveryIds; //to help track milk delivery items by ID e.g 1
  Counters.Counter private vendorIds; //to help track vendors by ID e.g 1
  Counters.Counter private farmerIds;

  enum MILK_QUALITY_TYPE { GOOD, STALE, PERFECT, BAD } //quality types
  MILK_QUALITY_TYPE public milkQualityType; //in order to access the enum via a variable

  //Vendor struct with vendor particulars/details
  struct Vendor{
    uint id;
    string milkFactory;
    string name;
    string email;
    address payable vendorAddress;
    uint createdAt;
    //bool isApproved;
    //bool isListed;
  }

  //Delivery struct with delivery item particulars
  struct MilkDeliveryItem{
    address payable vendor;
    uint id;
    uint date;
    uint quantity;
    uint farmerId;
    MILK_QUALITY_TYPE milkQualityType;
  }

  struct Farmer{
    uint id;
    string firstName;
    string lastName;
    bytes email;
    bytes phoneNumber;
    int idNumber;
    bytes location;
    address payable farmerAddress;
    uint createdAt;
  }

  uint public totalVendors = 0; //total vendors initialised to 0
  uint public totalQuantities = 0; //keeps track of total milk quantity recorded on-chain
  uint public totalDeliveries = 0; //to handle incrementing of overral milk quantities
  uint public totalApprovedVendors = 0; // shall be incremented and decremented accordingly

  uint public totalFarmers = 0;

  Vendor[] public vendors; //an array of the vendors
  MilkDeliveryItem[] public milkDeliveries; //to help keep track of delivery items as an array
  address[] public approvedVendors; //the addresses of the approved vendors
  
  Farmer[] public farmers;

  mapping(address => bool) public isApprovedForMilkVending; //a boolean indicating whether a vendor has been approved
  mapping(address => MilkDeliveryItem) public deliveryItemByVendor; //get the delivery item by vendor identified by an address
  mapping(address => mapping(uint => uint)) public vendorQuantityByDate; //keeps track of the total quantity of the vendor by date [address][date][quantity]
  mapping(address => Vendor) public vendorsByUser; //who added thie vendor item
  mapping(address => bool) public isVendorListed; //to show whether this address is listed as a vendor or not
  mapping(address => bool) public isFarmerListed;

  mapping(uint => Vendor) public vendorById; //a mapping of the vebdor id to the struct item
  mapping(uint => MilkDeliveryItem) public deliveryItemById; // a mapping of the delivery item  by it's id
  mapping(uint => Farmer) public farmerById;
  mapping(uint => bool) public isAnExistingFarmer;

  event NewMilkDeliveryRecorded(address indexed vendor, uint indexed quantity, MILK_QUALITY_TYPE indexed quality, uint date);
  event NewMilkVendorAdded(address indexed vendor, address indexed addedBy, uint indexed date);
  event MilkVendorDisapproved(address indexed vendor, address indexed caller, uint date); //address[] indexed approvedVendors
  event MilkVendorDelisted(address indexed vendor, address indexed caller, uint date);
  event NewFarmer(address indexed farmerAddress, uint id, uint dateAdded );

  constructor() public {
  }

  modifier isApprovedForVending(address _vendor){
    require(_vendor != address(0),"Invalid Address");
    require(isApprovedForMilkVending[_vendor] == true,"Vendor Not Approved");
    _;
  }

  modifier isNotApprovedForVending(address _vendor){
    require(_vendor != address(0),"Invalid Address");
    require(isApprovedForMilkVending[_vendor] == false,"Vendor Approved");
    _;
  }

  modifier isListedAsAvendor(address _vendor){
    require(_vendor != address(0),"Invalid Address");
    require(isVendorListed[_vendor] == true,"Milk Vendor not listed");
    _;
  }

  modifier vendorNotListed(address _vendor){
    require(_vendor != address(0),"Invalid Address");
    require(isVendorListed[_vendor] == false,"Milk Vendor is listed");
    _;
  }

  modifier farmerNotListed(address _farmerAddress){
    require(isFarmerListed[_farmerAddress] == false,"This Farmer is Listed");
    _;
  }
   
   modifier farmerExists(uint _farmerId){
     require(isAnExistingFarmer[_farmerId] == true,"Farmer ID does not exist");
     _;
   }
  /**
    * @notice later on add onlyOwner modifier here
    * @dev approves a vendor for milk delivery, only performed by the contract owner
    * @param _vendor address
   */
   function approveVendor(address _vendor) public isNotApprovedForVending(_vendor) returns(bool){
      isApprovedForMilkVending[_vendor] = true;
      approvedVendors.push(_vendor);
      totalApprovedVendors = totalApprovedVendors.add(1);
      return true;
   }

  /**
    * @notice please add only owner modifier (onlyOwner) later
    * @dev enables only the contract owner to add a new vendor
    * @param _newVendor address 
    * @param _milkFactory string
    * @param _name string
    * @param _email string 
   */
  function listNewVendor(address _newVendor, string memory _milkFactory, string memory _name, string memory _email) public   
  vendorNotListed(_newVendor)
  returns(bool) 
  {
    //onlyOwner
      require(bytes(_milkFactory).length > 0, "New Milk Vendor => Null Factory");
      require(bytes(_name).length > 0, "New Milk Vendor => Null Vendor Name");
      require(bytes(_email).length > 0, "New Milk Vendor => Null Vendor Email");

      vendorIds.increment();
      uint currentVendorId = vendorIds.current();
      Vendor memory newMilkVendor = Vendor(currentVendorId,_milkFactory,_name,_email, payable(_newVendor), block.timestamp);
      vendors.push(newMilkVendor);
      vendorsByUser[msg.sender] = newMilkVendor;
      isVendorListed[_newVendor] = true;
      totalVendors = totalVendors.add(1);
      emit NewMilkVendorAdded(_newVendor, msg.sender, block.timestamp);
      return true;
  }

  /**
   * @dev returns the total quantity of milk recorded by a vendor on a specific date
   * @param _vendor address
   * @param _date uint
   */
  function getVendorQuantityByDate(address _vendor, uint _date) public view returns(uint){
    require(_vendor != address(0)); //Not an empty address
    return vendorQuantityByDate[_vendor][_date];
  }

  /**
    * @dev record a new milk delivery
    * @param _quantity uint
    * @param _qualityType enum
   */
  function recordNewDelivery(uint _quantity, MILK_QUALITY_TYPE _qualityType, uint _farmerId) public 
  isListedAsAvendor(msg.sender) 
  isApprovedForVending(msg.sender) 
  farmerExists(_farmerId)
  returns(bool)
  {
    require( _quantity != 0,"New Milk Delivery Item: => Zero Quantity Not Accepted");
    milkDeliveryIds.increment();
    uint currentDeliveryId = milkDeliveryIds.current();
    MilkDeliveryItem memory newMilkDeliveryItem = MilkDeliveryItem(payable(msg.sender),currentDeliveryId, block.timestamp,_quantity,_farmerId,_qualityType);
    milkDeliveries.push(newMilkDeliveryItem);
    deliveryItemByVendor[msg.sender] = newMilkDeliveryItem;
    vendorQuantityByDate[msg.sender][block.timestamp] = _quantity;
    totalDeliveries = totalDeliveries.add(1);
    totalQuantities = totalQuantities.add(_quantity);
    emit NewMilkDeliveryRecorded(msg.sender,_quantity,_qualityType, block.timestamp);
    return true;
  }

  /**
    * @notice later on add onlyOwner modifier here
    * @dev enables contract owner to delist a vendor
    * @param _vendor address
   */
  function delistVendor(address _vendor) public isListedAsAvendor(_vendor) returns(bool){
    isVendorListed[_vendor] = false;
    emit MilkVendorDelisted(_vendor, msg.sender, block.timestamp);
    return true;
  }

  /**
    * @notice later on add onlyOwner modifier here
    * @dev revoke a milk vendor's approval for milk vending
    * @param _vendor address
   */
  function revokeVendorApproval(address _vendor) public isApprovedForVending(_vendor) returns(bool){
      isApprovedForMilkVending[_vendor] = false;
      //remove this vendor from the approved vendors array and maintain the array order
      /** 
      for(uint i = 0; i < approvedVendors.length - 1; i++){
        if(approvedVendors[i] == _vendor){
          approvedVendors[i] = approvedVendors[i + 1];
        }
      }
      
      approvedVendors.pop();
      */
      totalApprovedVendors = totalApprovedVendors.sub(1);
      emit MilkVendorDisapproved(_vendor, msg.sender, block.timestamp); //approvedVendors
      return true;
  }

  /**
    * @dev gets the total quantity of milk by all vendors recorded on-chain
   */
  function totalQuantity() external virtual view returns(uint){
    return totalQuantities;
  }

  /**
    * @dev returns an array of all the vendors
   */
  function vendorList() public view returns(Vendor[] memory){
    return vendors;
  }

  function listAllDeliveryItems() public view returns(MilkDeliveryItem[] memory){
    return milkDeliveries;
  }

  function getTotalDeliveries() public view returns(uint){
    return totalDeliveries;
  }

  function addNewFarmer(
    address _farmerAddress,
    string memory _firstName, 
    string memory _lastName, 
    bytes memory _location,
    bytes memory _phoneNumber,
    bytes memory _email,
    int _idNumber
    ) public farmerNotListed(_farmerAddress) returns(bool success){
      farmerIds.increment();
      uint currentFarmerId = farmerIds.current();
      Farmer memory newFarmer = Farmer(currentFarmerId,_firstName,_lastName,_email,_phoneNumber,_idNumber,_location,payable(_farmerAddress), block.timestamp);
      totalFarmers = totalFarmers.add(1);
      isFarmerListed[_farmerAddress] = true;
      farmers.push(newFarmer);
      farmerById[currentFarmerId] = newFarmer;
      emit NewFarmer(_farmerAddress,currentFarmerId, block.timestamp);
      return true;
  }

  function getFarmerById(uint _farmerId) public view returns(Farmer memory){
    return farmerById[_farmerId];
  }

  function listAllFarmers() public view returns(Farmer[] memory){
    return farmers;
  }
}
