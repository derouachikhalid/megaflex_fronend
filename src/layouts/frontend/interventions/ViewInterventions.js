import "../css/interventions.css"
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import swal from "sweetalert";



function ViewIntervention(props) {
    console.log(props)
    const [intervention, setintervention] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        axios.get(`/api/viewinterventions`).then(res => {
            console.log(res)
            if (res.data.status === 200) {
                setintervention(res.data.interventions);

            }
            setLoading(false);
        });

    }, []);

    const deleting = (e,id) => {
        e.preventDefault()
        const thisClicked = e.currentTarget;
        

        axios.delete(`/api/deleteintervention/${id}`).then(res=>{
            console.log(res)
            
            if(res.status === 500){
                swal("success",res.data,"success");
                console.log("vous ne pouver pas le supprimer")

            }
            else{
                if(res.data.status===200){
                swal("success",res.data.message,"success");
                thisClicked.closest('div.container-fluid').remove();

                }else if(res.data.status ===404){
                swal("success",res.data.message,"Ouuup's");
                

                }else if(res.data.status ===403){
                    swal("success",res.data.message,"Ouuup's");
                    
    
                    }
                
            }
            

        });
    }


    var html = "";
    if (loading) {
        html = <div className="position-absolute top-50 start-50 translate-middle">
            <div className="spinner-border text-success " role="status">
                <span class="sr-only"></span>
            </div>
        </div>
    } else {
        

        html = intervention.map((index) => {
            return (
                <div className="container-fluid w-100" key={index.CODE_INTER}>
                    
                    <div className="card shadow float-right">
                        <div className="row rounded-5 m-3" >
                            <div className="col-sm-2">
                                <div className="bg-orange w-100 text-center " >
                                    <h5 className="date-inter ">{index.date}</h5>
                                    
                                    
                                    <div className="duree-inter" >
                          
                          {index.duree}
                       
                          </div>
                          <div className="hr-inter" >
                          
                          Heures
                       
                          </div>
                                    
                                    
                                   
                                    

                                </div>

                            </div>
                            
                            <div className="ml-block col-sm-8">
                            
                            <div className=" card-block">
                            <Link style={{textDecoration :"none" , color : "black" ,opacity : 0.8}} to={`/admin/viewinterention/${index.CODE_INTER}`}>
                                    <h4  className="code-inter card-title">{index.CODE_INTER}</h4>
                                    </Link>
                                    <p className="name-m">{index.machine.name_machine.toUpperCase()}</p>
                                    <p className="raison">{index.raison}</p>
                                </div>
                                
                                
                            </div>
                            <div className="col-sm-2">

                                <div class="dropdown">
                                    <button class="btn btn-operation dropdown-toggle w-100" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        operations
                                    </button>
                                    <div class="dropdown-menu " aria-labelledby="dropdownMenuButton">
                                        
                                    {props.match.url==="/admin/viewinterentions"?
                                      <Link class="dropdown-item" to={`/admin/editinterention/${index.CODE_INTER}`} >Editer</Link>
                                                         :
                                      <Link class="dropdown-item" to={`/user/editinterention/${index.CODE_INTER}`} >Editer</Link>
                                    }

                                        
                                        <Link class="dropdown-item" onClick={(e)=>deleting(e,index.CODE_INTER)}>Supprimer</Link>
                                    </div>
                                </div>

                                {/*<button className="btn btn-danger w-100 m-2"><FontAwesomeIcon icon={faTrash} /> Delete</button>
                                
                                <br/>
                                <button className="btn btn-warning w-100 m-2"><FontAwesomeIcon icon={faPenToSquare} /> Edit</button>
            */}

                            </div>

                        </div>
                    </div>

                    <br />
                </div>
            );
        });


    }
    



    return (
        <div>

            <div className="container-fluid py-5 ">
                <div className="row justify-content-center">
                    <div className="col-md ">
                        <div className="card shadow" style={{ height: "100%" }}>

                            <ul className="nav nav-tabs">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="#">Les interventions</Link>
                                </li>

                                <li class="nav-item">
                                    {props.match.url==="/admin/viewinterentions"?
                                      <Link className="nav-inactive nav-link " aria-current="page" to="/admin/addinterentions">Ajouter une intervention</Link>
                                                         :
                                      <Link className="nav-inactive nav-link " aria-current="page" to="/user/addinterentions">Ajouter une intervention</Link>
                                    }
                                    </li>


                            </ul>

                            <div className="card-body">
                            {html}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
}

export default ViewIntervention;