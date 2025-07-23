import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  addModal: false,
  editModal: false,
  deleteModal: false,
  logoutModal: false,
};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setModalOpen: (state, action: PayloadAction<keyof typeof initialState>) => {
      state[action.payload] = true;
    },
    setModalsClose: () => initialState,
  },
});

export const { setModalOpen, setModalsClose } = modalsSlice.actions;
export const modalsReducer = modalsSlice.reducer;
