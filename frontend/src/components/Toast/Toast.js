import React, {useContext, useEffect, useState} from "react";
import './Toast.css'
import {ToastCustomContext} from "../../context/ToastContext";

export default function Toast(){
    // this is component for notification error, success, warn, info
    const toast = useContext(ToastCustomContext)
    return (
        <div className={toast.show === true?`${toast.body.background} notification-container bottom-right`:`${toast.body.background} notification-container bottom-right displayNone`}>
            <div className="notification toast-notification">
                <div className="notification-image">
                    <img src={toast.body.image} alt="" />
                </div>
                <div>
                    <p className="notification-title">{toast.body.title}</p>
                    <p className="notification-message">{toast.body.message}</p>
                </div>
            </div>
        </div>
    )
}