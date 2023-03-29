import { useDispatch, useSelector } from "react-redux";
import { fetchAPI } from "../helpers";
import { RootState } from "../store/store";
import { userActions } from "../store/userSlice";

const midPoint = "market";

const useNFTContract = () => {
  const isRegistered = useSelector(
    (state: RootState) => state.userSlice.user.isRegistered
  );

  const dispatch = useDispatch();

  const registerOrUpdateName = async (
    name: string,
    address: string | undefined
  ) => {
    const result = await fetchAPI(midPoint, "update-name", { address, name });
    if (result.success) {
      if (!isRegistered) dispatch(userActions.updateIsRegistered(true));
      dispatch(userActions.updateName(name));
    }
  };

  const getNameAndUpdate = async (address: string | undefined) => {
    const result = await fetchAPI(midPoint, "get-name", { address });
    if (result.success && result.name.trim() !== "") {
      dispatch(userActions.updateName(result.name));
      dispatch(userActions.updateIsRegistered(true));
    }
  };

  const mintNFT = async (
    address: string | undefined,
    assetName: string,
    assetDesc: string
  ) => {
    const result = await fetchAPI(midPoint, "mint-nft", {
      address,
      assetName,
      assetDesc,
      time: Date.now(),
    });
    if (result.success) return result.tokenID;
    return -1;
  };

  const getMyAssetsDetails = async (address: string | undefined) => {
    const result = await fetchAPI(midPoint, "my-asset-details", { address });
    if (result.success) return result.assetDetails;
    return [];
  };

  const listAssetForSell = async (
    address: string | undefined,
    tokenID: number | undefined,
    price: number
  ) => {
    const result = await fetchAPI(midPoint, "list-asset", {
      address,
      tokenID,
      price,
    });
    return result.success;
  };

  const removeAssetListing = async (
    address: string | undefined,
    tokenID: number | undefined
  ) => {
    const result = await fetchAPI(midPoint, "remove-asset", {
      address,
      tokenID,
    });
    return result.success;
  };

  const buyAsset = async (
    address: string | undefined,
    tokenID: number | undefined
  ) => {
    const dateNow = Date.now();
    const result = await fetchAPI(midPoint, "buy-asset", {
      address,
      tokenID,
      time: dateNow,
    });
    return result.success;
  };

  const getOwnershipHistory = async (
    address: string | undefined,
    tokenID: number
  ) => {
    const result = await fetchAPI(midPoint, "ownership-history", {
      address,
      tokenID,
    });
    console.log(result);
    if (result.success) return result.ownershipHistory;
    return [];
  };

  return {
    registerOrUpdateName,
    getNameAndUpdate,
    mintNFT,
    getMyAssetsDetails,
    listAssetForSell,
    removeAssetListing,
    buyAsset,
    getOwnershipHistory,
  } as const;
};

export default useNFTContract;
