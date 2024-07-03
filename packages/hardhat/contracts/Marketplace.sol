// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.16;

contract Marketplace {

    address public owner;
    bool public paymentScanComplete;

    // Struct to keep track of users
    struct User {
        uint id;
        bool isSeller;
        address payable walletAddress;
    }

    // Struct to keep track of sneakers
    struct Sneaker {
        uint id;
        string brand;
        string model;
        string colorway;
        uint size;
        string imageUrl; //make this an array for different views
        uint price; //in cUSD
        User seller;
        bool isAvailable;
        uint stockAvailable; // used to keep quantity available
    }

    // State variables
    mapping(address => User) public users;
    mapping(uint => Sneaker) public allSneakers;
    uint public sneakerCount;
    uint public userCount;

    // Events
    event UserRegistered(uint userId, address walletAddress, bool isSeller);
    event SneakerListed(uint sneakerId, string brand, string model, uint size, uint price, address seller);
    event SneakerUpdated(uint sneakerId, string brand, string model, uint size, uint price);
    event SneakerPurchased(uint sneakerId, address buyer, address seller, uint price);

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier onlyRegisteredUser() {
        require(users[msg.sender].walletAddress != address(0), "User is not registered");
        _;
    }

    modifier onlySeller() {
        require(users[msg.sender].isSeller, "Only sellers can call this function");
        _;
    }

    modifier onlyBuyer() {
        require(!users[msg.sender].isSeller, "Only buyers can call this function");
        _;
    }

    modifier sneakerExists(uint _sneakerId) {
        require(allSneakers[_sneakerId].id != 0, "Sneaker does not exist");
        _;
    }

    // Constructor
    constructor() {
        owner = msg.sender;
    }

    // Function to register a buyer
    function registerUser() public {
        require(users[msg.sender].walletAddress == address(0), "User already registered");
        
        userCount++;
        users[msg.sender] = User(userCount, false, payable(msg.sender));
        
        emit UserRegistered(userCount, msg.sender, false);
    }

    // Function to allow a buyer to change to a seller
    function becomeSeller() public onlyRegisteredUser {
        users[msg.sender].isSeller = true;
        emit UserRegistered(users[msg.sender].id, msg.sender, true);
    }

    // Function to allow a seller to list a sneaker
    function listSneaker(
        string memory _brand,
        string memory _model,
        string memory _colorway,
        uint _size,
        string memory _imageUrl, // find a way to upload multiple images from the frontend
        uint _price
    ) public onlySeller {
        sneakerCount++;
        allSneakers[sneakerCount] = Sneaker(
            sneakerCount,
            _brand,
            _model,
            _colorway,
            _size,
            _imageUrl,
            _price,
            users[msg.sender],
            true,
            1
        );

        emit SneakerListed(sneakerCount, _brand, _model, _size, _price, msg.sender);
    }

    // Function to allow a seller to update a sneaker
    function updateSneaker(
        uint _sneakerId,
        string memory _brand,
        string memory _model,
        string memory _colorway,
        uint _size,
        string memory _imageUrl,
        uint _price
    ) public onlySeller sneakerExists(_sneakerId) {
        Sneaker storage sneaker = allSneakers[_sneakerId];
        require(sneaker.seller.walletAddress == msg.sender, "Only the seller can update this sneaker");

        sneaker.brand = _brand;
        sneaker.model = _model;
        sneaker.colorway = _colorway;
        sneaker.size = _size;
        sneaker.imageUrl = _imageUrl;
        sneaker.price = _price;

        emit SneakerUpdated(_sneakerId, _brand, _model, _size, _price);
    }

    // Function to retrieve a single sneaker
    function getSneaker(uint _sneakerId) public view sneakerExists(_sneakerId) returns (Sneaker memory) {
        return allSneakers[_sneakerId];
    }

    // Function to retrieve all sneakers
    function getAllSneakers() public view returns (Sneaker[] memory) {
        Sneaker[] memory sneakers = new Sneaker[](sneakerCount);
        for (uint i = 1; i <= sneakerCount; i++) {
            sneakers[i - 1] = allSneakers[i];
        }
        return sneakers;
    }

    // Function to retrieve sneakers by brand
    function getSneakersByBrand(string memory _brand) public view returns (Sneaker[] memory) {
        uint resultCount = 0;
        for (uint i = 1; i <= sneakerCount; i++) {
            if (keccak256(abi.encodePacked(allSneakers[i].brand)) == keccak256(abi.encodePacked(_brand))) {
                resultCount++;
            }
        }

        Sneaker[] memory sneakers = new Sneaker[](resultCount);
        uint index = 0;
        for (uint i = 1; i <= sneakerCount; i++) {
            if (keccak256(abi.encodePacked(allSneakers[i].brand)) == keccak256(abi.encodePacked(_brand))) {
                sneakers[index] = allSneakers[i];
                index++;
            }
        }
        return sneakers;
    }

    // Function to allow a buyer to purchase a sneaker
    function purchaseSneaker(uint _sneakerId) public payable onlyRegisteredUser onlyBuyer sneakerExists(_sneakerId) {
        Sneaker storage sneaker = allSneakers[_sneakerId];
        require(sneaker.isAvailable, "Sneaker is not available");
        require(sneaker.seller.walletAddress != msg.sender, "Seller cannot buy their own sneaker");
        require(msg.value >= sneaker.price, "Not enough Ether to purchase the sneaker");

        sneaker.seller.walletAddress.transfer(msg.value);
        sneaker.isAvailable = false;

        emit SneakerPurchased(_sneakerId, msg.sender, sneaker.seller.walletAddress, sneaker.price);
    }
}
