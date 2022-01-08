import './covid.css'
import '../assets/css/grid.css'
import '../assets/css/theme.css'
import '../assets/css/index.css'
import '../assets/boxicons-2.0.7/css/boxicons.min.css'
import {BrowserRouter, Route} from "react-router-dom";
import Sidebar from "../components/SideBar/Sidebar";
import MyRoutes from "../components/Constants/MyRoutes";
export default function CovidPage(){
    const handleLogOut = ()=>{

    }
    return (
        <BrowserRouter>
            <Route render={(props) => (
                <div className={`admin theme-mode-light theme-color-blue`}>
                    <Sidebar {...props}/>
                    <div className="admin__content">
                        <div className="admin__content-main">
                            <MyRoutes/>
                        </div>
                    </div>
                </div>
            )}>
            </Route>
        </BrowserRouter>
    )
}