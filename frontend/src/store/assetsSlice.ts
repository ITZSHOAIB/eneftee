import { createSlice } from "@reduxjs/toolkit";

type assetType = {
  id: number;
  name: string;
  desc: string;
  isListed: boolean;
  price: number;
};

type assetsType = {
  assets: assetType[];
};

const initialState: assetsType = { assets: [] };

export const assetsSlice = createSlice({
  name: "assets",
  initialState: initialState,
  reducers: {
    addNewAsset: (state, action: { payload: assetType }) => {
      state.assets.push(action.payload);
    },
    updateWholeAssetList: (state, action: { payload: assetType[] }) => {
      state.assets = action.payload;
    },
    concatAssetList: (state, action: { payload: assetType[] }) => {
      state.assets = state.assets.concat(action.payload);
    },
    updateListing: (
      state,
      action: { payload: { id: number; isListed: boolean; price: number } }
    ) => {
      state.assets = state.assets?.map((asset) =>
        asset.id === action.payload.id
          ? {
              ...asset,
              isListed: action.payload.isListed,
              price: action.payload.price,
            }
          : { ...asset }
      );
    },
  },
});

export const assetsActions = assetsSlice.actions;

export const assetsReducer = assetsSlice.reducer;
