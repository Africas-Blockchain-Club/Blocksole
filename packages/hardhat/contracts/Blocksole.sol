// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ERC20Interface.sol";


contract Blocksole {
    address public owner;
    
    // ERC20 token contract address
    address public cUSDTTokenAddress;
    ERC20 public cUSDTToken;
    
    // Struct for a sneaker
    struct Sneaker {
        string id; // UUID of the sneaker
        uint quantity; // Quantity available for sale
        uint price; // Price per sneaker
        address seller; // Address of the seller
    }
    
    // Struct for an order
    struct Order {
        uint256 orderNumber; // Unique order number
        address buyer; // Address of the buyer
        uint256 amount; // Amount paid for the order
        uint256 timestamp; // Timestamp when the order was placed
        string[] sneakerIds; // List of sneaker IDs in the order
        bool fulfilled; // Flag indicating if the order has been fulfilled
    }

    // Mapping to store all sneakers listed
    mapping(string => Sneaker) public sneakers;
    
    // Mapping to store all orders
    mapping(uint256 => Order) public orders;
    uint256 public orderCount;

    // Events
    event SellerRegistered(address indexed seller);
    event SneakerListed(string indexed sneakerId, uint quantity, uint price, address indexed seller);
    event OrderPlaced(uint256 indexed orderNumber, address indexed buyer, uint256 amount, uint256 timestamp);
    event OrderFulfilled(uint256 indexed orderNumber);
    
    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    // Constructor
    constructor(address _cUSDTTokenAddress) {
        owner = msg.sender;
        cUSDTTokenAddress = _cUSDTTokenAddress;
        cUSDTToken = ERC20(_cUSDTTokenAddress);
    }
    
    // Function to register a seller
    function registerSeller() external {
        emit SellerRegistered(msg.sender);
    }
    
    // Function to list a sneaker for sale
    function listSneaker(string memory _id, uint _quantity, uint _price) external {
        require(_quantity > 0, "Quantity must be greater than zero");
        require(_price > 0, "Price must be greater than zero");
        require(bytes(_id).length > 0, "Sneaker ID cannot be empty");
        require(sneakers[_id].seller == address(0), "Sneaker ID already exists");

        sneakers[_id] = Sneaker({
            id: _id,
            quantity: _quantity,
            price: _price,
            seller: msg.sender
        });
        
        emit SneakerListed(_id, _quantity, _price, msg.sender);
    }

    // Function to place an order for sneakers
    function placeOrder(uint256 _orderNumber, uint256 _amount, string[] memory _sneakerIds) public {
        require(_amount > 0, "Amount must be greater than zero");
        require(_sneakerIds.length > 0, "At least one sneaker ID must be provided");

        // Ensure seller cannot buy their own shoes
        for (uint i = 0; i < _sneakerIds.length; i++) {
            require(sneakers[_sneakerIds[i]].seller != msg.sender, "Seller cannot buy their own sneakers");
        }

        // Reduce the quantity of each sneaker and mark the order as fulfilled
        for (uint i = 0; i < _sneakerIds.length; i++) {
            string memory sneakerId = _sneakerIds[i];
            require(sneakers[sneakerId].quantity > 0, "Sneaker not available");
            sneakers[sneakerId].quantity--;
        }

        orders[_orderNumber] = Order({
            orderNumber: _orderNumber,
            buyer: msg.sender,
            amount: _amount,
            timestamp: block.timestamp,
            sneakerIds: _sneakerIds,
            fulfilled: false
        });

        orderCount++;

        emit OrderPlaced(_orderNumber, msg.sender, _amount, block.timestamp);
    }

    // Function to fulfill an order (for demonstration purposes)
    function fulfillOrder(uint256 _orderNumber) external onlyOwner {
        require(orders[_orderNumber].orderNumber != 0, "Order does not exist");
        require(!orders[_orderNumber].fulfilled, "Order already fulfilled");

        orders[_orderNumber].fulfilled = true;

        emit OrderFulfilled(_orderNumber);
    }
}
