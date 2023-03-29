import { Update } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import useNFTContract from "../../hooks/useNFTContract";
import { RootState } from "../../store/store";

function ProfileTop() {
  const name = useSelector((state: RootState) => state.userSlice.user.name);
  const address = useSelector(
    (state: RootState) => state.userSlice.user.address
  );
  const [localName, setLocalName] = useState(name);

  const { registerOrUpdateName } = useNFTContract();

  const handleUpdateName = async () => {
    if (localName.trim() === "") {
      alert("Name cannot be empty!");
      return;
    }
    if (typeof window.ethereum === undefined) {
      alert("window.ethereum is undefined");
      return;
    }

    registerOrUpdateName(localName, address);
  };

  return (
    <Card
      sx={{
        minWidth: "400px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        my: "30px",
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 26, fontWeight: 700 }}>
          Welcome {name}!
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
          value={localName}
          onChange={(event) => {
            setLocalName(event.target.value);
          }}
          sx={{ mb: "20px" }}
        />
        <Button
          color="warning"
          fullWidth
          variant="outlined"
          endIcon={<Update />}
          onClick={handleUpdateName}
          sx={{ mb: "20px" }}
        >
          Update Name
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProfileTop;
