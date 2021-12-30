// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./MilkDeliveryInterface.sol";

/**
  * @title Milk Delivery Contract
  * @dev A smart contract that enables dairy farmers to record their daily produce
 */
contract MilkDelivery is Ownable, MilkDeliveryInterface {
  using SafeMath for uint256;
  using Counters for Counters.Counter;

  Counters.Counter private milkDeliveryIds; //to help track milk delivery items by ID e.g 1
  Counters.Counter private vendorIds; //to help track vendors by ID e.g 1

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
  }

  //Delivery struct with delivery item particulars
  struct MilkDeliveryItem{
    address payable vendor;
    uint id;
    uint date;
    uint quantity;
    MILK_QUALITY_TYPE milkQualityType;
  }

  uint totalVendors = 0; //total vendors initialised to 0
  uint public totalQuantities = 0; //keeps track of total milk quantity recorded on-chain
  uint public totalDeliveries = 0; //to handle incrementing of overral milk quantities

  Vendor[] public vendors; //an array of the vendors
  MilkDeliveryItem[] public milkDeliveries; //to help keep track of delivery items as an array
  address[] public approvedVendors; //the addresses of the approved vendors
  
  mapping(address => bool) public isApprovedForMilkVending; //a boolean indicating whether a vendor has been approved
  mapping(address => MilkDeliveryItem) public deliveryItemByVendor; //get the delivery item by vendor identified by an address
  mapping(address => mapping(uint => uint)) vendorQuantityByDate; //keeps track of the total quantity of the vendor by date [address][date][quantity]
  mapping(address => Vendor) public vendorsByUser; //who added thie vendor item
  mapping(address => bool) public isVendorListed; //to show whether this address is listed as a vendor or not

  event NewMilkDeliveryRecorded(address indexed vendor, uint indexed quantity, MILK_QUALITY_TYPE indexed quality, uint date);
  event NewMilkVendorAdded(address indexed vendor, address indexed addedBy, uint indexed date);

  error BadRecord();

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

  /**
    * @dev approves a vendor for milk delivery, only performed by the contract owner
    * @param _vendor address
   */
   function approveVendor(address _vendor) public onlyOwner isNotApprovedForVending(_vendor) returns(bool){
      isApprovedForMilkVending[_vendor] = true;
      approvedVendors.push(_vendor);
      return true;
   }

  /**
    * @dev enables only the contract owner to add a new vendor
    * @param _newVendor address 
    * @param _milkFactory string
    * @param _name string
    * @param _email string 
   */
  function addNewVendor(address _newVendor, string memory _milkFactory, string memory _name, string memory _email) public 
  onlyOwner 
  vendorNotListed(_newVendor)
  returns(bool)
  {
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
  function recordNewDelivery(uint _quantity, MILK_QUALITY_TYPE _qualityType) public 
  isListedAsAvendor(msg.sender) 
  isApprovedForVending(msg.sender) 
  returns(bool)
  {
    require( _quantity != 0,"New Milk Delivery Item: => Zero Quantity Not Accepted");
    milkDeliveryIds.increment();
    uint currentDeliveryId = milkDeliveryIds.current();
    MilkDeliveryItem memory newMilkDeliveryItem = MilkDeliveryItem(payable(msg.sender),currentDeliveryId, block.timestamp,_quantity,_qualityType);
    milkDeliveries.push(newMilkDeliveryItem);
    deliveryItemByVendor[msg.sender] = newMilkDeliveryItem;
    vendorQuantityByDate[msg.sender][block.timestamp] = _quantity;
    totalDeliveries = totalDeliveries.add(1);
    totalQuantities = totalQuantities.add(_quantity);
    emit NewMilkDeliveryRecorded(msg.sender,_quantity,_qualityType, block.timestamp);
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
}
