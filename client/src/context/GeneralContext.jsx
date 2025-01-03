import { createContext } from "react";
import { toast } from "react-toastify";

export const GeneralContext = createContext();

const GeneralContextProvider = ({ children }) => {
  const customAlert = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <GeneralContext.Provider value={{ customAlert }}>
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;
