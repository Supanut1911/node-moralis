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

  public async getblockinfo() {
    try {
      const now = new Date();
      const latestBlock = await Moralis.EvmApi.block.getDateToBlock({
        date: now,
        //ETH chain
        chain: "0x1",
      });

      let blockNrOrParentHash: number | string = latestBlock.toJSON().block;
      let previousBlockInfo = <any>[];

      //loop 5 block
      for (let i = 0; i < 5; i++) {
        const previousBlockNrs = await Moralis.EvmApi.block.getBlock({
          chain: "0x1",
          blockNumberOrHash: blockNrOrParentHash.toString(),
        });
        if (previousBlockNrs) {
          blockNrOrParentHash = previousBlockNrs.toJSON().parent_hash;
        }

        //get latest Tx at index = 0
        if (i == 0) {
          if (previousBlockNrs) {
            previousBlockInfo.push({
              transactions: previousBlockNrs.toJSON().transactions.map((i) => {
                return {
                  transactionHash: i.hash,
                  time: i.block_timestamp,
                  fromAddress: i.from_address,
                  toAddress: i.to_address,
                  value: i.value,
                };
              }),
            });
          }
        }
        if (previousBlockNrs) {
          previousBlockInfo.push({
            blockNumber: previousBlockNrs.toJSON().number,
            totalTransaction: previousBlockNrs.toJSON().transaction_count,
            gasUsed: previousBlockNrs.toJSON().gas_used,
            miner: previousBlockNrs.toJSON().miner,
            time: previousBlockNrs.toJSON().timestamp,
          });
        }
      }
      const response = {
        latestBlock: latestBlock.toJSON().block,
        previousBlockInfo,
      };
      return response;
    } catch (error) {
      console.log("error=>", error);

      return error;
    }
  }
}

export default WalletService;
