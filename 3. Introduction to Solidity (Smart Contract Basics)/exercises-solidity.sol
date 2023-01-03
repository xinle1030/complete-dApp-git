// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

// create a Contract that can store data and return the data back

// be able to do the following:

// 1. receive information, 2. store information and 3. return the information back

// A contract in the sense of Solidity is a collection of code (its functions) and data (its state) that resides at a specific address on the Ethereum blockchain

contract simpleStorage {
    // write all the code inside here - functions and its state

    uint storeData;
    uint storeValue;

    // function is a group of resuable code that can be used anywhere in your application. They performs a specific task,

    // set and get

    // public enables visibility so that we can call this outside of the contract itself
    function setStoreData(uint x) public {
        storeData = x;
    }

    function getStoreData() public view returns (uint) {
        return storeData;
    }

    // create a storage contract that sets and gets values - only the value it returns is multiplied by 5
    function setStoreValue(uint x) public{
        storeValue = 5 * x;
    }

        function getStoreValue() public view returns (uint){
        return storeValue;
    }
}
