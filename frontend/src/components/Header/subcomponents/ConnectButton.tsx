import { AccountBalanceWallet } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

function ConnectButton({ connectWallet }: { connectWallet: () => any }) {
  return (
    <Button
      variant="outlined"
      color="inherit"
      endIcon={<AccountBalanceWallet />}
      onClick={connectWallet}
    >
      Connect
    </Button>
  );
}

export default ConnectButton;
