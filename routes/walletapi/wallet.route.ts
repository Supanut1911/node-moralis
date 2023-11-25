import express, { Request, Response } from "express";
import WalletService from "./wallet.service";

const router = express.Router();
const walletService = new WalletService();

//get balance of wallet
router.get("/getETHprice", async (req: Request, res: Response) => {
  let { walletAddress, chain: chainInput } = req.query;
  walletAddress = walletAddress as string;
  chainInput = chainInput as string;
  const response = await walletService.getETHprice(walletAddress, chainInput);
  return res.json(response);
});

//get tx
router.get("/getTxAddress", async (req: Request, res: Response) => {
  let { address } = req.query;
  address = address as string;
  const response = await walletService.getTxAddress(address);
  return res.json(response);
});

//getBlockinfo
router.get("/getBlockInfo", async (req: Request, res: Response) => {
  const response = await walletService.getblockinfo();
  return res.json(response);
});

export default router;
