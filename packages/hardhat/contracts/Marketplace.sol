// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.16;

contract SneakerMarketplace {

    address public owner;

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
        uint[] sizes;
        uint price; // in cUSD
        User seller;
        bool isAvailable;
        mapping(uint => uint) sizeQuantities; // mapping of size to quantity
    }

    // State variables
    mapping(address => User) public users;
    mapping(uint => Sneaker) public allSneakers;
    mapping(address => mapping(uint => uint)) public userCart; // user address => sneaker id => quantity
    uint public sneakerCount;
    uint public userCount;

    // Events
    event UserRegistered(uint userId, address walletAddress, bool isSeller);
    event SneakerListed(uint sneakerId, string brand, string model, uint price, address seller);
    event SneakerUpdated(uint sneakerId, string brand, string model, uint price);
    event SneakerPurchased(uint sneakerId, address buyer, address seller, uint price);
    event ItemAddedToCart(address indexed user, uint indexed sneakerId, uint quantity);

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

    // Function to map sneaker sizes to quantities
    function mapSizeToQuantity(uint[] memory _sizes, uint[] memory _quantities) internal pure returns (uint[] memory, uint[] memory) {
        uint[] memory sizeRange = new uint[](10);
        uint[] memory sizeQuantities = new uint[](10);

        for (uint i = 0; i < 10; i++) {
            sizeRange[i] = 5 + i; // Sizes 5 to 14
            sizeQuantities[i] = 0; // Default quantity
        }

        for (uint j = 0; j < _sizes.length; j++) {
            for (uint k = 0; k < 10; k++) {
                if (sizeRange[k] == _sizes[j]) {
                    sizeQuantities[k] = _quantities[j];
                }
            }
        }

        return (sizeRange, sizeQuantities);
    }

    // Function to allow a seller to list a sneaker
    function listSneaker(
        string memory _brand,
        string memory _model,
        string memory _colorway,
        uint[] memory _sizes,
        uint[] memory _quantities,
        uint _price
    ) public onlySeller {
        require(_sizes.length == _quantities.length, "Sizes and quantities length mismatch");

        sneakerCount++;
        Sneaker storage newSneaker = allSneakers[sneakerCount];
        newSneaker.id = sneakerCount;
        newSneaker.brand = _brand;
        newSneaker.model = _model;
        newSneaker.colorway = _colorway;
        newSneaker.sizes = _sizes;
        newSneaker.price = _price;
        newSneaker.seller = users[msg.sender];
        newSneaker.isAvailable = true;

        (uint[] memory sizeRange, uint[] memory sizeQuantities) = mapSizeToQuantity(_sizes, _quantities);

        for (uint i = 0; i < sizeRange.length; i++) {
            newSneaker.sizeQuantities[sizeRange[i]] = sizeQuantities[i];
        }

        emit SneakerListed(sneakerCount, _brand, _model, _price, msg.sender);
    }

    // Function to add items to the user's cart
    function addToCart(uint sneakerId, uint quantity) public onlyRegisteredUser onlyBuyer sneakerExists(sneakerId) {
        require(allSneakers[sneakerId].isAvailable, "Sneaker is not available");
        userCart[msg.sender][sneakerId] += quantity;

        emit ItemAddedToCart(msg.sender, sneakerId, quantity);
    }

    // Function to allow a buyer to purchase a sneaker
    function purchaseSneaker(uint sneakerId) public payable onlyRegisteredUser onlyBuyer sneakerExists(sneakerId) {
        Sneaker storage sneaker = allSneakers[sneakerId];
        require(sneaker.isAvailable, "Sneaker is not available");
        require(sneaker.seller.walletAddress != msg.sender, "Seller cannot buy their own sneaker");
        require(msg.value >= sneaker.price, "Not enough cUSD to purchase the sneaker");

        sneaker.seller.walletAddress.transfer(msg.value);
        sneaker.isAvailable = false;

        emit SneakerPurchased(sneakerId, msg.sender, sneaker.seller.walletAddress, sneaker.price);
    }

    // Function to retrieve a single sneaker
    function getSneaker(uint sneakerId) public view sneakerExists(sneakerId) returns (
        uint id,
        string memory brand,
        string memory model,
        string memory colorway,
        uint price,
        bool isAvailable,
        uint[] memory sizes,
        uint[] memory quantities
    ) {
        Sneaker storage sneaker = allSneakers[sneakerId];
        uint[] memory sizeRange = new uint[](10);
        uint[] memory sizeQuantities = new uint[](10);

        for (uint i = 0; i < 10; i++) {
            sizeRange[i] = 5 + i;
            sizeQuantities[i] = sneaker.sizeQuantities[sizeRange[i]];
        }

        return (
            sneaker.id,
            sneaker.brand,
            sneaker.model,
            sneaker.colorway,
            sneaker.price,
            sneaker.isAvailable,
            sizeRange,
            sizeQuantities
        );
    }
}
