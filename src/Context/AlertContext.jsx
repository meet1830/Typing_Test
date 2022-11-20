import { createContext, useContext, useState } from "react";

const AlertContext = createContext();

export const AlertContextProvider = ({children}) => {
    // const [open, setOpen] = useState(false);
    // const [type, setType] = useState("");
    // const [message, setMessage] = useState("");
    // instead of having 3 states using one state with an object as value

    const [alert, setAlert] = useState({
        open: false,
        type: "",
        message: "",
    })
    
    const values = {
        // open, 
        // setOpen,
        // type,
        // setType,
        // message,
        // setMessage

        alert,
        setAlert
    }

    return (<AlertContext.Provider value={values}>{children}</AlertContext.Provider>)
}

export const useAlert = () => useContext(AlertContext);