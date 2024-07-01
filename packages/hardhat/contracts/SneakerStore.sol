//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract SneakerStore{
    struct Sneaker {
        uint id;
        string name;
        string brand;
        uint price;
        uint quantity;
        address seller;
        bool isAvailable;
        string random;
    }
}