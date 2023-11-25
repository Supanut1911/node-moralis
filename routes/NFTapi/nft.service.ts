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

  public async nftOwnerByCollection(
    address: string,
    chain: string,
    ownerAddress: string
  ) {
    const targetChain = getChain(chain);
    let collectionArr;

    try {
      const response = await Moralis.EvmApi.nft.getNFTOwners({
        address,
        chain: targetChain,
      });
      let resJSON = response.toJSON();
      collectionArr = resJSON.result;

      const own = collectionArr.filter((item) => {
        return item.owner_of === ownerAddress;
      });
      return own;
    } catch (error) {
      return error;
    }
  }
}
export default NFTService;
