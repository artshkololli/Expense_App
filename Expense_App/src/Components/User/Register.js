import React, {useState,useEffect} from "react"
import { Redirect } from "react-router";
import "./Register.css";

const Register = () =>{
    const [redirect,setRedirect]=useState(false);
    const [enteredName,setEnteredName] = useState('');
    const [enteredEmail,setEnteredEmail] = useState('');
    const [enteredPassword,setEnteredPassword] = useState('');
    const [userExists, setUserExists] = useState(false)
    const [fetchedData, setFetchedData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:53535/api/users')
            .then((response) => response.json())
            .then((data) => {
                setFetchedData(data);
            },(error)=>{
                alert("Failed!");
            });
    }, []);

    const nameChangeHandler = (event) =>{
        setEnteredName(event.target.value);
    }

    const emailChangeHandler = (event) =>{
        setEnteredEmail(event.target.value);
    }
    const passwordChangeHandler = (event) =>{
        setEnteredPassword(event.target.value);
    }

    const submitHandler = (event) =>{
        event.preventDefault();
        const userExisting=fetchedData.filter(user =>{
            if(user.Email===enteredEmail){
                console.log("User exists!");
                setUserExists(true);
                return true;
            }else{
                setUserExists(false);
                return false;
            }
        });
        if(nameInvalid || emailInvalid || passwordInvalid ){
            return;
        }else{
            if(!userExisting.length > 0){
                fetch('http://localhost:53535/api/users',{
                    method:'POST',
                    headers:{
                        'Accept':'application/json',
                        'Content-type':'application/json'
                    },
                    body: JSON.stringify({
                        Name:enteredName,
                        Email:enteredEmail,
                        Password:enteredPassword
                    })
                }).then(res=>res.json())
                .then((result)=>{
                    setRedirect(true);
                    console.log("Registered!")
                },
                (error)=>{
                    alert('Failed');
                });
            }
        }
       
    }
    const nameInvalid = enteredName === "" && enteredName.length <3;
    const emailInvalid = enteredEmail === "" || !enteredEmail.includes('@') || enteredEmail.length < 5;
    const passwordInvalid = enteredPassword.length < 6 ;
    const errorStyle = {color:"grey", fontSize:"15px"};

    return(
        <React.Fragment>
            {redirect ? <Redirect to="/"/> : 
            <main className="form-signin">
                <form onSubmit={submitHandler} className="form">
                    <h1 className="toptext">Register</h1>
                    <div className="form-floating">
                        <input 
                            type="text"
                            name="Name" 
                            value={enteredName}
                            class="form-control" 
                            placeholder="Name"
                            onChange={nameChangeHandler}
                        />
                        {nameInvalid && <p style={errorStyle}>Please enter a valid name.</p>}
                        <label for="floatingInput">Name</label>
                    </div>
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
                        {userExists && <p style={errorStyle}>User already exists!</p>}
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
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Register</button>
                </form>
            </main>}
        </React.Fragment>
    );
};

export default Register;