import axios from "axios";
import {useEffect, useState} from "react";  
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../shared/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";

function Login() {
    // const [loading, setLoading] = useState(false)
    const [loginAuth, setLoginAuth] = useState({
        'email' : '',
        'password' : ''
    })
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);

    const handleChange = e => {
        setLoginAuth({
          ...loginAuth,
          [e.target.name]: e.target.value,
        }) 
      }

    return (
        <div className="container">
            {/* <center>{ loading ? "loading...." : '' }</center> */}
            
            <div className="container-fluid bg-trasparent my-4 p-3" >
                <div className="login-page">
                    <div className="form">
                        <h1>Login</h1> 
                        <div className="login-form">
                            <input type="enail" placeholder="Email"  value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <input type="password" placeholder="password" value={password} onChange={(e) => {console.log(e.target.value); return setPassword(e.target.value)}}/>

                            <button type="button" className="login_btn" onClick={() => logInWithEmailAndPassword(email, password)}>login</button>
                            
                            <br/>
                            <br/>

                            <button type="button" onClick={signInWithGoogle} className="login-with-google-btn" > Sign in with Google</button>
                            <p className="message">Not registered?  <Link to="/register">Register</Link>  </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default  Login