import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeAssetsList from "../components/NFTAssets/HomeAssetsList";

function Index() {
  const navigate = useNavigate();
  return (
    <>
      <div className="homepage-container">
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bolder",
            color: "white",
          }}
        >
          Welcome to eNeFTee!
        </Typography>
        <Typography
          gutterBottom
          variant="h6"
          sx={{
            color: "#e0e0e0",
          }}
        >
          Sell and Buy NFTs - An EN20 Based Marketplace
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            fontSize: "18px",
            fontWeigh: "bolder",
            mt: "10px",
          }}
          onClick={() => {
            navigate("/create");
          }}
        >
          Mint Your NFT Now!
        </Button>
      </div>
      <HomeAssetsList />
    </>
  );
}

export default Index;
