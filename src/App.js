import { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import ERC20BuyABI from "./abi/ERC20Buy.json";
import { ethers } from "ethers";

function App() {
  const [tokenDetails, setTokenDetails] = useState({});
  const { config } = usePrepareContractWrite({
    address: tokenDetails?.contractAddress,
    abi: ERC20BuyABI,
    functionName: "buy",
    overrides: {
      value: ethers.utils.parseEther("0.001"),
    },
  });
  const { isLoading, isSuccess, write } = useContractWrite(config);

  console.log(`Was the token bought successfully? ${isSuccess}`);

  /**
   * @description Fetch Token metadata with Moralis EVM API
   */
  const fetchTokenMetadata = async () => {
    const res = await (await fetch("http://localhost:4000")).json();
    setTokenDetails(res?.[0]?.token);
  };

  useEffect(() => {
    fetchTokenMetadata();
  }, []);

  return (
    <div>
      <ConnectButton accountStatus="address" chainStatus="name" />
      <div>Name: {tokenDetails?.name}</div>
      <div>Symbol: {tokenDetails?.symbol}</div>
      <div>Decimals: {tokenDetails?.decimals}</div>
      <div>Contract Address: {tokenDetails?.contractAddress}</div>
      <div>
        <button disabled={isLoading} onClick={() => write()}>
          Buy Token
        </button>
      </div>
    </div>
  );
}

export default App;
