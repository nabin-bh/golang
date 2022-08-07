import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import { Link } from "react-router-dom";

function Login() {
    // const [loading, setLoading] = useState(false)
    const [loginAuth, setLoginAuth] = useState({
        'email': '',
        'password': ''
    })
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [cookie, setCookie] = useCookies(['login']);

    const handleChange = e => {
        setLoginAuth({
            ...loginAuth,
            [e.target.name]: e.target.value,
        })
    }

    function handleLogin() {
        let login_data = {
            "email": email,
            "password": password
        }

        axios.post('http://localhost:8080/api/token', login_data).then((res) => {

            console.log(res)
            setCookie('Auth', res.data, { path: '/' });

            setMessage("login success !")

            setTimeout(() => {
                setMessage("")
            }, 2000)


        }).catch(error => {
            if (error.response.data.error) {
                setMessage(error.response.data.error)

                setTimeout(() => {
                    setMessage("")
                }, 2000)
            }

            console.error(error.response.data.error)
        })
    }

    return (
        <div className="container">
            <center>{message ? <div className="alert alert-warning">{message}</div> : ''}</center>

            <div className="container-fluid bg-trasparent my-4 p-3" >
                <div className="login-page">
                    <div className="form">
                        <h1>Login</h1>
                        <div className="login-form">
                            <input type="enail" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" placeholder="password" value={password} onChange={(e) => { return setPassword(e.target.value) }} />

                            <button type="button" className="login_btn" onClick={handleLogin}>login</button>

                            <br />
                            <br />

                            <button type="button" className="login-with-google-btn" > Sign in with Google</button>
                            <p className="message">Not registered?  <Link to="/register">Register</Link>  </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login