import express, { Request, Response } from "express";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import "dotenv/config";
import cors from "cors";
import walletRoute from "./routes/walletapi/wallet.route";

const app = express();

app.use(cors());
const port: number = 4000;

app.use("/api", walletRoute);

// Add a variable for the api key, address, and chain
const MORALIS_API_KEY: string = `${process.env.MORALIS_API_KEY}`;

//
app.get("nft-owner-by-tokenid", async (req: Request, res: Response) => {
  let { address, chainInput } = req.query;
  address = address as string;
  let chain: EvmChain;
  switch (chainInput) {
    case "sepolia":
      chain = EvmChain.SEPOLIA;
      break;
    case "mumbai":
      chain = EvmChain.MUMBAI;
      break;
    default:
      chain = EvmChain.SEPOLIA;
  }
  const tokenId = "0";

  try {
    const response = await Moralis.EvmApi.nft.getNFTTokenIdOwners({
      address,
      chain,
      tokenId,
    });
    return res.json(response);
  } catch (error) {
    console.log("error => ", error);
  }
});

const getChain = (chainName: string): EvmChain => {
  let chain: EvmChain;
  switch (chainName) {
    case "sepolia":
      chain = EvmChain.SEPOLIA;
      break;
    case "mumbai":
      chain = EvmChain.MUMBAI;
      break;
    default:
      chain = EvmChain.SEPOLIA;
  }
  return chain;
};

app.get("/nft-owner-by-collection", async (req: Request, res: Response) => {
  let { address, chainInput, ownerAddress } = req.query;
  address = address as string;
  chainInput = chainInput as string;
  ownerAddress = ownerAddress as string;
  ownerAddress = ownerAddress.toLocaleLowerCase();
  const chain = getChain(chainInput);
  let collectionArr;
  try {
    const response = await Moralis.EvmApi.nft.getNFTOwners({
      address,
      chain,
    });
    let resJSON = response.toJSON();
    collectionArr = resJSON.result;

    const own = collectionArr.filter((item) => {
      return item.owner_of === ownerAddress;
    });
    return res.json(own);
    // return res.json(collectionArr);
  } catch (error) {
    console.log("error => ", error);
  }
});

// Add this a startServer function that initializes Moralis
const startServer = async (): Promise<void> => {
  await Moralis.start({
    apiKey: MORALIS_API_KEY,
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

// Call startServer()
startServer();
