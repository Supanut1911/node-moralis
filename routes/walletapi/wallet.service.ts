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
}

export default WalletService;
