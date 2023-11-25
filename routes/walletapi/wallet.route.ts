// src/routes/userRoutes.ts

import express, { Request, Response } from "express";
import WalletService from "./wallet.service";

const router = express.Router();
const walletService = new WalletService();

router.get("/hello", (req: Request, res: Response) => {
  const response = walletService.hello();
  res.status(200).json({ response });
});

export default router;
