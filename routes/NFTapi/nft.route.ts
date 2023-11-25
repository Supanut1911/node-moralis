// src/routes/userRoutes.ts

import express, { Request, Response } from "express";
import NFTService from "./nft.service";

const router = express.Router();
const nftService = new NFTService();

//get nft owner by tokenId
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

//get nft owner by collection
router.get("/nft-owner-by-collection", async (req: Request, res: Response) => {
  let { contractAddress, chain, ownerAddress } = req.query;
  contractAddress = contractAddress as string;
  chain = chain as string;
  ownerAddress = ownerAddress as string;
  ownerAddress = ownerAddress.toLocaleLowerCase();
  const response = await nftService.nftOwnerByCollection(
    contractAddress,
    chain,
    ownerAddress
  );
  return res.json(response);
});

export default router;
