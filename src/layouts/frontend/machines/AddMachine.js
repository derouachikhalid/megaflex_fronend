import "../css/machines.css"
import axios from "axios";
import React,{useEffect, useState} from "react";
import {Link} from "react-router-dom"
import { useHistory } from "react-router-dom";
import swal from "sweetalert";





function AddMachine(){
    const [picture, setPicture] = useState([]);
    const [clients, setClients] = useState([]);
    const [fournisseurs, setFournisseurs] = useState([]);
    useEffect(() => {
        axios.get(`/api/viewfournissors`).then(res =>{
            if(res.data.status === 200){
                setFournisseurs(res.data.fournisseurs);
                
            }
        });
        axios.get(`/api/viewclients`).then(res=>{
            
            if(res.data.status === 200){
                setClients(res.data.clients)
                

            }
        });
    }, []);
    var founisseurOP = (
        fournisseurs.map( (index) => {
            return <option value={index.id}>{index.name_founissor}</option> 

        })
    );
    var clientOP = (
        clients.map( (index) => {
            
            return <option value={index.id}>{index.name_client}</option> 

        })
    )
    const [machines, setMachines] = useState({
        ref : "",
        name : "",
        discipline : "",
        fonction : "",
        date_e : "",
        idClient : "",
        founisseur_id : "",
        accessoires : "",
        raison :"",
        description : "",
        errors_list : {}
    });
    const history = useHistory();

    
    const handleInput = (e) => {
        e.persist();
        setMachines({
            ...machines,[e.target.name ]:e.target.value})

    }
    const handleImage = (e) => {
        setPicture( {image : e.target.files[0]})

    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('image',picture.image);
        formData.append('name',machines.name);
        formData.append('ref',machines.ref);
        formData.append('discipline',machines.discipline);
        formData.append('fonction',machines.fonction);
        formData.append('date_e',machines.date_e);
        formData.append('client_id',machines.idClient);
        formData.append('founisseur_id',machines.founisseur_id);
        formData.append('accessoires',machines.accessoires);
        formData.append('description',machines.description);
        formData.append('raison',machines.raison);

        
        
        
        axios.post(`/api/add-machine`,formData).then(res=>{
            console.log(res);
            if(res.data.status === 200)
                {
                    swal("ENREGISTER","La machine est ajoutée");
                    history.push('/admin/viewmachines');
                }else if(res.data.status === 201){
                    setMachines({
                        ...machines,errors_list : res.data.valdator_errors
                    });
                }else {
                    swal("PROBLEME",'Un autre probleme');
                    
                }

        });
        
    }
    return (
        <div>
            
            <div className="container py-5 ">
                <div className="row justify-content-center">
                    <div className="col-md ">
                        <div className="card shadow" style={{height : "100%"}}>
                            
                                <ul className="nav nav-tabs">
                                <li class="nav-item">
                                        <Link className="nav-inactive nav-link " aria-current="page" to="/admin/viewmachines">les machines</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="#">Ajouter une machine</Link>
                                    </li>
                                    
                                    
                                    
                                </ul>
                            <div className="w-100 pt-2 h-75">
                                <form onSubmit={handleSubmit} className="row g-3 m-3" style={{paddingBottom : "100px"}} >
                                <div className="col-md-6">
                                <div className="input-group col-md-4 ">
                                        <span className="input-group-text  " style={{width : "100px"}}  id="inputGroup-sizing-default"> SN  </span>
                                        <input type="text" className="form-control " name="ref" onChange={handleInput} value={machines.ref}  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                                        placeholder="Entrer le numero de serie"/>
                                    </div>
                                    <span className="err-mess">{machines.errors_list.ref}</span>

                                    </div>
                                    <div className="col-md-6">
                                    <div className="input-group col-md-4 ">
                                        <span className="input-group-text  " style={{width : "100px"}}  id="inputGroup-sizing-default"> La marque  </span>
                                        <input type="text" className="form-control " name="name" onChange={handleInput} value={machines.name}  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                                        placeholder="Entrer la marque"/>
                                    </div>
                                    <span className="err-mess">{machines.errors_list.name}</span>
                                    </div>
                                    
                                    <div className="col-md-6">
                                    <div className="input-group col-md-4 ">
                                        <span className="input-group-text  " style={{width : "100px"}}   id="inputGroup-sizing-default"> Actions </span>
                                        <input type="text" className="form-control " name="fonction" onChange={handleInput} value={machines.fonction}  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                                        placeholder="Entrer les actions déja réalisées"/>
                                    </div>
                                    <span className="err-mess">{machines.errors_list.fonction}</span>
                                    </div>
                                    <div className="col-md-6">
                                    <div className="input-group col-md-4 ">
                                        <span className="input-group-text  " style={{width : "100px"}}  id="inputGroup-sizing-default"> date  </span>
                                        <input type="date" className="form-control " name="date_e" onChange={handleInput} value={machines.date_e}  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                                        />
                                    </div>
                                    <span className="err-mess">{machines.errors_list.date_e}</span>
                                    </div>
                                    <div className="col-md-6">
                                    <div className="input-group col-md-4 ">
                                        <span className="input-group-text  " style={{width : "100px"}}    id="inputGroup-sizing-default"> Accessoires  </span>
                                        <input type="text" className="form-control " name="accessoires" onChange={handleInput} value={machines.accessoires}  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                                        placeholder="Cable + Ecran + Souris + ..."/>
                                    </div>
                                    <span className="err-mess">{machines.errors_list.accessoires}</span>
                                    </div>
                                    <div className="col-md-6">
                                    <div className="  input-group col-md-4 ">
                                        <span className="input-group-text  " style={{width : "100px"}}   id="inputGroup-sizing-default"> Client  </span>
                                        <select type="text" className="form-control select-add " name="idClient" onChange={handleInput} value={machines.idClient}  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                                        <option value="default">choisir un client</option>
                                        
                                          {clientOP}
                                            
                                        </select>
                                    </div>
                                    <span className="err-mess">{machines.errors_list.client_id}</span>
                                    </div>
                                    <div className="col-md-6">
                                    <div className="input-group col-md-4 ">
                                        <span className="input-group-text  " style={{width : "100px"}}  id="inputGroup-sizing-default"> Discipline  </span>
                                        <select type="text" className="form-control select-add " name="discipline" onChange={handleInput} value={machines.discipline}  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                                            <option value="default">choisir une discipline</option>
                                            <option value="hymatologie">Hymatologie</option>
                                            <option value="immunologie">immunologie</option>
                                            <option value="Biochimie">Biochimie</option>
                                            <option value="Bactériologie">Bactériologie</option>
                                        </select>
                                    </div>
                                    <span className="err-mess">{machines.errors_list.discipline}</span>

                                    </div>
                                    <div className="col-md-6">
                                    
                                    <div className="input-group col-md-4 ">
                                        <span className="input-group-text  " style={{width : "100px"}}   id="inputGroup-sizing-default"> Fournisseur  </span>
                                        <select type="text" className="form-control select-add " name="founisseur_id" onChange={handleInput} value={machines.founisseur_id}  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                                        <option value="default">choisir un fournisseur</option>
                                          {founisseurOP}
                                            
                                        </select>
                                    </div>
                                    <span className="err-mess">{machines.errors_list.founisseur_id}</span>
                                    </div>
                                    

                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <input className="form-control form-control-sm" name="logo" onChange={handleImage}  id="formFileSm" type="file" />
                                        </div>
                                        <span className="err-mess">{machines.errors_list.image}</span>
                                    </div>
                                    <div className="col-md-12">
                                    <div className="input-group col-md-4 ">
                                        <span className="input-group-text  " style={{width : "100px"}}    id="inputGroup-sizing-default"> Accessoires  </span>
                                        <input type="text" className="form-control " name="raison" onChange={handleInput} value={machines.raison}  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                                        placeholder="Enter la raison"/>
                                    </div>
                                    <span className="err-mess">{machines.errors_list.raison}</span>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label   className="form-label" >Description</label>
                                            <textarea typeof="textarea" className="form-control" name="description" onChange={handleInput} value={machines.description}  id="exampleFormControlTextarea1" rows="3"></textarea>
                                            
                                        </div>
                                        <div className="err-mess">{machines.errors_list.description}</div>
                                    </div>
                                    
                                    
                                    <div className="form-group md-3">
                                        <button className="btn btn-outline-success btn-lg btn-block w-100 p-3 rounded-3">Ajouter la machine</button>
                                    </div>
                                    
                                    
                                    
                                </form>


                            </div>

                             
                            <div className="card-body">
                                


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
}

export default AddMachine;