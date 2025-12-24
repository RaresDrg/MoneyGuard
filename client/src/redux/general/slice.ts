import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { GeneralState, LoadingType, ModalType } from "../../App.types";

const initialState: GeneralState = {
  activeLoader: null,
  activeModal: null,
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    resetSlice() {
      return initialState;
    },
    setActiveLoader(state, action: PayloadAction<LoadingType | null>) {
      state.activeLoader = action.payload;
    },
    setActiveModal(state, action: PayloadAction<ModalType | null>) {
      state.activeModal = action.payload;
    },
  },
});

export const { actions, reducer } = generalSlice;
