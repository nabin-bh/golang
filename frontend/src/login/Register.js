import axios from "axios";
import {useEffect, useState} from "react";  
import { auth, registerWithEmailAndPassword, signInWithGoogle } from "../shared/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";

function Register() {
    // const [loading, setLoading] = useState(false)
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const [message, setMessage] = useState("");

    function handleregister(){
       let res =  registerWithEmailAndPassword(name, email, password)
       setMessage(res.message) 
        if(res.status == 'true'){

        } else {

        }
    }

    return (
        <div className="container">
            <center>{ message ? message : '' }</center>
            
            <div className="container-fluid bg-trasparent my-4 p-3" >
            <div className="login-page">
                <div className="form">
                    <h1>Register</h1>
                    <div className="register-form">
                        <input type="text" placeholder="name"  value={name} onChange={(e) => setName(e.target.value)}/>
                        <input type="email" placeholder="Email"  value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <input type="password" placeholder="password" value={password} onChange={(e) => {console.log(e.target.value); return setPassword(e.target.value)}}/>
                        <button  className="login_btn" onClick={() => handleregister()}>create</button>
                        <p className="message">Already registered?  <Link to="/login">Login</Link> </p>
                    </div>
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default  Register