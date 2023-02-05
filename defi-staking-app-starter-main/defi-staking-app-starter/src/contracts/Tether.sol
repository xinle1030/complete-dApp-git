pragma solidity ^0.5.0;

contract Tether {
    string public name = "Mock Tether Token";
    string public symbol = "mUSDT";

    // 1 ETH = 10^18 WEI
    uint256 public totalSupply = 1000000000000000000000000; // 1 million tokens
    uint8 public decimals = 18;

    // indexed is to help us to filter the Transfer event by address _from and _to
    event Transfer(
        address indexed _from,  
        address indexed _to, 
        uint256 _value
    );

    event Approval(
        address indexed _owner, 
        address indexed _spender, 
        uint256 _value
    );

    mapping (address => uint256) public balanceOf;  // mapping from address to keep track of balances
    mapping (address => mapping (address => uint256)) public allowances;  // mapping from address to keep track of allowances sent from owner to _from


    constructor() public{
        balanceOf[msg.sender] = totalSupply;
    }

    // owner transfer money
    function transfer(address _to, uint256 _value) public returns (bool success) {
        // require that the value is greater or equal for transfer 
        require(balanceOf[msg.sender] >= _value);

        // transfer the amount and subtract the balance 
        balanceOf[msg.sender] -= _value;
        // add the balance 
        balanceOf[_to] += _value;

        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowances[msg.sender][_spender] = _value; 
        emit Approval(msg.sender, _spender, _value);
        return true;
    }


    // allow third party to transfer money with approval from owner
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        // require that the value is greater or equal for transfer 
        require(balanceOf[_from] >= _value);
        require(allowances[_from][msg.sender] >= _value);

        // transfer the amount and subtract the balance 
        balanceOf[_from] -= _value;
        // add the balance 
        balanceOf[_to] += _value;

        // allowances from msg.sender to _from
        allowances[msg.sender][_from] -= _value;

        emit Transfer(_from, _to, _value);
        return true;
    }
}