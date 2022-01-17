import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Home from "./Components/User/Home";
import Login from "./Components/User/Login";
import Register from "./Components/User/Register";

const App = (props) => {
  return (
    <div>
      <BrowserRouter>
        <Route path="/" exact component={Login}/>
        <Route path="/home" exact component={Home}/>
        <Route path="/register" exact component={Register}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
