import {useContext, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import './create-citizens.css'
import axios from "axios";
import {ToastCustomContext} from "../../../context/ToastContext";

export default function CreateCitizens(props){
    const toast = useContext(ToastCustomContext)
    const [cccd, setCccd] = useState("")
    const [name, setName] = useState("")
    const [date, setDate] = useState("")
    const [disease, setDisease] = useState("")
    const [vaccination, setVaccination] = useState("")

    const handleOnChange = (e) =>{
        let funcName =  e.target.name
        let valueSet = e.target.value

        if(funcName === "cccd"){
            setCccd(valueSet)
        }else if(funcName === "name"){
            setName(valueSet)
        }else if(funcName === "dateOfBirth"){
            setDate(valueSet)
        }else if(funcName === "disease"){
            setDisease(valueSet)
        }else if(funcName === "vaccination"){
            setVaccination(valueSet)
        }
    }

    // submit data
    const handleOnSubmit = (e)=>{
        e.preventDefault()
        axios.post("http://localhost:8080/citizens/add",{
            cccd:cccd,
            name:name,
            yearOfBirth:date,
            disease:disease,
            vaccination:vaccination
        })
            .then(res => {
                if (res.data.code === 200) {
                    toast.showToast("Create successfully","success")
                    props.setCreate(false);
                    window.location.reload()
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
            <div className="sign-container">
                <div className="sign-header flex">
                    <div className="sign-title">Thêm một hồ sơ công dân</div>
                    <div className="sign-close" onClick={() => props.setCreate(false)}>
                        <FontAwesomeIcon icon={faTimes} className="icon"/>
                    </div>
                </div>

                <div>
                    <form onSubmit={handleOnSubmit}>
                        <input className="input-css" type="text" placeholder="CCCD" name="cccd"
                               onChange={handleOnChange}/>
                        <input className="input-css" type="text" placeholder="Tên" name="name"
                               onChange={handleOnChange}/>
                        <input className="input-css" type="text" placeholder="Năm sinh" name="dateOfBirth"
                               onChange={handleOnChange}/>
                        <input className="input-css" type="text" placeholder="Bệnh nền" name="disease"
                               onChange={handleOnChange}/>
                        <input className="input-css" type="text" placeholder="Tiêm chủng vaccin" name="vaccination"
                               onChange={handleOnChange}/>
                        <button className="btn" type="submit">Tạo</button>
                    </form>
                </div>
            </div>
        </div>
    )
}