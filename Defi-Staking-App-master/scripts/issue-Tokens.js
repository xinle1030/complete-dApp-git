const { artifacts } = require("truffle");
const DecentralBank = artifacts.require("DecentralBank");

// scripts to issue tokens with a callback function as argument
async function issueRewards() {
  let decentralBank = await DecentralBank.deployed();
  await decentralBank.issueTokens();
  console.log("Tokens have been issued successfully !");
  // callback();
};

export default issueRewards;