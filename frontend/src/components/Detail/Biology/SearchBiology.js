import {ToastCustomContext} from "../../../context/ToastContext";
import axios from "axios";
import Profile from "./profile/Profile";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {useContext, useState} from "react";
import './biology-create.css'

export default function SearchBiology(props){
    const toast = useContext(ToastCustomContext)
    const [profile, setProfile] = useState({})
    const [openProfile, setOpenProfile] = useState(false)
    const [cccd, setCccd] = useState("")

    const handleOnChange = (e) =>{
        setCccd(e.target.value)
    }

    // submit data
    const handleOnSubmit = (e)=>{
        e.preventDefault()
        axios.get("http://localhost:8080/biology/find?cccd="+cccd)
            .then(res => {
                if (res.data.code === 200) {
                    toast.showToast("Create successfully","success")
                    setProfile(res.data.data)
                    console.log(res.data.data)
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
                            <div className="sign-title">Tìm kiếm chỉ số sinh học bằng căn cước công dân</div>
                            <div className="sign-close" onClick={() => props.setCreate(false)}>
                                <FontAwesomeIcon icon={faTimes} className="icon"/>
                            </div>
                        </div>

                        <div>
                            <form onSubmit={handleOnSubmit}>
                                <input className="input-css" type="text" placeholder="CCCD" name="cccd"
                                       onChange={handleOnChange}/>
                                <button className="btn" type="submit">Tìm kiếm</button>
                            </form>
                        </div>
                    </div>
            }
        </div>
    )
}