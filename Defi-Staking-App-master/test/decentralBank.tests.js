const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank");

//brought in the required library for testing
require("chai")
  .use(require("chai-as-promised"))
  .should();

// [owner, customer] refer to the accounts array whereby accounts[0] = owner of all the contracts deployment
contract("DecentralBank", ([owner, customer]) => {
  //All the code goes here for testing

  let tokens = (number) => web3.utils.toWei(number, "ether");

  let tether, rwd, decentralBank;

  //this function will be executed before all the tests/descriptions
  before(async () => {
    //Load Contracts
    tether = await Tether.new();
    rwd = await RWD.new();
    decentralBank = await DecentralBank.new(rwd.address, tether.address);

    //transfer all tokens to DecentralBank (1 million token)
    await rwd.transfer(decentralBank.address, tokens("1000000"));

    //Transfer 100 Tethers to Customer ... {from: } param is used to indicate the msg.sender account who is gonna execute transfer function
    await tether.transfer(customer, tokens("100"), { from: owner });
  });

  // description for test suite
  describe("Tether Token Deployment", async () => {
    // description for individual test under a test suite
    it("matches name successfully", async () => {
      const name = await tether.name();
      assert.equal(name, "Mock Tether Token");
    });
  });

  describe("RWD Token Deployment", async () => {
    it("matches name successfully", async () => {
      const name = await rwd.name();
      assert.equal(name, "Reward Token");
    });
  });

  describe("Decentral Bank Deployment", async () => {
    it("matches name successfully", async () => {
      const name = await decentralBank.name();
      assert.equal(name, "Decentralized Bank");
    });

    it("contract has tokens", async () => {
      let balance = await rwd.balanceOf(decentralBank.address);
      assert.equal(balance, tokens("1000000"));
    });
  });

  describe("Yield Farming", async () => {
    it("rewards tokens for staking", async () => {
      let result;
      // check Investor Balance
      result = await tether.balanceOf(customer);
      assert.equal(
        result.toString(),
        tokens("100"),
        "customer tether wallet balance before staking"
      );

      // check Staking for Customer
      await tether.approve(decentralBank.address, tokens("100"), {
        from: customer,
      }); // need to approve first before depositTokens which uses transferFrom()
      await decentralBank.depositTokens(tokens("100"), { from: customer });

      //check updated Balance of Customer
      result = await tether.balanceOf(customer);
      assert.equal(
        result.toString(),
        tokens("0"),
        "customer tether wallet balance after staking 100 tokens"
      );

      //check updated Balance of CentralBank owner
      result = await tether.balanceOf(decentralBank.address);
      assert.equal(
        result.toString(),
        tokens("100"),
        "Decentralized bank owner balance after customer staking"
      );

      //Check Staking Balance state
      result = await decentralBank.isStaking(customer);
      assert.equal(
        result.toString(),
        "true",
        "customer staking status after staking"
      );

      // Issue Tokens
      await decentralBank.issueTokens({ from: owner });

      // Ensure only the owner can issue tokens
      await decentralBank.issueTokens({ from: customer }).should.be.rejected;

      // Unstake Tokens
      await decentralBank.unstakeTokens({ from: customer });

      // Check unstaking balances
      result = await tether.balanceOf(customer);
      assert.equal(
        result.toString(),
        tokens("100"),
        "customer tether wallet balance after unstaking"
      );

      //check updated Balance of DecentralBank owner
      result = await tether.balanceOf(decentralBank.address);
      assert.equal(
        result.toString(),
        tokens("0"),
        "DecentralBank owner balance after customer unstaking"
      );

      //Check updated Staking Balance state
      result = await decentralBank.isStaking(customer);
      assert.equal(
        result.toString(),
        "false",
        "customer is no longer staking after unstaking"
      );
    });
  });
});
