import "../css/machines.css"
import { faFaceGrin, faFaceTired } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import swal from "sweetalert";



function ViewMachines(props) {
    console.log(props)
    const [loading, setLoading] = useState(true);
    const [machines, setMachines] = useState({});
    const [input, setinput] = useState("");
    const [Choice, setChoice] = useState("ref");
    useEffect(() => {
        axios.get(`/api/viewmachines`).then(res => {
            console.log(res)
            if (res.data.status === 200) {
                setMachines(res.data.machines);

            }
            setLoading(false);
        });

    }, []);
    const searchChange = (e)=>{
        setinput(e.target.value);
        
    }
    const handleStatus = (e,id) => {
        e.preventDefault()
        
        
        axios.post(`/api/changeStatus/${id}`).then(res=>{
            if (res.data.status===200) {
                
                axios.get(`/api/viewmachines`).then(res => {
                    console.log(res)
                    if (res.data.status === 200) {
                        setMachines(res.data.machines);
        
                    }
                });
                
            } else {
                
            }
        })
        


    }


    const deleting = (e,id) => {
        e.preventDefault()
        const thisClicked = e.currentTarget;
        

        axios.delete(`/api/deletemachine/${id}`).then(res=>{
            console.log(res)
            
               if(res.data.status===200){
                swal("success",res.data.message,"success");
                thisClicked.closest('div.container-fluid').remove();

                }else if(res.data.status ===404){
                swal("success",res.data.message,"success");
                

                }else{
                    swal("success",res.data,"success");
                    console.log("vous ne pouver pas le supprimer")
    
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
        
        console.log(machines)
        html = machines.filter((index)=>{
            if(input===""){
                return index;
            }else{
                switch (Choice) {
                    case "ref":
                        if(index.ref_machine.toLowerCase().includes(input.toLowerCase())){
                            return index;
                        }
                        
                        break;
                    case "name":
                        if(index.name_machine.toLowerCase().includes(input.toLowerCase())){
                            return index;
                        }
                        
                        break;
                    case "discipline":
                        if(index.discipline_machine.toLowerCase().includes(input.toLowerCase())){
                            return index;
                        }
                        
                        break;   
                
                    default:
                        break;
                }
            }
        }).map((index) => {
            return (
                <div className="container-fluid w-100" key={index.ref_machine}  >
                    <div className="card shadow float-right" style={{border : "1px solid #1e9d9e",borderRadius : "4px"}}>
                        <div className="row rounded-5 m-3" >
                            <div className="col-sm-3">
                                <img className="d-block w-100 h-100 " src={`http://localhost:8000/${index.image_machine}`} alt="" />

                            </div>
                            <div className="col-sm-7">
                                <div className="card-block">
                                {props.match.url==="/admin/viewmachines"?
                                <Link style={{textDecoration :"none" , color : "#eb5e1a" ,opacity : 0.95, fontSize :"18px",fontWeight : "bold"}} to={`/admin/viewmachine/${index.ref_machine}`}>
                                <h4 className="card-title">{index.name_machine.toUpperCase()} {"  :  ["+index.ref_machine.toUpperCase()+"]"}</h4>
                                </Link>
                                :
                                <Link style={{textDecoration :"none" , color : "#eb5e1a" ,opacity : 0.95, fontSize :"18px",fontWeight : "bold"}} to={`/user/viewmachine/${index.ref_machine}`}>
                                    <h4 className="card-title" >{index.name_machine} {"  :  ("+index.ref_machine+")"} </h4>
                                    </Link>}
                                    
                                    
                                    <p>{index.discipline_machine}</p>
                                    <p>{index.accessoires_machine}</p>
                                </div>
                            </div>
                            
                            <div className="col-sm-2">

                            {props.match.url==="/admin/viewmachines"?
                                <div class="dropdown">
                                <button class="btn btn-operation dropdown-toggle w-100" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    operations
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <Link class="dropdown-item" to={`/admin/editmachines/${index.ref_machine}`} >Editer</Link>
                                    <Link class="dropdown-item" onClick={(e)=>deleting(e,index.ref_machine)} to="#">Supprimer</Link>
                                    
                                </div>
                            </div>
                            
                                :""}
                                
                                {index.status? <FontAwesomeIcon icon={faFaceGrin} onClick={(e)=>handleStatus(e,index.ref_machine)} color="green " className="fs-1 p-3 text-right " /> : <FontAwesomeIcon icon={faFaceTired} onClick={(e)=>handleStatus(e,index.ref_machine)} className="fs-1 p-3" color="red"/>}

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

            <div className="container py-5 ">
                <div className="row justify-content-center">
                    <div className="col-md ">
                        <div className="card shadow" style={{ height: "100%" }}>

                            <ul className="nav-list nav pt-1 nav-tabs w-100 position-relative">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="#">Les machines</Link>
                                </li>
                                {props.match.url==="/admin/viewmachines"?
                                <li class="nav-item">
                                    <Link className="nav-inactive nav-link style-none" aria-current="page" to="/admin/addmachines">Ajouter une machine</Link>
                                </li>
                                :""}

                                
                                
                            <li className="nav-item position-absolute end-0 me-2" >
                                <ul className="list-inline">
                                    <li className="list-inline-item">
                                      <select id="form1" className="form-control select-fil " onChange={(e)=>{ setChoice(e.target.value) }}  >
                                          <option value="default" >Choisir un filtre  </option>
                                          <option value="ref" >ref</option>
                                          <option value="name" >nom</option>
                                          <option value="discipline" >discipline</option>
                                      </select>
                                    </li >
                                    <li className="list-inline-item">
                                      <input type="search" id="form1" className="form-control " onChange={searchChange} placeholder="Rechercher ..." />
                                    </li>
                                </ul>
                            
                                    
                                    
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

export default ViewMachines;