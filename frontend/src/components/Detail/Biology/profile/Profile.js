import './Profile.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

export default function Profile(props) {
    const profile = props.profile
    let background = ''
    if(profile.level === 2){
        background = 'yellow'
    }else if(profile.level === 3){
        background = 'orange'
    }else if(profile.level >= 4){
        background = 'red'
    }else if(profile.level === 1){
        background = 'green'
    }
    return (
        <div className="profile" style={{background: background}}>
            <div className="sign-close-right" onClick={() => window.location.reload()}>
                <FontAwesomeIcon icon={faTimes} className="icon"/>
            </div>
            <p className={"profile-header"}>Mức độ: {profile.level}</p>
            <p className="profile-item">Tên: {profile.patientsName}</p>
            <p className="profile-item"> Huyết áp: {profile.bloodPressure} </p>
            <p className="profile-item"> Nhiệt độ: {profile.temperature} </p>
            <p className="profile-item"> Nhịp thở: {profile.breathing} </p>
            <p className="profile-item"> Nhịp tim: {profile.heartBeat} </p>
            <p className="profile-item"> Chỉ số SPO2: {profile.spo2} </p>
        </div>
    )
}