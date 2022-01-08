import {useContext, useEffect, useState} from "react";
import axios from "axios";
import Table from "../../Table/Table";
import './citizens.css'
import CreateCitizens from "./CreateCitizens";
import {ToastCustomContext} from "../../../context/ToastContext";
import {useHistory} from "react-router-dom";

export default function Citizens(){
    const toast = useContext(ToastCustomContext)
    const history = useHistory()
    const [citizens, setCitizens] = useState([]);
    const [createCitizens, setCreateCitizens] = useState(false);

    const citizensHeader = [
        'CCCD',
        'Tên',
        'Năm sinh',
        'Bệnh nền',
        'Tiêm vaccin'
    ]
    const renderHead = (item, index) => <th key={index}>{item}</th>
    const renderBody = (item, index) => (
        <tr key={index}>
            <td>{item.cccd}</td>
            <td>{item.name}</td>
            <td>{item.yearOfBirth}</td>
            <td>{item.disease}</td>
            <td>{item.vaccination}</td>
        </tr>
    )
    useEffect(() => {
        axios({
            method: "get",
            url: "http://localhost:8080/citizens/all"
        }).then(res => {
            setCitizens(res.data.data)
            toast.showToast("Successfully", "success")
        })
            .catch(err => {
                toast.showToast(err.message,"error")
            })

    }, [])

    const openCreateCitizens = ()=>{
        setCreateCitizens(true);
    }

    return (
        <div>
            <h2 className="page-header">
                Hồ sơ công dân
            </h2>
            <div>
                <button className="button-default" onClick={openCreateCitizens}>
                    Tạo mới
                </button>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            {
                                createCitizens ?
                                <CreateCitizens create = {createCitizens} setCreate ={setCreateCitizens}/>:
                                <Table
                                    limit='10'
                                    headData={citizensHeader}
                                    renderHead={(item, index) => renderHead(item, index)}
                                    bodyData={citizens}
                                    renderBody={(item, index) => renderBody(item, index)}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}