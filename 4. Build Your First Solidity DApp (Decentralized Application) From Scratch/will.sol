// SPDX-License-Identifier: MIT

pragma solidity ^0.5.7;

contract Will {
    address owner;
    uint fortune;
    bool deceased;

    constructor() payable {
        owner = msg.sender; // msg sender represents address that is being called
        fortune = msg.value; // msg value tells us how much ether is being sent
        deceased = false;
    }

    // create modifier so the only person who can coll the contract is the owner
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    // create modifier so that we only allocate funds if friend's gramps deceased
    modifier mustBeDeceased() {
        require(deceased == true);
        _;
    }

    // list of family wallets
    address payable familyWallets;

    // map through inheritance
    mapping(address => uint) inheritance;

    //set inheritance for each address
    function setInheritance(address payable wallet, uint amount)
        public
        onlyOwner
    {
        familyWallets.push(wallet);
        inheritance[wallet] = amount;
    }

    // Pay each family member based on their wallet address
    function payout() private mustBeDeceased {
        // transferring the funds from contract address to receiver address
        for (uint i = 0; i < familyWallets.length; i++) {
            familyWallets[i].transfer(inheritance[familyWallets[i]]);
        }
    }

    // overall switch simulation
    function hasDeceased() public onlyOwner{
        deceased = true;
        payout();
    }
}
