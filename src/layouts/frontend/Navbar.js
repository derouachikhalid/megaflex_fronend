import "./css/navbar.css"
import React from "react";
import axios from "axios";

import logo from "../../assets/admin/assets/img/logo_new.jpg"
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Sidebar from "../admin/Sidebar";

function Register() {
  const history = useHistory();
  const logoutSubmit = (e) => {
    e.preventDefault();
    
    axios.post('/api/logout').then(res => {
      console.log(res);
      if (res.data.status === 200) {
        localStorage.removeItem("user_name");
        localStorage.removeItem("user_token");
        history.push('/login');

      }
    });

  }
  var auth_navbar = "";
  if (!localStorage.getItem("user_token")) {
    auth_navbar = (
      <ul className="navbar-nav sb-topnav">
        <li className="nav-item">
          <Link className="disconn nav-link" to="/login">Login</Link>
        </li>
        
        <li className="nav-item">
          <Link className="disconn nav-link" to="/about">A propos</Link>
        </li>
      </ul>

    );
  } 
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light card shadow-sm fixed-top" >
      <div className="container-fluid  ">
        <img className=" figure-img  " src={logo} height={50} alt="logo" />


        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse  " id="navbarNavDropdown">
          <ul class="navbar-nav m-3 ">
            <div className="d-lg-none ">
              <ul className="list list-inline">
              {auth_navbar}
              </ul>
              
            </div>
            {localStorage.getItem("user_token")? 
            <div className="d-lg-none">
            <Sidebar />
          </div>: ""}
            



          </ul>
        </div>


        <div className="collapse navbar-collapse position-absolute pe-4 end-0 mx-md-2 " id="navbarNav">

          <ul className="navbar-nav text-center fw-bold ">

            {auth_navbar}
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Register;