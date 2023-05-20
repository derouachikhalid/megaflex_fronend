import React from "react";


import logo from "../../assets/admin/assets/img/logo_new.jpg"

import { Link } from "react-router-dom";
import Sidebar2 from "./Sidebar2";



function Register() {
  
  
  var auth_navbar = "";
  if (!localStorage.getItem("user_token")) {
    auth_navbar = (
      <ul className="navbar-nav sb-topnav">
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
        
        <li className="nav-item">
          <Link className="nav-link" to="/about">A propos</Link>
        </li>
      </ul>

    );
  } 
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light card shadow-sm fixed-top" >
      <div className="container-fluid  ">
        <img className=" figure-img  " src={logo} height={50} alt="logo" />


        <button class="navbar-toggler me-2" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
          
        </button>
        
        <div class="collapse navbar-collapse  " id="navbarNavDropdown">
          <ul class="navbar-nav m-3 ">
            
            {localStorage.getItem("user_token")? 
            <div className="d-lg-none">
            <Sidebar2 />
          </div> : ""}
            



          </ul>
        </div>


        <div className="collapse navbar-collapse position-absolute end-0 mx-md-2 " id="navbarNav">

          <ul className="navbar-nav text-center fw-bold ">

            {auth_navbar}
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Register;