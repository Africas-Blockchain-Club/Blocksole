//SPDX-License-Identifier: MIT
// File: contracts/marketplacewithDAO/IERC20.sol


pragma solidity ^0.8.0;

interface ERC20 {
    function initialize(string memory name_, string memory symbol_) external;

    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function decimals() external view returns (uint8);
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);

    function increaseAllowance(address spender, uint256 addedValue) external returns (bool);
    function decreaseAllowance(address spender, uint256 subtractedValue) external returns (bool);

    function _transfer(address from, address to, uint256 amount) external;
    function _mint(address account, uint256 amount) external;
    function _burn(address account, uint256 amount) external;
    function _approve(address owner, address spender, uint256 amount) external;
    function _spendAllowance(address owner, address spender, uint256 amount) external;

    function _beforeTokenTransfer(address from, address to, uint256 amount) external;
    function _afterTokenTransfer(address from, address to, uint256 amount) external;
}
// File: contracts/marketplacewithDAO/UserManagement.sol


pragma solidity ^0.8.0;


contract UserManagement {
    enum Role { None, Buyer, Seller }

    struct User {
        bool registered;
        Role role;
    }

    mapping(address => User) public users;
    ERC20 token = ERC20(0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1);
    uint256 public buyerFee;
    uint256 public sellerFee;
    address owner;

    event UserRegistered(address indexed user, Role role);
    event RoleUpdated(address indexed user, Role role);

    constructor(uint256 _sellerFee) {
        owner = msg.sender;
        buyerFee = 0;
        sellerFee = _sellerFee;
    }

    modifier hasEnoughBalance(uint256 fee) {
        require(token.balanceOf(msg.sender) >= fee, "Insufficient Funds");
        _;
    }

    function isRegistered(address _walletAddress) public view returns (bool) {
        return users[_walletAddress].registered;
    }

    function getRole(address _walletAddress) public view returns (Role) {
        return users[_walletAddress].role;
    }

    function registerUser(Role _role) public hasEnoughBalance(_role == Role.Buyer ? buyerFee : sellerFee) {
        require(!users[msg.sender].registered, "User is already registered");

        uint256 fee = _role == Role.Buyer ? buyerFee : sellerFee;

        if (fee > 0) {
            require(token.transferFrom(msg.sender, address(this), fee), "Fee payment failed");
        }

        users[msg.sender] = User({
            registered: true,
            role: _role
        });
        emit UserRegistered(msg.sender, _role);
    }

    function updateUserRole(Role _role) public hasEnoughBalance(_role == Role.Seller ? sellerFee : 0) {
        require(users[msg.sender].registered, "User is not registered");
        require(_role != Role.None, "Invalid role");

        if (_role == Role.Seller && users[msg.sender].role != Role.Seller) {
            require(token.transferFrom(msg.sender, address(this), sellerFee), "Upgrading to a seller role requires fee payment");
        }

        users[msg.sender].role = _role;
        emit RoleUpdated(msg.sender, _role);
    }

    function getUserRole(address _user) public view returns (Role) {
        return users[_user].role;
    }

    function withdrawTokens() public {
        uint256 balance = token.balanceOf(address(this));
        require(balance > 0, "No tokens to withdraw");
        require(token.transfer(msg.sender, balance), "Token transfer failed");
    }
}
