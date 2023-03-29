const express = require("express");
const router = express.Router();
const NFTMarketController = require("../controllers/NFTMarket.controller");

router.post("/update-name", NFTMarketController.updateName);
router.post("/get-name", NFTMarketController.getName);
router.post("/mint-nft", NFTMarketController.mintNFT);
router.post("/my-asset-details", NFTMarketController.getMyAssetsDetails);
router.post("/list-asset", NFTMarketController.listAssetForSell);
router.post("/remove-asset", NFTMarketController.removeAssetListing);
router.post("/buy-asset", NFTMarketController.buyAsset);
router.post("/ownership-history", NFTMarketController.getAssetOwnershipHistory);

module.exports = router;
