
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import swal from "sweetalert";



function ViewFournisseurs() {
    const [loading, setLoading] = useState(true);
    const [fournisseurs, setFournisseurs] = useState({});
    const [input, setinput] = useState("");
    useEffect(() => {
        axios.get(`/api/viewfournissors`).then(res => {
            console.log(res)
            if (res.data.status === 200) {
                setFournisseurs(res.data.fournisseurs);

            }
            setLoading(false);
        });

    }, []);
    const searchChange = (e)=>{
        setinput(e.target.value);
        
    }


    const deleting = (e,id) => {
        e.preventDefault()
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting"

        axios.delete(`/api/deleteFour/${id}`).then(res=>{
            if(res.data.status===200){
                swal("success",res.data.message,"success");
                thisClicked.closest('div.row').remove();

            }else if(res.data.status ===404){
                swal("success",res.data.message,"success");
                thisClicked.innerText = "Delete"

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
        console.log(window.windowDimensions)

        html = fournisseurs.filter((index)=>{
            if(input===""){
                return index;
            }else if(index.name_founissor.toLowerCase().includes(input.toLowerCase())){
                return index;
            }
        }).map((index) => {
            return (
                <div className="container-fluid w-100" key={index.id}>
                    <div className="card shadow float-right">
                        <div className="row rounded-5 m-3" >
                            <div className="col-sm-3">
                                <img className="d-block w-100 h-100 " src={`http://localhost:8000/${index.logo_founissor}`} alt="" />

                            </div>
                            <div className="col-sm-7">
                                <div className="card-block">
                                    <h4 className="card-title" style={{textDecoration :"none" , color : "#eb5e1a" ,opacity : 0.95, fontSize :"18px",fontWeight : "bold"}}>{index.name_founissor}</h4>
                                    <p>{index.email_founissor}</p>
                                    <p>{index.description_founissor}</p>
                                </div>
                            </div>
                            <div className="col-sm-2">

                                <div class="dropdown">
                                    <button class="btn btn-operation dropdown-toggle w-100" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        operations
                                    </button>
                                    <div class="dropdown-menu " aria-labelledby="dropdownMenuButton">
                                        <Link class="dropdown-item" to={`/admin/editfournisseurs/${index.id}`} >Editer</Link>
                                        <Link class="dropdown-item" onClick={(e)=>deleting(e,index.id)} to="#">Supprimer</Link>
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
                        <div className="card shadow list-inline " style={{ height: "100%" }}>

                            <ul className="nav w-100 pt-1  nav-tabs position-relative">
                                <li className="nav-item ">
                                    <Link className="nav-link active" aria-current="page" to="#">Les fournisseurs</Link>
                                </li>

                                <li class="nav-item ">
                                    <Link className="nav-inactive nav-link " aria-current="page" to="/admin/addfournisseurs">Ajouter un fournisseur</Link>
                                </li>
                                <li class="nav-item  position-absolute end-0 me-2 ">
                                <div class="input-group">
                                <div class="form-outline">
                                    <input type="search" id="form1" className="form-control " onChange={searchChange} placeholder="Search..." />
                                    
                                </div>
                            </div>
                               
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

export default ViewFournisseurs;