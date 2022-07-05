import {useState} from "react";

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
                <a href="" target="_blank">Book</a>
                <a href="" target="_blank">Category</a>
                <a href="" target="_blank">LinkedIn</a>
                <a href="" target="_blank">Login</a>
                <a href="" target="_blank">Register</a>
            </div>
        </div>
    )
}