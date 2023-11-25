// src/routes/userRoutes.ts

import express, { Request, Response } from "express";
import WalletService from "./wallet.service";

import getChain from "../../utils/useGetchain";
const router = express.Router();
const walletService = new WalletService();

router.get("/getETHprice", async (req: Request, res: Response) => {
  let { walletAddress, chain: chainInput } = req.query;
  walletAddress = walletAddress as string;
  chainInput = chainInput as string;
  const response = await walletService.getETHprice(walletAddress, chainInput);
  return res.json(response);
});

router.get("/getTxAddress", async (req: Request, res: Response) => {
  let { address } = req.query;
  address = address as string;
  const response = await walletService.getTxAddress(address);
  return res.json(response);
});

export default router;
