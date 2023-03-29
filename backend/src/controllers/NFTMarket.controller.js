const NFTMarket_ERC721 = require("../artifacts/contracts/NFTMarket_ERC721.sol/NFTMarket_ERC721.json");
const { Contract, utils } = require("ethers");
const { JsonRpcProvider } = require("@ethersproject/providers");

const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS;

const createNFTMarketContract = (address) => {
  return new Contract(
    NFT_CONTRACT_ADDRESS,
    NFTMarket_ERC721.abi,
    new JsonRpcProvider().getSigner(address)
  );
};

async function updateName(req, res, next) {
  try {
    const { address, name } = req.body;
    const nftMarketContract = createNFTMarketContract(address);
    await nftMarketContract.updateUserName(name);
    res.json({ success: true });
  } catch (err) {
    console.error(`NFTMarketContract: `, err.message);
    res.json({ success: false });
    next(err);
  }
}

async function getName(req, res, next) {
  try {
    const { address } = req.body;
    const nftMarketContract = createNFTMarketContract(address);
    const name = await nftMarketContract.getUserName();
    res.json({ success: true, name: name });
  } catch (err) {
    console.error(`NFTMarketContract: `, err.message);
    res.json({ success: false });
    next(err);
  }
}

async function mintNFT(req, res, next) {
  try {
    const { address, assetName, assetDesc, time } = req.body;
    console.log(time);
    const nftMarketContract = createNFTMarketContract(address);
    const transaction = await nftMarketContract.safeMint(
      assetName,
      assetDesc,
      time
    );
    const jsonRpcProvider = new JsonRpcProvider();
    await jsonRpcProvider.waitForTransaction(transaction.hash);
    const receipt = await jsonRpcProvider.getTransactionReceipt(
      transaction.hash
    );
    const tokenID = parseInt(receipt.logs[0].topics[3], 16);
    res.json({ success: true, tokenID: tokenID });
  } catch (err) {
    console.error(`NFTMarketContract: `, err.message);
    res.json({ success: false });
    next(err);
  }
}

async function getMyAssetsDetails(req, res, next) {
  try {
    const { address } = req.body;
    const nftMarketContract = createNFTMarketContract(address);

    let myAssetDetails = await nftMarketContract.assetDetailsOfOwner();
    myAssetDetails = myAssetDetails.filter((asset) => asset.assetName !== "");
    const assetDetails = myAssetDetails.map((asset) => {
      return {
        id: asset.assetID.toNumber(),
        name: asset.assetName,
        desc: asset.assetDesc,
        isListed: asset.price.toNumber() > 0,
        price: asset.price.toNumber(),
      };
    });
    res.json({ success: true, assetDetails: assetDetails });
  } catch (err) {
    console.error(`NFTMarketContract: `, err.message);
    res.json({ success: false });
    next(err);
  }
}

async function listAssetForSell(req, res, next) {
  try {
    const { address, tokenID, price } = req.body;
    const nftMarketContract = createNFTMarketContract(address);
    const isListed = await nftMarketContract.listAsset(tokenID, price);
    res.json({ success: isListed ? true : false });
  } catch (err) {
    console.error(`NFTMarketContract: `, err.message);
    res.json({ success: false });
    next(err);
  }
}

async function removeAssetListing(req, res, next) {
  try {
    const { address, tokenID } = req.body;
    const nftMarketContract = createNFTMarketContract(address);

    const isRemoved = await nftMarketContract.removeListing(tokenID, address);
    res.json({ success: isRemoved ? true : false });
  } catch (err) {
    console.error(`NFTMarketContract: `, err.message);
    res.json({ success: false });
    next(err);
  }
}

async function buyAsset(req, res, next) {
  try {
    const { address, tokenID, time } = req.body;
    const nftMarketContract = createNFTMarketContract(address);

    const transaction = await nftMarketContract.buyAsset(tokenID, time);
    const jsonRpcProvider = new JsonRpcProvider();
    await jsonRpcProvider.waitForTransaction(transaction.hash);
    res.json({ success: true });
  } catch (err) {
    console.error(`NFTMarketContract: `, err.message);
    res.json({ success: false });
    next(err);
  }
}

async function getAssetOwnershipHistory(req, res, next) {
  try {
    const { address, tokenID } = req.body;
    const nftMarketContract = createNFTMarketContract(address);

    let ownershipHistory = await nftMarketContract.getAssetOwnershipHistory(
      tokenID
    );
    ownershipHistory = ownershipHistory.map((owner) => {
      return { ...owner, time: owner.time.toNumber() };
    });
    res.json({ success: true, ownershipHistory: ownershipHistory });
  } catch (err) {
    console.error(`NFTMarketContract: `, err.message);
    res.json({ success: false });
    next(err);
  }
}

module.exports = {
  updateName,
  getName,
  mintNFT,
  getMyAssetsDetails,
  listAssetForSell,
  removeAssetListing,
  buyAsset,
  getAssetOwnershipHistory,
};
