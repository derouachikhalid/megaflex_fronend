
import { faArrowRightArrowLeft, faEyeLowVision, faHardDrive, faObjectGroup, faPeopleLine, faRightFromBracket, faScrewdriverWrench, faStore, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React,{useState,useEffect} from "react";
import "../css/sidbar.css"
import { Link } from "react-router-dom";
import logo from "../../assets/admin/assets/img/logo_new.jpg"
import avatarM from "../../assets/admin/assets/img/avatar.png"
import avatarF from "../../assets/admin/assets/img/avatarF.png"
import axios from "axios";
import { useHistory } from "react-router-dom";



const Sidebar = () => {
    const [user, setuser] = useState({});
    useEffect(() => {
        axios.get(`/api/getuserauth`).then(res=>{
            if(res.data.status===200){
                setuser(res.data.user);
            }

        })
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
    var html ="";
    if(user.role === 1){
        html = <div >
            <div className="d-none d-lg-block  text-center text-fonction">
            administrateur
            </div>
            <div className="d-lg-none">
            administrateur
            </div>   
        </div>
    }else{
        html = <div className="text-center">
            {user.fonction}
        </div>
    }

    return (
        <nav className="sb-sidenav accordion sb-sidenav-white card " style={{paddingTop : "7px"}} id="sidenavAccordion">
            
            <img className="d-none d-lg-block figure-img" src={logo} height={50} alt="logo"/>
            
  
                    <div className=" sb-sidenav-menu list-group" >
                            <div className="d-none d-lg-block card  p-2" style={{border : "1px solid #1e9d9e",borderRadius : "4px"}}>
                                <div className="row">
                                    <div className="col">
                                        
                                    </div>
                                    <div className="col d-flex justify-content-center ">
                                    <img className=" rounded-circle" src={user.genre ==="masculin"? avatarM : avatarF}  width={70} alt="profile"/>
                                        
                                    </div>
                                    <div className="col">
                                        
                                    </div>
                                </div>
                                <h5 className="text-center text-name">
                                {user.name ?user.name.toUpperCase() :""}
                                </h5>
                                {html}
                                
                                <Link to="/admin/register"><button type="button"  className="btn btn-add-large  w-100 mb-1"  ><FontAwesomeIcon   icon={faUserPlus} /> Ajouter</button></Link>

                                <button type="button" onClick={logoutSubmit} className="btn btn-logout-large  w-100"  ><FontAwesomeIcon  icon={faRightFromBracket} /> Logout</button>

                                
                            </div>
                            <div className="d-lg-none card mb-2 p-2" >
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
                                    <div className="col-2 d-flex justify-content-center align-items-center  ">
                                        
                                        <button className="btn text-success"  style={{backgroundColor :"white" ,fontSize :"25px"}}>
                                        <Link to="/admin/register"><FontAwesomeIcon   icon={faUserPlus} /></Link></button>
                                           <button className="btn text-danger" onClick={logoutSubmit} style={{backgroundColor :"white" ,fontSize :"25px"}}>
                                           <FontAwesomeIcon   icon={faRightFromBracket} /></button>
                                        
                                        
                                    </div>
                                    
                                    
                                </div>
                                
                                
                                
                               
                            </div>
                    
                        
                            
                            <Link className="side-link-p nav-link list-group-item list-group-item-action list-group-horizontal "  to="/admin/dashboard">
                                <div className="sb-nav-link-icon"  ><FontAwesomeIcon className="px-2" icon={faObjectGroup}/>Tableau de bord</div>
                                
                            </Link>
                            <Link className="side-link-p nav-link list-group-item list-group-item-action"   to="/admin/viewmachines">
                                <div className=" sb-nav-link-icon" ><FontAwesomeIcon className="px-2" icon={faHardDrive}/> Machines</div>
                                
                            </Link>
                            <Link className=" side-link-p nav-link list-group-item list-group-item-action"  to="/admin/viewclients">
                                <div className="sb-nav-link-icon" ><FontAwesomeIcon className="px-2" icon={faPeopleLine}/>Clients</div>
                                
                            </Link>
                            <Link className="side-link-p nav-link list-group-item list-group-item-action"  to="/admin/viewfournisseurs">
                                <div className="sb-nav-link-icon" ><FontAwesomeIcon className="px-2" icon={faStore}/>Fournisseurs</div>
                                
                            </Link>
                            <Link className="side-link-p nav-link list-group-item list-group-item-action"  to="/admin/viewinterentions">
                                <div className="sb-nav-link-icon" ><FontAwesomeIcon className="px-2" icon={faScrewdriverWrench}/>Interventions</div>
                                
                            </Link>
                            <Link className="side-link-p nav-link list-group-item list-group-item-action"   to="/admin/viewpieces">
                                <div className="sb-nav-link-icon" ><FontAwesomeIcon className="px-2" icon={faArrowRightArrowLeft}/>Pieces de rechange</div>
                                
                            </Link>
                            <Link className="side-link-p nav-link list-group-item list-group-item-action"  to="/user">
                                <div className="sb-nav-link-icon" ><FontAwesomeIcon className="px-2" icon={faEyeLowVision}/>Vue d'utilisateur</div>
                                
                            </Link>
                            
                        
                    </div>
                    
                </nav>
    );
}
export default Sidebar;