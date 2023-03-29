import { ShoppingCart } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useNFTContract from "../../hooks/useNFTContract";
import useTokenContract from "../../hooks/useTokenContract";
import { assetsActions } from "../../store/assetsSlice";
import { RootState } from "../../store/store";
import ConfirmDialog from "./ConfirmDialog";

interface assetType {
  id: number;
  name: string;
  desc: string;
  isListed: boolean;
  price: number;
}

function HomeAssetCard({ asset }: { asset: assetType }) {
  const userBalance = useSelector(
    (state: RootState) => state.userSlice.user.tokenBalance
  );
  const address = useSelector(
    (state: RootState) => state.userSlice.user.address
  );
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const dispatch = useDispatch();

  const { buyAsset, getMyAssetsDetails } = useNFTContract();
  const { updateMyBalance } = useTokenContract();

  const handleBuyNFT = async () => {
    if (userBalance < asset.price) {
      alert("Not enough EN20 Token! Purchase token first from profile page.");
      setOpenConfirmationDialog(false);
      return;
    }
    await buyAsset(address, asset.id);
    await updateMyBalance(address);
    const myAssetDetails = await getMyAssetsDetails(address);
    dispatch(assetsActions.updateWholeAssetList(myAssetDetails));
  };
  return (
    <>
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
              EN20: {asset.price}
            </Typography>
          </div>
          <Typography variant="body2" color="text.secondary">
            {asset.desc}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            width: "100%",
          }}
        >
          <Button
            variant="contained"
            color="warning"
            fullWidth
            endIcon={<ShoppingCart />}
            onClick={() => {
              setOpenConfirmationDialog(true);
            }}
          >
            BUY NOW
          </Button>
        </CardActions>
      </Card>
      <ConfirmDialog
        open={openConfirmationDialog}
        amount={asset.price}
        handleCancel={() => {
          setOpenConfirmationDialog(false);
        }}
        handleBuy={handleBuyNFT}
      />
    </>
  );
}

export default HomeAssetCard;
