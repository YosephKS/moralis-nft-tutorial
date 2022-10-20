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

  const addresses = ["0x04a84D36623D6D870C8B876c519eaaFB47A82165"];

  const response = await Moralis.EvmApi.token.getTokenMetadata({
    addresses,
    chain,
  });

  res.send(response);
});

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
});
