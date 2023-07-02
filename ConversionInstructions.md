# ConversionInstructions

1) Clone this directory and rename it
git clone git@github.com:peterpisarz/NFT-Master-Template.git "My-New-NFT-Project"


2) You may need to install npm by
npm install npm
or
npm install -g npm
or
or sudo npm install -g npm

3) Replace new contract names in rewrite.js
i.e. OpenPunks >> MyNewNFTProject

4) run
node rewrite.js

5) Visually verify
2_deploy_contracts
App.js
contracts >> newcontract.sol
test >> newtest.test.js
package.json

6) Delete
abis >> OpenPunks.json
contracts >> OpenPunks.sol
test >> OpenPunks.test.js

7) Manually Update
public/index.html Open Punks >> New Contract Name
.env

8) install packages
npm install

9) truffle compile

10) truffle-config.js deployment port 8545 or match local Ganache network

11) Start Ganache

11) Make sure the app works
npm run start

13) Manually update html
Open Punks
Make sure the date matches your .env file

12) create .env
DEPLOYER_PRIVATE_KEY=""
INFURA_API_KEY=""
ETHERSCAN_API_KEY="QKKRRQ979NVH2447PW8TE9RAJSRG39YQ29"

PROJECT_NAME="" // THIS EXACT NAME WILL SHOW UP ON OPENSEA
PROJECT_SYMBOL=""
MINT_COST=0 // cost of the NFT. reccomend set to .08 (i.e. 80000000000000000wei)
MAX_SUPPLY= // how many pictures are you posting?

IPFS_IMAGE_METADATA_CID="" // THIS IS FOR THE METADATA CID ONLY> THE METADATA CID IS ALL YOU NEED
IPFS_HIDDEN_IMAGE_METADATA_CID=""

NFT_MINT_DATE="Apr 18, 2022 22:00:00" // Update this date (resource: https://www.epochconverter.com/)

13) Regenerate metadata

14) Replace Social Media Links, Instagram, Twitter

15) Update like from DappU to HollyStCrypto IG

16) Run test script for new contract
MyNewNFTProject.test.js

16) App.js
- 131: value to match mint cost
- 151: change counter to number of images in your collection
- 200-202: update image link and name
- 208: Preminting message
- 220: Update image name

17) App.css
- h1
- sub-header

18) confirm testnet is available in config.json