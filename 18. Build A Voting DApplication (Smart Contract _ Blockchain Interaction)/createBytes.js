const ethers = require( 'ethers');

// convert proposal names from string to bytes form
async function createBytes(args){
    const name = args[0];
    const bytes = ethers.utils.formatBytes32String(name);
    console.log("name to bytes: ", bytes);
}

createBytes(process.argv.slice(2));
