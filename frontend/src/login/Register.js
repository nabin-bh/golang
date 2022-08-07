import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
    // const [loading, setLoading] = useState(false)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

    function handleregister() {
        let register_data = {
            "name": name,
            "username": name,
            "email": email,
            "password": password
        }

        axios.post('http://localhost:8080/api/user/register', register_data).then((res) => {
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
                        <h1>Register</h1>
                        <div className="register-form">
                            <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
                            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" placeholder="password" value={password} onChange={(e) => { console.log(e.target.value); return setPassword(e.target.value) }} />
                            <button className="login_btn" onClick={() => handleregister()}>create</button>
                            <p className="message">Already registered?  <Link to="/login">Login</Link> </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register