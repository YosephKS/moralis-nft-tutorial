const express = require("express");
const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/evm-utils");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
const port = 4000;
dotenv.config();

app.use(cors());

app.get("/", async (req, res) => {
  await Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
  });

  const chain = EvmChain.GOERLI;

  const address = "0x2FC8768C532Ca7F567AD87a11bB2F02487D934FA";

  const tokenId = "0";

  const response = await Moralis.EvmApi.nft.getNFTMetadata({
    address,
    chain,
    tokenId,
  });

  res.send(response);
});

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
});
