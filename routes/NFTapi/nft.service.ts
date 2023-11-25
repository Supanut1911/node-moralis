import Moralis from "moralis";
import getChain from "../../utils/useGetchain";
class NFTService {
  public async nftOwnerByTokenId(
    address: string,
    chain: string,
    tokenId: string
  ) {
    const targetChain = getChain(chain);

    try {
      const response = await Moralis.EvmApi.nft.getNFTTokenIdOwners({
        address,
        chain: targetChain,
        tokenId,
      });
      return response;
    } catch (error) {
      return error;
    }
  }
}
export default NFTService;
