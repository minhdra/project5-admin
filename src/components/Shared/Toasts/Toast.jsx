import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export default function Toast({
  position = 'top-right',
  autoClose = 5000,
  hideProgressBar = false,
  newestOnTop = true,
  closeOnClick = true,
  rtl = false,
  pauseOnFocusLoss = true,
  draggable = true,
  pauseOnHover = true,
  theme = 'light',
}) {
  return (
    <>
      <ToastContainer
        position={position}
        autoClose={autoClose}
        hideProgressBar={hideProgressBar}
        newestOnTop={newestOnTop}
        closeOnClick={closeOnClick}
        theme={theme}
        pauseOnHover={pauseOnHover}
        pauseOnFocusLoss={pauseOnFocusLoss}
        draggable={draggable}
        rtl={rtl}
      />
    </>
  );
}
