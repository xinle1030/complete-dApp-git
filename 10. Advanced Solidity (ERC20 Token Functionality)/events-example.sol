// Event Example:

// Abstraction - Decentralized Exchange: On a smart contract, traders can trade tokens - from the smart contract emit an event so 
// they can get the data in the FE

// After emitting events, you can't read them in the past only for entities outside of the blockchain - not stored as memory
// events have lower gas cost than storage

pragma solidity >= 0.7.0 < 0.9.0;

contract LearnEvents {
// 1. declare the event and 2. we want to emit the event
// Camelcase is a good convention - something to remenber
// only use 3 indexed per event as indexed increases gas fee
    event NewTrade(
        uint indexed date,
        address from,
        address indexed to,
        uint indexed amount
    );

    function trade(address to, address from, uint amount) external {
        // outside consumer can see the event through websjs
        // block.timestamp iS a global variable that gives the current timestomp 
        emit NewTrade(block.timestamp, from, to, amount);
    }
}
