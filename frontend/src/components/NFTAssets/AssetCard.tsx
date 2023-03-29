import { DeleteForever, Storefront } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useNFTContract from "../../hooks/useNFTContract";
import { assetsActions } from "../../store/assetsSlice";
import { RootState } from "../../store/store";
import AssetCardAccordion from "./AssetCardAccordion";

interface assetType {
  id: number;
  name: string;
  desc: string;
  isListed: boolean;
  price: number;
}

function AssetCard({ asset }: { asset: assetType }) {
  const [price, setPrice] = useState(0);
  const address = useSelector(
    (state: RootState) => state.userSlice.user.address
  );
  const dispatch = useDispatch();

  const { listAssetForSell, removeAssetListing } = useNFTContract();

  const handleListForSellNFT = async () => {
    if (price === 0) {
      alert("Price should be greater than 0");
      return;
    }
    dispatch(
      assetsActions.updateListing({
        id: asset.id,
        isListed: true,
        price: price,
      })
    );
    await listAssetForSell(address, asset.id, price);
  };

  const handleRemoveFromListing = async () => {
    dispatch(
      assetsActions.updateListing({
        id: asset.id,
        isListed: false,
        price: 0,
      })
    );
    await removeAssetListing(address, asset.id);
  };

  return (
    <Card
      sx={{
        width: "300px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        px: "20px",
        py: "10px",
        m: "20px",
      }}
    >
      <CardContent sx={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <Typography gutterBottom variant="h6" component="div">
            {asset.name}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            #{asset.id}
          </Typography>
        </div>
        <Typography variant="body2" color="text.secondary">
          {asset.desc}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        {asset.isListed ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              marginBottom: "8px",
              alignItems: "center",
            }}
          >
            <Typography gutterBottom variant="button">
              {asset.price} EN20
            </Typography>
            <Button
              variant="contained"
              color="error"
              endIcon={<DeleteForever />}
              onClick={handleRemoveFromListing}
            >
              remove listing
            </Button>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              marginBottom: "8px",
              alignItems: "center",
            }}
          >
            <TextField
              label="Price"
              type="number"
              size="small"
              variant="outlined"
              value={price}
              onChange={(event) => {
                setPrice(parseInt(event.target.value));
              }}
            />
            <Button
              variant="contained"
              color="success"
              endIcon={<Storefront />}
              onClick={handleListForSellNFT}
            >
              Sell
            </Button>
          </div>
        )}
        <Typography variant="caption" color="text.secondary" sx={{ mr: "8px" }}>
          {asset.isListed ? "Already listed for sell" : "Not listed yet"}
        </Typography>
      </CardActions>
      <AssetCardAccordion assetID={asset.id} address={address} />
    </Card>
  );
}

export default AssetCard;
