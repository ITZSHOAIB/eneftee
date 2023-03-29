import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import AssetCard from "../components/NFTAssets/AssetCard";
import { RootState } from "../store/store";
import NoAssetImg from "../assets/images/no_asset.svg";

function MyAssetsPage() {
  const assets = useSelector((state: RootState) => state.assetsSlice.assets);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      {assets.map((asset) => {
        return <AssetCard key={asset.id} asset={asset} />;
      })}
      {assets.length === 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "30px",
            marginTop: "10%",
          }}
        >
          <img src={NoAssetImg} alt="No Asset" style={{ width: "30%" }} />
          <Typography variant="h5">No Asset minted yet...</Typography>
        </div>
      )}
    </div>
  );
}

export default MyAssetsPage;
