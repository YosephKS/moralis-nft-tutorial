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

  const address = "0x3358f257E427150c834877f46d6aE09DCdE0Bc6A";

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
