const ethers = require("ethers");

// convert bytes proposal names to string form
async function parseBytes(args) {
  const bytes = args[0];
  const name = ethers.utils.parseBytes32String(bytes);
  console.log("bytes to name: ", name);
}

parseBytes(process.argv.slice(2));
