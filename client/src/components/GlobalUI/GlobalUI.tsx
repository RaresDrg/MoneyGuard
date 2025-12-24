import { createPortal } from "react-dom";
import GlobalLoading from "./GlobalLoading/GlobalLoading";
import GlobalModal from "./Modals/GlobalModal";
import Notification from "./Notification/Notification";

const GlobalUI = () => {
  const loadingRoot = document.getElementById("loading-root")!;
  const modalRoot = document.getElementById("modal-root")!;
  const notificationRoot = document.getElementById("notification-root")!;

  return (
    <>
      {createPortal(<GlobalLoading />, loadingRoot)}
      {createPortal(<GlobalModal />, modalRoot)}
      {createPortal(<Notification />, notificationRoot)}
    </>
  );
};

export default GlobalUI;
