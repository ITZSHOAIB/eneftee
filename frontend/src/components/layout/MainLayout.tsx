import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { userActions } from "../../store/userSlice";
import Header from "../Header/Header";
import Web3Modal from "web3modal";
import { Web3Provider } from "@ethersproject/providers";
import { useEffect } from "react";
import useTokenContract from "../../hooks/useTokenContract";
import Register from "../Register/Register";
import { RootState } from "../../store/store";
import useNFTContract from "../../hooks/useNFTContract";
import { assetsActions } from "../../store/assetsSlice";
import Loader from "./Loader";
import { loaderActions } from "../../store/loaderSlice";

export function MainLayout() {
  const isRegistered = useSelector(
    (state: RootState) => state.userSlice.user.isRegistered
  );
  const address = useSelector(
    (state: RootState) => state.userSlice.user.address
  );
  const isLoading = useSelector(
    (state: RootState) => state.loaderSlice.loader.isLoading
  );

  const dispatch = useDispatch();
  const { updateMyBalance } = useTokenContract();
  const { getMyAssetsDetails, getNameAndUpdate } = useNFTContract();

  useEffect(() => {
    const web3modal = new Web3Modal();
    if (web3modal.cachedProvider) connectWallet();
    window.ethereum.on("accountsChanged", connectWallet);
    fetchAssetsList(address);
  }, [address]);

  const connectWallet = async () => {
    if (typeof window.ethereum === undefined) {
      alert("window.ethereum is undefined");
      return;
    }
    dispatch(loaderActions.updateLoadingStatus(true));
    try {
      const web3modal = new Web3Modal({ cacheProvider: true });
      const instance = await web3modal.connect();
      const provider = new Web3Provider(instance);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      dispatch(userActions.updateAddress(address));

      await getNameAndUpdate(address);
      await updateMyBalance(address);
    } catch (e) {
      console.log(e);
      dispatch(loaderActions.updateLoadingStatus(false));
    }
    dispatch(loaderActions.updateLoadingStatus(false));
  };

  const fetchAssetsList = async (address: string | undefined) => {
    const myAssetDetails = await getMyAssetsDetails(address);
    dispatch(assetsActions.updateWholeAssetList(myAssetDetails));
  };

  return (
    <>
      <Header connectWallet={connectWallet} />
      <Box
        sx={{
          display: "flex",
          position: "relative",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {address && isRegistered ? (
          <main style={{ flexGrow: 1 }}>
            <Outlet />
          </main>
        ) : !isRegistered && address ? (
          <Register />
        ) : (
          <>Wallet Not connected!!</>
        )}
      </Box>
      {isLoading && <Loader />}
    </>
  );
}
