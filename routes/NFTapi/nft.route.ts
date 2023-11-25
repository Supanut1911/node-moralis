// src/routes/userRoutes.ts

import express, { Request, Response } from "express";
import NFTService from "./nft.service";

import getChain from "../../utils/useGetchain";
const router = express.Router();
const nftService = new NFTService();

//get balance of wallet
router.get("/nft-owner-by-tokenid", async (req: Request, res: Response) => {
  let { walletAddress, chain: chainInput, tokenId } = req.query;
  walletAddress = walletAddress as string;
  chainInput = chainInput as string;
  tokenId = tokenId as string;

  const response = await nftService.nftOwnerByTokenId(
    walletAddress,
    chainInput,
    tokenId
  );
  return res.json(response);
});

export default router;
