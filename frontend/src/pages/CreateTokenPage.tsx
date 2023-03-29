import { Memory } from "@mui/icons-material";
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
import useNFTContract from "../hooks/useNFTContract";
import { assetsActions } from "../store/assetsSlice";
import { loaderActions } from "../store/loaderSlice";
import { RootState } from "../store/store";

function CreateTokenPage() {
  const [assetName, setAssetName] = useState("");
  const [assetDesc, setAssetDesc] = useState("");
  const address = useSelector(
    (state: RootState) => state.userSlice.user.address
  );

  const dispatch = useDispatch();

  const { mintNFT } = useNFTContract();

  const handleMintToken = async () => {
    if (assetName.trim() === "" || assetDesc.trim() === "") {
      alert("Asset details cannot be empty");
      return;
    }
    dispatch(loaderActions.updateLoadingStatus(true));
    const tokenID = await mintNFT(address, assetName, assetDesc);
    if (tokenID !== -1) {
      console.log("asset createdd...");
      dispatch(
        assetsActions.addNewAsset({
          id: tokenID,
          name: assetName,
          desc: assetDesc,
          isListed: false,
          price: 0,
        })
      );
      setAssetName("");
      setAssetDesc("");
      dispatch(loaderActions.updateLoadingStatus(false));
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          minWidth: "400px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          mt: "150px",
        }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 26, fontWeight: 700 }}>
            Mint your NFT!
          </Typography>
        </CardContent>
        <CardActions
          sx={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          <div style={{ width: "100%" }}>
            <TextField
              label="Asset Name"
              fullWidth
              size="small"
              variant="outlined"
              value={assetName}
              onChange={(event) => {
                setAssetName(event.target.value);
              }}
              sx={{ mb: "20px" }}
            />
            <TextField
              label="Asset Description"
              fullWidth
              size="small"
              variant="outlined"
              value={assetDesc}
              onChange={(event) => {
                setAssetDesc(event.target.value);
              }}
              sx={{ mb: "20px" }}
            />
          </div>
          <Button
            color="warning"
            fullWidth
            variant="contained"
            endIcon={<Memory />}
            size="large"
            onClick={handleMintToken}
          >
            Mint Now
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default CreateTokenPage;
