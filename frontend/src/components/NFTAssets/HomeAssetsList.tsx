import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useNFTContract from "../../hooks/useNFTContract";
import { loaderActions } from "../../store/loaderSlice";
import { RootState } from "../../store/store";
import HomeAssetCard from "./HomeAssetCard";
import NoListing from "../../assets/images/no_listing.svg";

const NFT_CONTRACT_ADDRESS = process.env
  .REACT_APP_NFT_CONTRACT_ADDRESS as string;

function HomeAssetsList() {
  const [assets, setAssets] = useState([]);
  const myAssets = useSelector((state: RootState) => state.assetsSlice.assets);

  const dispatch = useDispatch();

  const { getMyAssetsDetails } = useNFTContract();
  useEffect(() => {
    dispatch(loaderActions.updateLoadingStatus(true));
    getMyAssetsDetails(NFT_CONTRACT_ADDRESS)
      .then((listedAssets) => {
        const myAssetIDs = myAssets.map((asset) => asset.id);
        listedAssets = listedAssets.filter(
          (asset: any) => !myAssetIDs.includes(asset.id)
        );
        setAssets(listedAssets);
        dispatch(loaderActions.updateLoadingStatus(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(loaderActions.updateLoadingStatus(false));
      });
  }, [myAssets]);
  return (
    <>
      <Typography variant="h5" sx={{ textAlign: "center" }}>
        Listed Assets
      </Typography>

      {assets.length === 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "30px",
          }}
        >
          <img src={NoListing} alt="No Asset" style={{ width: "20%" }} />
          <Typography variant="h5">No Asset listed yet...</Typography>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "flex-start",
            paddingBottom: "60px",
          }}
        >
          {assets.map((asset: any) => {
            return <HomeAssetCard key={asset.id} asset={asset} />;
          })}
        </div>
      )}
    </>
  );
}

export default HomeAssetsList;
