import React from 'react'
import './navbar.css'
import logo from '../images/logo.png'
function Navbar() {
    return (
        <div  className="navContainer">
           <div>
           <img className="logoimg" src={logo} alt="logo"/>
           </div>
            <div className="icons">
            <i class="fa fa-bell" ></i>
            <i class='fas fa-user-alt' ></i>
            
            </div>
        </div>
    )
}

export default Navbar
