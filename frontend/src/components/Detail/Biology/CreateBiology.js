import {useContext, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import './biology-create.css'
import axios from "axios";
import {ToastCustomContext} from "../../../context/ToastContext";
import Profile from "./profile/Profile";

export default function CreateBiology(props){
    const toast = useContext(ToastCustomContext)
    const [profile, setProfile] = useState({})
    const [openProfile, setOpenProfile] = useState(false)
    const [cccd, setCccd] = useState("")
    const [bloodPressure, setBloodPressure] = useState("")
    const [temperature, setTemperature] = useState("")
    const [breathing, setBreathing] = useState("")
    const [heartBeat, setHeartBeat] = useState("")
    const [spo2, setSpo2] = useState("")

    const handleOnChange = (e) =>{
        let funcName =  e.target.name
        let valueSet = e.target.value

        if(funcName === "cccd"){
            setCccd(valueSet)
        }else if(funcName === "blood"){
            setBloodPressure(valueSet)
        }else if(funcName === "temp"){
            setTemperature(valueSet)
        }else if(funcName === "breath"){
            setBreathing(valueSet)
        }else if(funcName === "heart"){
            setHeartBeat(valueSet)
        }else if(funcName === "spo2"){
            setSpo2(valueSet)
        }
    }

    // submit data
    const handleOnSubmit = (e)=>{
        e.preventDefault()
        axios.post("http://localhost:8080/biology/index/add",{
            cccd:cccd,
            bloodPressure:bloodPressure,
            temperature:temperature,
            breathing:breathing,
            heartBeat:heartBeat,
            spo2: spo2
        })
            .then(res => {
                if (res.data.code === 200) {
                    toast.showToast("Create successfully","success")
                    setProfile(res.data.data)
                    setOpenProfile(true)
                } else {
                    toast.showToast(res.data.message,"warn")
                }
            })
            .catch(err => {
                toast.showToast(err.message,"success")
            })
    }

    return(
        <div>
            {
                openProfile ?
                    <Profile profile = {profile} setCreate={props.setCreate}/>:
                    <div className="sign-container">
                        <div className="sign-header flex">
                            <div className="sign-title">Thêm một chỉ số sinh học</div>
                            <div className="sign-close" onClick={() => props.setCreate(false)}>
                                <FontAwesomeIcon icon={faTimes} className="icon"/>
                            </div>
                        </div>

                        <div>
                            <form onSubmit={handleOnSubmit}>
                                <input className="input-css" type="text" placeholder="CCCD" name="cccd"
                                       onChange={handleOnChange}/>
                                <input className="input-css" type="text" placeholder="Huyết áp" name="blood"
                                       onChange={handleOnChange}/>
                                <input className="input-css" type="text" placeholder="Nhiệt độ" name="temp"
                                       onChange={handleOnChange}/>
                                <input className="input-css" type="text" placeholder="Nhịp thở" name="breath"
                                       onChange={handleOnChange}/>
                                <input className="input-css" type="text" placeholder="Nhịp tim" name="heart"
                                       onChange={handleOnChange}/>
                                <input className="input-css" type="text" placeholder="SPO2" name="spo2"
                                       onChange={handleOnChange}/>
                                <button className="btn" type="submit">Tạo</button>
                            </form>
                        </div>
                    </div>
            }
        </div>
    )
}