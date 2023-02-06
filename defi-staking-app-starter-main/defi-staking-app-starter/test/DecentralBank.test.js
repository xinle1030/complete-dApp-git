const RWD = artifacts.require("RWD");
const Tether = artifacts.require("Tether");
const DecentralBank = artifacts.require("DecentralBank");

// require("chai")
//   .use(require("chat-as-promised"))
//   .should();

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const should = chai.should;
chai.use(chaiAsPromised);

contract("DecentralBank", (accounts) => {
  let tether, rwd;

  before(async () => {
    // Load contracts
    tether = await Tether.new();
    rwd = await RWD.new();
  });

  // description for test suite
  describe("Mock Tether Deployment", async () => {
    // description for individual test under a test suite
    it("matches name successfully", async () => {
      const name = await tether.name();
      assert.equal(name, "Mock Tether Token");
    });
  });

  // description for test suite
  describe("Reward Token Deployment", async () => {
    // description for individual test under a test suite
    it("matches name successfully", async () => {
      const name = await rwd.name();
      assert.equal(name, "Reward Token");
    });
  });
});
