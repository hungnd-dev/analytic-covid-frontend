import React from 'react'
import './topnav.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBell, faUser} from "@fortawesome/free-solid-svg-icons";
import {useHistory} from "react-router-dom";
import '../../assets/boxicons-2.0.7/css/boxicons.min.css'
import '../../App.css'
export default function TopNav(props) {
    const history = useHistory();
    const toProfile = () => {
        history.push("/admin/profile");
    }
    const toSetting = () => {
        history.push("/admin/setting");
    }
    return (
        <div className='top-nav'>
            <div className="top-nav__right">
                <div className="top-nav__right-item">
                    <div className={"dropdown"}>
                        <FontAwesomeIcon icon={faUser}/>
                        <div className={"dropdown-content"}>
                            <p className="dropdown-content-item" onClick={toProfile}>Profile</p>
                            <p className="dropdown-content-item" onClick={toSetting}>Setting</p>
                            <p className="dropdown-content-item" onClick={props.logout}>Logout</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
