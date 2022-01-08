import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import CovidPage from "./pages/CovidPage";

function App() {
  return (
    <div>
        <BrowserRouter>
            <Switch>
                <Route path='/covid' component={CovidPage}/>
                <Route path='/' component={CovidPage}/>
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
