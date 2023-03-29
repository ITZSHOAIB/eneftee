import { AccountCircle } from "@mui/icons-material";
import { Badge, IconButton, Tooltip, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { minifyAddress } from "../../../helpers";

function AvatarNav({
  address,
  tokenBalance,
}: {
  address: string;
  tokenBalance: number;
}) {
  const navigate = useNavigate();
  const shortAddress = useMemo(() => minifyAddress(address), [address]);

  return (
    <Container sx={{ display: "flex", alignItems: "center" }}>
      <Tooltip title="Go to Profile">
        <IconButton
          onClick={() => {
            navigate("/profile");
          }}
          sx={{ p: 0, color: "white" }}
        >
          <Typography>{shortAddress}</Typography>
          <Badge badgeContent={tokenBalance} color="warning" max={999999999999}>
            <AccountCircle fontSize="large" />
          </Badge>
        </IconButton>
      </Tooltip>
    </Container>
  );
}

export default AvatarNav;
