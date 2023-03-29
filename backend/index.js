const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 3001;

const ERC20Route = require("./src/routes/ERC20.route");
const NFTMarketRoute = require("./src/routes/NFTMarket.route");

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "connected" });
});

app.use("/ERC20", ERC20Route);
app.use("/market", NFTMarketRoute);

app.listen(port, "0.0.0.0", () => {
  console.log(`eNeFTee app listening at http://localhost:${port}`);
});
