import { EvmChain } from "@moralisweb3/common-evm-utils";

const getChain = (chainName: string): EvmChain => {
  let chain: EvmChain;
  switch (chainName) {
    case "sepolia":
      chain = EvmChain.SEPOLIA;
      break;
    case "mumbai":
      chain = EvmChain.MUMBAI;
      break;
    default:
      chain = EvmChain.ETHEREUM;
  }
  return chain;
};

export default getChain;
