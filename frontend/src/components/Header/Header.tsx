import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import AvatarNav from "./subcomponents/AvatarNav";
import ConnectButton from "./subcomponents/ConnectButton";

const pages = [
  {
    name: "My Assets",
    path: "/my-assets",
  },
  {
    name: "Create",
    path: "/create",
  },
];

function Header({ connectWallet }: { connectWallet: () => any }) {
  const navigate = useNavigate();
  const userAddress = useSelector(
    (state: RootState) => state.userSlice.user.address
  );
  const tokenBalance = useSelector(
    (state: RootState) => state.userSlice.user.tokenBalance
  );

  return (
    <AppBar color="secondary" position="sticky">
      <Container>
        <Toolbar>
          <Typography
            variant="h2"
            noWrap
            onClick={() => {
              navigate("/");
            }}
            sx={{
              mr: 2,
              fontWeight: 700,
              fontSize: "30px",
              cursor: "pointer",
            }}
          >
            eNeFTee
          </Typography>

          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            {pages.map((page) => (
              <Button
                key={page.path}
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={() => {
                  navigate(page.path);
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {userAddress ? (
              <AvatarNav address={userAddress} tokenBalance={tokenBalance} />
            ) : (
              <ConnectButton connectWallet={connectWallet} />
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
