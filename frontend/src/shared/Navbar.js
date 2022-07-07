import {useState} from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="nav">
            <input type="checkbox" id="nav-check"/>
            <div className="nav-header">
                <div className="nav-title">
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
                <a href="" target="_blank">Login</a>
                <a href="" target="_blank">Register</a>
            </div>
        </div>
    )
}