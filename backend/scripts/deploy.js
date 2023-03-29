const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account: " + deployer.address);

  // Deploy First
  const ERC20 = await hre.ethers.getContractFactory("Eneftee_ERC20");
  const erc20 = await ERC20.deploy();
  await erc20.deployed();

  console.log("ERC20 Contracts Deployed: " + erc20.address);

  // Deploy Second
  const NFTMarket_ERC721 = await hre.ethers.getContractFactory(
    "NFTMarket_ERC721"
  );
  const nftMarket = await NFTMarket_ERC721.deploy(erc20.address);
  await nftMarket.deployed();

  console.log("Main NFT Contracts Deployed: " + nftMarket.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// npx hardhat run --network localhost scripts/deploy.js
