import express, { Request, Response } from "express";
import Moralis from "moralis";
import "dotenv/config";
import cors from "cors";
import walletRoute from "./routes/walletapi/wallet.route";
import nftRoute from "./routes/NFTapi/nft.route";
const app = express();

app.use(cors());
const port: number = 4000;

app.use("/api/wallet", walletRoute);
app.use("/api/nft", nftRoute);

const MORALIS_API_KEY: string = `${process.env.MORALIS_API_KEY}`;

// Add this a startServer function that initializes Moralis
const startServer = async (): Promise<void> => {
  await Moralis.start({
    apiKey: MORALIS_API_KEY,
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

startServer();
