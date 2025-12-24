import type { RootState } from "../../App.types";

const generalSelectors = {
  selectActiveLoader: (state: RootState) => state.general.activeLoader,
  selectActiveModal: (state: RootState) => state.general.activeModal,
};

export default generalSelectors;
