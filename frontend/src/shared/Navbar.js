import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar(props) {
    const [animate, setAnimate] = useState(false)

    useEffect(() => {
        setAnimate(true)
        setTimeout(() => {
            setAnimate(false)
        }, 1000)
    }, [props.cart]) // <-- here put the parameter to listen

    return (
        <div className="nav">
            <input type="checkbox" id="nav-check" />
            <div className="nav-header">
                <div className="nav-title ">
                    <span className="logo-name">
                        <span className="logo-book gradient-text">&nbsp;Book</span> <span className="logo-pasal">&nbsp;Pasal&nbsp; </span>
                    </span>
                </div>
            </div>

            <div className="nav-btn">
                <label for="nav-check">
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
            </div>

            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/books">Book</Link>
                <a href="" target="_blank">Category</a>
                {
                    props.auth ?
                        (
                            <>
                                <Link to="/login">Login</Link>
                                <Link to="/register">Register</Link>
                            </>
                        )
                        : <Link to="/dashboard">user</Link>
                }


                <Link to="/cart" className="float-end">Cart <span className={`badge bg-gradient ${animate ? 'bounce' : ''} `}>{props.cart.length}</span></Link>
            </div>
        </div>
    )
}