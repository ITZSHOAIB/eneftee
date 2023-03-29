import {
  AccountCircle,
  ExpandMore,
  Person2Outlined,
  PersonOutlined,
  PersonTwoTone,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import useNFTContract from "../../hooks/useNFTContract";

function AssetCardAccordion({
  assetID,
  address,
}: {
  assetID: number;
  address: string | undefined;
}) {
  const [Ownership, setOwnership] = useState([]);
  const { getOwnershipHistory } = useNFTContract();

  useEffect(() => {
    getOwnershipHistory(address, assetID).then((data) => {
      setOwnership(data);
    });
  }, []);

  return (
    <Accordion elevation={0} sx={{ width: "100%" }}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        sx={{ padding: "0px", border: "none" }}
      >
        <Typography variant="caption">Ownership History</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: "0" }}>
        {[...Ownership].reverse().map((owner: any, i: number) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <PersonOutlined sx={{ mr: "5px", fontSize: "40px" }} />
            <div>
              <Typography variant="body2" sx={{ mr: "5px" }}>
                {owner.ownerName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(owner.time).toLocaleDateString()}
                {" | "}
                {new Date(owner.time).toLocaleTimeString("en-US")}
              </Typography>
            </div>
          </div>
        ))}
      </AccordionDetails>
    </Accordion>
  );
}

export default AssetCardAccordion;
