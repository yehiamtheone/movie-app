import { createContext, useContext, useState} from "react";
const alertContext = createContext();

export const AlertProvider = ({children})=>{
    const [alert, setAlert] = useState({
        message:"",
        variant: "",
        show: false
        
    });
    const showAlert = (message, variant = "success")=>{
        setAlert({
            message,
            variant,
            show:true
        })
    };
    const hideAlert = ()=>{
        setAlert({...alert, show: false});
    };

    const value = { alert, showAlert, hideAlert };
    return (
        <alertContext.Provider value={value}>{children}</alertContext.Provider>
    )
    
}
export const useAlert = ()=>{
    return useContext(alertContext);
}