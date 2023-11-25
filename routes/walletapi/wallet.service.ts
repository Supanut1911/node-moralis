import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import getChain from "../../utils/useGetchain";
class WalletService {
  public async getETHprice(walletAddress: string, chainInput: string) {
    const targetChain = getChain(chainInput);
    try {
      return await Moralis.EvmApi.token.getTokenPrice({
        address: walletAddress,
        chain: targetChain,
      });
    } catch (error) {
      return error;
    }
  }

  public async getTxAddress(address: string) {
    try {
      const chain = "0x1";
      const response =
        await Moralis.EvmApi.transaction.getWalletTransactionsVerbose({
          address,
          chain,
        });
      return response;
    } catch (error) {
      return error;
    }
  }
}

export default WalletService;
