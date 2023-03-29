import { useDispatch } from "react-redux";
import { fetchAPI } from "../helpers";
import { userActions } from "../store/userSlice";

const midPoint = "ERC20";

const useTokenContract = () => {
  const dispatch = useDispatch();

  const mintToken = async (address: string | undefined, amount: number) => {
    const result = await fetchAPI(midPoint, "mint-token", { address, amount });
    if (result.success) dispatch(userActions.addBalance(amount));
  };

  const updateMyBalance = async (address: string | undefined) => {
    const result = await fetchAPI(midPoint, "my-balance", { address });
    if (result.success) dispatch(userActions.updateBalance(result.balance));
  };

  return { mintToken, updateMyBalance } as const;
};

export default useTokenContract;
