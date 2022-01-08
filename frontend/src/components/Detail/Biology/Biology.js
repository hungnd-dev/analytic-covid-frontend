import {useContext, useEffect, useState} from "react";
import {ToastCustomContext} from "../../../context/ToastContext";
import axios from "axios";
import CreateCitizens from "../Citizens/CreateCitizens";
import Table from "../../Table/Table";
import './biology.css'
import CreateBiology from "./CreateBiology";
import SearchBiology from "./SearchBiology";
import History from "./History";
export default function Biology(){
    const toast = useContext(ToastCustomContext)
    const [biology, setBiology] = useState([]);
    const [create, setCreate] = useState(false);
    const [search, setSearch] = useState(false);
    const [history, setHistory] = useState(false);
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
            color = 'black'
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
    useEffect(() => {
        axios({
            method: "get",
            url: "http://localhost:8080/biology/all"
        }).then(res => {
            setBiology(res.data.data)
            toast.showToast("Successfully", "success")
        })
            .catch(err => {
                toast.showToast(err.message,"error")
            })

    }, [])

    const openCreate = ()=>{
        setCreate(true);
        setSearch(false)
        setHistory(false)
    }

    const openSearch = () =>{
        setSearch(true)
        setCreate(false)
        setHistory(false)
    }

    const openHistory = () =>{
        setHistory(true)
        setSearch(false)
        setCreate(false)
    }
    return (
        <div>
            <h2 className="page-header">
                Chỉ số sinh học
            </h2>
            <div>
                <button className="button-default" onClick={openCreate}>
                    Tạo mới
                </button>
            </div>
            <div>
                <button className="button-default" onClick={openSearch}>
                    Tìm kiếm
                </button>
            </div>
            <div>
                <button className="button-default" onClick={openHistory}>
                    Lịch sử
                </button>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            {
                                create ?
                                    <CreateBiology create = {create} setCreate ={setCreate}/>:
                                    <div></div>
                            }
                            {
                                search ?
                                    <SearchBiology create = {search} setCreate ={setSearch}/>:<div></div>
                            }
                            {
                                history ?
                                    <History create = {history} setCreate ={setHistory}/>:<div></div>
                            }
                            {
                                search === false && create === false && history === false?
                                    <Table
                                        limit='10'
                                        headData={biologyHeader}
                                        renderHead={(item, index) => renderHead(item, index)}
                                        bodyData={biology}
                                        renderBody={(item, index) => renderBody(item, index)}
                                    />:<div></div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}