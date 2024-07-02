// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.16;

contract Marketplace {

    // Payment processed?
    bool payment_scan_complete; // false until seller confirms reciept


    //What do we want to do

    // Keep track of the users
    struct User {
        uint id; //will probably be a uuid
        bool isSeller; // False by default 
        address walletAddress; //User 
    }

    // Keep track of products
    struct Sneaker{
        uint id; //used to track unique sneakers
        string brand;
        User seller; // links sneaker to the seller
        // other relevant sneaker shit
    }

    // sneaker mapping
    mapping (uint => Sneaker) allSneakers;

    // function to return contract owner


    // Register buyer

    // Allow buyer to change to seller

    // ALlow seller to list sneaker

    // Allow seller to update sneaker

    // retrieve a single sneaker

    //retrieve all sneakers

    // retrieve sneaker by brand?

    // allow buyer to purchase  (check if the buyer is not the seller)
    // do this by checking buyer address vs seller address. If match, no sale

}