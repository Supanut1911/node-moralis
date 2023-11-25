// src/routes/userRoutes.ts

import express, { Request, Response } from "express";
import WalletService from "./wallet.service";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";

import getChain from "../../utils/useGetchain";
const router = express.Router();
const walletService = new WalletService();

router.get("/hello", (req: Request, res: Response) => {
  const response = walletService.hello();
  res.status(200).json({ response });
});

router.get("/getETHprice", async (req: Request, res: Response) => {
  let { walletAddress, chain: chainInput } = req.query;
  walletAddress = walletAddress as string;
  let targetChain = getChain(chainInput as string);
  try {
    const response = await Moralis.EvmApi.token.getTokenPrice({
      address: walletAddress,
      chain: targetChain,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error });
  }
});

export default router;
