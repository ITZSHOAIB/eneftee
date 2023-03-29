import { RocketLaunch } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import useNFTContract from "../../hooks/useNFTContract";
import { RootState } from "../../store/store";

function Register() {
  const [name, setName] = useState("");
  const nameInputRef = useRef(null);
  const address = useSelector(
    (state: RootState) => state.userSlice.user.address
  );

  const { registerOrUpdateName } = useNFTContract();

  const handleRegister = async () => {
    if (name.trim() === "") {
      alert("Please enter your name!");
      return;
    }
    if (typeof window.ethereum === undefined) {
      alert("window.ethereum is undefined");
      return;
    }

    await registerOrUpdateName(name, address);
  };
  return (
    <Card
      sx={{
        maxWidth: "580px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        mt: "150px",
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 22, fontWeight: 700 }}>
          Welcome! <br />
          Your Wallet is connected. Now register please!
        </Typography>
      </CardContent>
      <CardActions
        sx={{ width: "100%", display: "flex", flexDirection: "column" }}
      >
        <TextField
          label="Name"
          fullWidth
          size="small"
          variant="outlined"
          inputRef={nameInputRef}
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          sx={{ mb: "20px" }}
        />
        <Button
          fullWidth
          variant="outlined"
          endIcon={<RocketLaunch />}
          onClick={handleRegister}
        >
          Register
        </Button>
      </CardActions>
    </Card>
  );
}

export default Register;
