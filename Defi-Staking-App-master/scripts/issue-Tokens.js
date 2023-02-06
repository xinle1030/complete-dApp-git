const DecentralBank = artifacts.require("DecentralBank");

// scripts to issue tokens with a callback function as argument
module.exports = async function issueRewards(callback) {
  let decentralBank = await DecentralBank.deployed();
  await decentralBank.issueTokens();
  console.log("Tokens have been issued successfully !");
  callback();
};
