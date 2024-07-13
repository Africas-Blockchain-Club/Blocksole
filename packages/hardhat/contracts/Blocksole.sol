// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SneakerStore {
    // Mapping to store seller addresses
    mapping(address => bool) public isSeller;

    // Event emitted when a seller is registered
    event SellerRegistered(address indexed seller);

    // Function to register a seller
    function registerSeller() external {
        require(!isSeller[msg.sender], "Seller already registered");

        // Mark sender address as a registered seller
        isSeller[msg.sender] = true;

        // Emit event
        emit SellerRegistered(msg.sender);
    }
}
