import { Box, CircularProgress } from "@mui/material";

function Loader() {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        background: "#798ff4",
        zIndex: 9999,
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
      }}
    >
      <CircularProgress color="inherit" size={60} thickness={5} />
    </Box>
  );
}

export default Loader;
