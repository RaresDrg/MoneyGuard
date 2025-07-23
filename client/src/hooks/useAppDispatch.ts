import { useDispatch } from "react-redux";
import type { AppDispatch } from "../App.types";

const useAppDispatch = () => useDispatch<AppDispatch>();

export default useAppDispatch;
