import './biology-create.css'
import {ToastCustomContext} from "../../../context/ToastContext";
import axios from "axios";
import Profile from "./profile/Profile";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {useContext, useState} from "react";
import Table from "../../Table/Table";
import TableDontLimit from "../../Table/TableDontLimit";
export default function History(props){
    const toast = useContext(ToastCustomContext)
    const [profile, setProfile] = useState({})
    const [openProfile, setOpenProfile] = useState(false)
    const [cccd, setCccd] = useState("")

    const handleOnChange = (e) =>{
        setCccd(e.target.value)
    }
    const biologyHeader = [
        'Ngày',
        'CCCD',
        'Tên',
        'Huyết áp',
        'Nhiệt độ',
        'Nhịp thở',
        'Nhịp tim',
        'SPO2',
        'Mức độ'
    ]
    const renderHead = (item, index) => <th key={index}>{item}</th>
    const renderBody = (item, index) => {
        let color = ''
        let background = ''
        if(item.level === 2){
            color = 'white'
            background = 'yellow'
        }else if(item.level === 3){
            background = 'orange'
            color = 'white'
        }else if(item.level >= 4){
            color = 'white'
            background = 'red'
        }else if(item.level === 1){
            color = 'white'
            background = 'green'
        }
        return (
            <tr key={index} style={{background: background, color: color}}>
                <td>{item.date}</td>
                <td>{item.cccd}</td>
                <td>{item.patientsName}</td>
                <td>{item.bloodPressure}</td>
                <td>{item.temperature}</td>
                <td>{item.breathing}</td>
                <td>{item.heartBeat}</td>
                <td>{item.spo2}</td>
                <td>{item.level}</td>
            </tr>
        )
    }

    // submit data
    const handleOnSubmit = (e)=>{
        e.preventDefault()
        axios.get("http://localhost:8080/biology/history?cccd="+cccd)
            .then(res => {
                if (res.data.code === 200) {
                    toast.showToast("Create successfully","success")
                    setProfile(res.data.data)
                    console.log(profile)
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
                    <div>
                        <div className="sign-close-right" onClick={() => props.setCreate(false)}>
                            <FontAwesomeIcon icon={faTimes} className="icon"/>
                        </div>
                        <TableDontLimit
                            limit='10'
                            headData={biologyHeader}
                            renderHead={(item, index) => renderHead(item, index)}
                            bodyData={profile}
                            renderBody={(item, index) => renderBody(item, index)}
                        />
                    </div>:
                    <div className="sign-container">
                        <div className="sign-header flex">
                            <div className="sign-title">Tìm kiếm lịch sử</div>
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