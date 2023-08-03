require('dotenv').config();
const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const LaPiscina = require('../src/abis/LaPiscina.json');
const config = require('../src/config.json');

async function findAndLogNFTs() {
  try {
    // Set up web3 provider using HDWalletProvider or any other provider
	
    const provider = new HDWalletProvider(process.env.DEPLOYER_PRIVATE_KEY, `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`);

    const web3Instance = new Web3(provider);
    const accounts = await web3Instance.eth.getAccounts();
    const account = accounts[0];

    const networkId = await web3Instance.eth.net.getId();
    console.log(networkId)
    const laPiscina = new web3Instance.eth.Contract(LaPiscina.abi, LaPiscina.networks[11155111].address);

    // Fetch total supply and loop through all NFTs
    const totalSupply = await laPiscina.methods.totalSupply().call();
    const nfts = [];
    for (let i = 1; i <= totalSupply; i++) {
      const tokenId = await laPiscina.methods.tokenByIndex(i - 1).call();
      const owner = await laPiscina.methods.ownerOf(tokenId).call();
      // You can also fetch other metadata or details for each NFT if your contract has that functionality.

      // Store the NFT data in the local state
      nfts.push({ tokenId, owner });
    }

    // Log the NFT data to the console
    console.log("List of Minted NFTs:");
    console.table(nfts);
  } catch (error) {
    console.error('Error loading blockchain data:', error);
  }
}

// Call the function to find and log NFTs
findAndLogNFTs();
