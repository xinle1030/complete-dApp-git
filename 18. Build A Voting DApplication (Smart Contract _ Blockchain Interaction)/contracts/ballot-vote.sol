pragma solidity >= 0.7.0<0.9.0;
/**
Making a voting contract

1. we want the ability to accept proposals and store them 
    proposal: their name, number

2. voters & voting ability
    keep track of voting
    check voters are authenticated to vote

3. chairman
    authenticate and deploy contract
 */

/**
Why build voting Dapp
- because it is a decentralized database voting
- security =  reduce manipulation
 */

contract Ballot {
    // struct is a method to create your own data type

    // voters: voted = bool, access to vote - uint (voting weight), vote index - unit (which proposal the voter votes)
    struct Voter {
    uint vote;
    bool voted;
    uint weight;
    }

    struct Proposal{
        //bytes are a basic measurement of information in computer processing 
        bytes32 name; // name of each proposal 
        uint voteCount; // number of accumulated votes
    }

    Proposal[] public proposals; // everyone can access the proposals
    
    // mapping allows for us to create a store volue with keys and indexes
    mapping(address => Voter) public voters; // voters get address as a key and Voter for value

    address public chairperson;

    // memory allows the proposal to be temporarily stored
    // input is an array of bytes32, each byte is surrounded by double quote
    constructor(bytes32[] memory proposalNames) {
        
        // memory defines a temporary data location in Solidity during runtime only of methods.
        // we guarantee space for it
        
        // msg.sender - is a global variable that states the person who is currently connecting to the contract 
        chairperson = msg.sender; 
        
        // add 1 to chairperson weight 
        voters[chairperson].weight = 1;
        
        // will add the proposal names to the smart contract upon deployment 
        for(uint i = 0; i < proposalNames.length; i++){
            proposals.push(Proposal({
                name: proposalNames[i], 
                voteCount: 0
                }));
        }
    }

    // function to authenticate voter
    function giveRightToVote(address voter) public {
        require(msg.sender == chairperson, "Only the Chairperson can give access to vote");
        // require that the voter hasn't voted yet
        require(!voters[voter].voted, "The voter has already voted");
        require(voters[voter].weight == 0);
        
        // give rights to vote to the voter
        voters[voter].weight = 1;
    }

    // function for voting
    function vote(uint proposal) public {
        Voter storage sender = voters[msg.sender];
        require(sender.weight != 0, 'Has no right to vote');
        require(!sender.voted, 'Already voted');
        sender.voted = true;
        sender.vote = proposal;

        proposals[proposal].voteCount += sender.weight;
    }

    // function for showing the results
    // 1. function that shows the winning proposal by integer
    function winningProposal() public view returns (uint winningProposal_){
        uint winningVoteCount = 0;
        for(uint i = 0; i < proposals.length; i++){
            if (proposals[i].voteCount > winningVoteCount){
                winningVoteCount = proposals[i].voteCount; 
                winningProposal_ = i;
            }
        }
    }

    // 2. function that shons the winner by now
    function winningName() public view returns(bytes32 winningName_){
        winningName_ = proposals[winningProposal()].name;
    }

}





