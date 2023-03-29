import { LocalMall } from "@mui/icons-material";
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
import { RootState } from "../../store/store";
import useTokenContract from "../../hooks/useTokenContract";
import { loaderActions } from "../../store/loaderSlice";

function ProfileBottom() {
  const name = useSelector((state: RootState) => state.userSlice.user.name);
  const address = useSelector(
    (state: RootState) => state.userSlice.user.address
  );
  const tokenBalance = useSelector(
    (state: RootState) => state.userSlice.user.tokenBalance
  );
  const [localTokenBalance, setLocalTokenBalance] = useState(0);
  const dispatch = useDispatch();

  const { mintToken } = useTokenContract();

  const handleBuyToken = async () => {
    if (localTokenBalance === 0) return;
    dispatch(loaderActions.updateLoadingStatus(true));
    await mintToken(address, localTokenBalance);
    dispatch(loaderActions.updateLoadingStatus(false));
  };

  return (
    <Card
      sx={{
        minWidth: "400px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 30, fontWeight: 500 }}>
          EN20 Balance: <b>{tokenBalance}</b>
        </Typography>
      </CardContent>
      <CardActions
        sx={{ width: "100%", display: "flex", flexDirection: "column" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: "20px",
          }}
        >
          <TextField
            label="Amount"
            type="number"
            size="small"
            variant="outlined"
            fullWidth
            value={localTokenBalance}
            onChange={(event) => {
              setLocalTokenBalance(
                event.target.value === "" ? 0 : parseInt(event.target.value)
              );
            }}
            sx={{ maxWidth: "65%" }}
          />
          <Button
            color="secondary"
            variant="contained"
            endIcon={<LocalMall />}
            onClick={handleBuyToken}
          >
            Buy EN20
          </Button>
        </div>
        <Typography variant="caption">1 ENEFT TKN = 0.0001 ETH</Typography>
      </CardActions>
    </Card>
  );
}

export default ProfileBottom;
