import {Route, Switch} from "react-router-dom";
import Citizens from "../Detail/Citizens/Citizens";
import Biology from "../Detail/Biology/Biology";
import Result from "../Detail/Result/Result";

export default function MyRoutes() {
    return (
        <Switch>
            <Route path='/citizens' exact component={Citizens}/>
            <Route path='/biology' exact component={Biology}/>
            <Route path='/result' exact component={Result}/>
        </Switch>
    )
}