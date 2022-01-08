import {createContext, useState} from "react";
import error from "../../src/assets/images/error.svg"
import success from "../../src/assets/images/check.svg"
import info from "../../src/assets/images/info.svg"
import warn from "../../src/assets/images/warning.svg"

const ToastCustomContext = createContext()
//this context to provide how to create popup notification
//this context is used with Toast component

function ToastCustomProvider({children}){
    const [show,setShow] = useState(false)
    const [body,setBody] = useState({
        message:"",
        title:"Success",
        image:"",
        background:""
    })
    function showToast(message,image){
        let background
        let imageUrl
        let title
        if(image==="error"){
            imageUrl = error
            title = "Error"
            background = "bg-error"
        }else if(image === "success"){
            imageUrl = success
            title = "Success"
            background = "bg-success"
        }else if(image === "info"){
            imageUrl = info
            title = "Info"
            background = "bg-info"
        }else if(image === "warn"){
            imageUrl = warn
            title = "Warn"
            background = "bg-warn"
        }
        setBody({
            message: message,
            title: title,
            image: imageUrl,
            background: background
        })
        setShow(true)
        console.log(show)
        setTimeout(()=>{
            setShow(false)
        },3000)
    }
    const val = {
        show,
        setShow,
        body,
        setBody,
        showToast
    }
    return(
        <ToastCustomContext.Provider value={val}>
            {children}
        </ToastCustomContext.Provider>
    )
}
export {ToastCustomContext,ToastCustomProvider}