import React , {useState,useEffect} from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () =>{
    const [redirect,setRedirect]=useState(false);
    const [loggedIn,setIsLoggedIn]=useState(false)
    const [enteredEmail,setEnteredEmail] = useState('');
    const [enteredPassword,setEnteredPassword] = useState('');
    const [fetchedData, setFetchedData] = useState([]);
    
    const emailChangeHandler = (event) =>{
        setEnteredEmail(event.target.value);
    }
    const passwordChangeHandler = (event) =>{
        setEnteredPassword(event.target.value);
    }

    const emailInvalid = enteredEmail === "" || !enteredEmail.includes('@') || enteredEmail.length < 5;
    const passwordInvalid = enteredPassword.length < 6 ;
    const formInvalid = emailInvalid || passwordInvalid;
    const errorStyle = {color:"grey", fontSize:"15px"};

    useEffect(() => {
        fetch('http://localhost:53535/api/users')
            .then((response) => response.json())
            .then((data) => {
                setFetchedData(data);
            },(error)=>{
                alert("Failed!");
            });
    }, []);

    const Login = (event) =>{
        event.preventDefault();
        if( formInvalid){
            console.log("Invalid!")
            return;
        }else{
            const filterUser=fetchedData.filter(user =>{
                if(user.Email === enteredEmail && user.Password === enteredPassword){
                    setIsLoggedIn(true);
                    setRedirect(true);
                    localStorage.setItem("name" , user.Name)
                    return true;
                }
                return false;
            })
            if(filterUser.length===0){
                alert("Incorrect email or password!")
            }
        }       
    }
    return(
        <React.Fragment>
            {redirect && loggedIn ? <Redirect to="/home"/> : 
            <main className="form-signin">
                <form onSubmit={Login} className="form">
                    <h1 className="toptext">Login</h1>
                    <div className="form-floating">
                        <input
                            type="email" 
                            name="email"
                            value={enteredEmail}
                            class="form-control" 
                            placeholder="name@example.com"
                            onChange={emailChangeHandler}
                            />
                        {emailInvalid && <p style={errorStyle}>Please enter a valid email.</p>}
                        <label for="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input 
                            type="password" 
                            name="password"
                            value={enteredPassword}
                            class="form-control" 
                            placeholder="Password"
                            onChange={passwordChangeHandler}
                            />
                        {passwordInvalid && <p style={errorStyle}>Please enter a valid password.</p>}
                        <label >Password</label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit" >Login</button>
                    <Link to="/register">
                    <button className="w-100 btn btn-lg btn-primary" type="button">Register</button>
                    </Link>
                </form>
            </main>}
        </React.Fragment>
    );
};

export default Login;