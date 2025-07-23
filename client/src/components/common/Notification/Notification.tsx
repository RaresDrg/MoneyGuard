import { ToastContainer } from "react-toastify";
import { Slide } from "react-toastify";

const Notification = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={2000}
      newestOnTop={false}
      closeOnClick
      draggable
      pauseOnFocusLoss
      pauseOnHover
      theme="light"
      transition={Slide}
    />
  );
};

export default Notification;
