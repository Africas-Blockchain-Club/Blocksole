//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract User {
    struct User {
        uint id;
        string name;
        string email;
        string password;
        address walletAddress;
    }

}