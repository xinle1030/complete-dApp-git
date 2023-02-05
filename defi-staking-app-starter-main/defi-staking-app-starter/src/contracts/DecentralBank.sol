pragma solidity ^0.5.0;
import './RWD.sol';
import './Tether.sol';

contract DecentralBank{
    string public name = "Decentralized Bank";
    address public owner;
    Tether public tether;
    RWD public rwd;

    constructor(Tether _tether, RWD _rwd) public{
        tether = _tether;
        rwd = _rwd;
    }
}