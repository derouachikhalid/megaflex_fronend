
import {  faEye, faHardDrive, faRightFromBracket, faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import "../css/sidbar.css"
import avatarM from "../../assets/admin/assets/img/avatar.png"
import avatarF from "../../assets/admin/assets/img/avatarF.png"
import logo from "../../assets/admin/assets/img/logo_new.jpg"

import axios from "axios";
import { useHistory } from "react-router-dom";



const Sidebar2 = (props) => {
    console.log(props)
    const [user, setuser] = useState({});
    const [authentifcated, setauthentifcated] = useState(false);
    useEffect(() => {
        axios.get(`/api/getuserauth`).then(res=>{
            if(res.data.status===200){
                setuser(res.data.user);
            }

        })
        axios.get(`/api/checkingAuth`).then(
            res=>{
                if(res.status === 200){
                    setauthentifcated(true)
                    console.log(res)
                }
                
                
            }
        )
    }, []);
    
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
    console.log(user)

    return (
        <nav className="sb-sidenav accordion sb-sidenav-white card " style={{paddingTop : "7px"}} id="sidenavAccordion">
            
            <img className="d-none d-lg-block figure-img" src={logo} height={50} alt="logo"/>
            
  
                    <div className=" sb-sidenav-menu list-group">
                            <div className="d-none d-lg-block card mb-2 p-2">
                                <div className="row">
                                    <div className="col">
                                        
                                    </div>
                                    <div className="col d-flex justify-content-center">
                                    <img className="  rounded-circle" src={user.genre ==="masculin"? avatarM : avatarF}  width={70} alt="profile"/>  
                                    </div>
                                    <div className="col">
                                        
                                    </div>
                                </div>
                                <h5 className="text-center text-name">
                                {user.name ?user.name.toUpperCase() :""}
                                </h5>
                                <div className="d-none d-lg-block  text-center text-fonction">
                                {user.fonction}
                                </div>
                                

                                <button type="button" onClick={logoutSubmit} className="btn btn-logout-large w-100"  ><FontAwesomeIcon  icon={faRightFromBracket} /> Logout</button>
                                
                               
                            </div>
                            <div className="d-lg-none card mb-2 p-2">
                                <div className="row">
                                    <div className="col-3">
                                    <img className=" ms-4 rounded-circle" src={user.genre ==="masculin"? avatarM : avatarF}  width={70} alt="profile"/>
                                    </div>
                                    <div className="col-6 d-flex justify-content-center align-items-center ">
                                       <div>
                                           <h5 className="text-name">
                                           {user.name ?user.name.toUpperCase() :""}
                                           </h5>
                                           <span className="text-fonction">{user.fonction}</span>
                                       </div>
                                    

                                    </div>
                                    <div className="col-3 d-flex justify-content-center align-items-center  ">
                                    <button className="btn text-danger" onClick={logoutSubmit} style={{backgroundColor :"white" ,fontSize :"25px"}}>
                                           <FontAwesomeIcon   icon={faRightFromBracket} /></button>
                                        
                                    </div>
                                    
                                </div>
                                
                                
                               
                            </div>
                    
                        
                            
                            
                            <Link className="side-link-p nav-link list-group-item list-group-item-action"   to="/user/viewmachines">
                                <div className="sb-nav-link-icon"><FontAwesomeIcon className="px-2" icon={faHardDrive}/> Machines</div>
                                
                            </Link>
                           
                            <Link className="side-link-p nav-link list-group-item list-group-item-action" to="/user/viewinterventions">
                                <div className="sb-nav-link-icon"><FontAwesomeIcon className="px-2" icon={faScrewdriverWrench}/>Interventions</div>
                                
                            </Link>
                            { authentifcated ?
                            <Link className="side-link-p nav-link list-group-item list-group-item-action" to="/admin">
                            <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faEye} /> Vue d'administrateur</div>
                            
                        </Link>
                            
                            :""

                            }
                            
                            
                            
                        
                    </div>
                    
                </nav>
    );
}
export default Sidebar2;