import {useState} from "react";
import { Link } from "react-router-dom";

export default function Navbar(props) {
    return (
        <div className="nav">
            <input type="checkbox" id="nav-check"/>
            <div className="nav-header">
                <div className="nav-title gradient-text">
                Book Pasal
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
                <Link to="/login">Login</Link> 
                <Link to="/register">Register</Link>  

                <Link to="/cart" className="float-end">Cart <span className="badge bg-primary">{props.cart.length}</span></Link>  
            </div>
        </div>
    )
}