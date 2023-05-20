import axios from "axios";
import React,{useEffect, useState} from "react";
import {Link} from "react-router-dom"
import { useHistory } from "react-router-dom";
import swal from "sweetalert";





function EditMachine(props){
    const [picture, setPicture] = useState([]);
    const [loading, setLoading] = useState(true);
    const [clients, setClients] = useState([]);
    const [fournisseurs, setFournisseurs] = useState([]);
    const [machine, setmachine] = useState({});
    const [errorList, seterrorList] = useState({});
    const history = useHistory();
    const id_machine = props.match.params.ref;
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
        axios.get(`/api/editmachine/${id_machine}`).then(res=>{
            setmachine(res.data.machine)
            setLoading(false)
        });
    }, []);
    var html = "";
    if (loading) {
        html = <div className="position-absolute top-50 start-50 translate-middle">
            <div className="spinner-border text-success " role="status">
                <span class="sr-only"></span>
            </div>
        </div>
    }
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
    
    
    const handleInput = (e) => {
        e.persist();
        setmachine({
            ...machine,[e.target.name ]:e.target.value})

    }
    const handleImage = (e) => {
        setPicture( {image : e.target.files[0]})

    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('image',picture.image);
        formData.append('name',machine.name_machine);
        formData.append('ref',machine.ref_machine);
        formData.append('discipline',machine.discipline_machine);
        formData.append('fonction',machine.fonction_machine);
        formData.append('date_e',machine.date_entree);
        formData.append('client_id',machine.client_id);
        formData.append('founisseur_id',machine.fournissur_id);
        formData.append('accessoires',machine.accessoires_machine);
        formData.append('description',machine.description);
        formData.append('raison',machine.raison);
        
        for(var value of formData.values()){
            console.log(value)
        }
        
        axios.post(`/api/updatemachine/${id_machine}`,formData).then(res=>{
            console.log(res);
            if(res.data.status === 200)
                {
                    swal("ENREGISTER",res.data.message);
                    history.push('/admin/viewmachines');
                }else if(res.data.status === 201){
                    seterrorList(res.data.valdator_errors);
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
                                        <Link className="nav-inactive nav-link " aria-current="page" to="/admin/addmachines">Ajouter une machine</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="#">Modifier une machine</Link>
                                    </li>
                                    
                                    
                                    
                                </ul>
                            <div className="w-100 pt-2 h-75">
                            {html}
                                <form onSubmit={handleSubmit} className="row g-3 m-3" style={{paddingBottom : "100px"}} >
                                <div className="col-md-6">
                                <div className="input-group col-md-4 ">
                                        <span className="input-group-text  " style={{width : "100px"}}  id="inputGroup-sizing-default"> REFERENCE  </span>
                                        <input type="text" className="form-control " name="ref_machine" onChange={handleInput} value={machine.ref_machine}  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                                    </div>
                                    <span className="err-mess">{errorList.ref}</span>
                                    </div>
                                    <div className="col-md-6">
                                    <div className="input-group col-md-4 ">
                                        <span className="input-group-text  " style={{width : "100px"}}  id="inputGroup-sizing-default"> Le nom  </span>
                                        <input type="text" className="form-control " name="name_machine" onChange={handleInput} value={machine.name_machine}  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                                    </div>
                                    <span className="err-mess">{errorList.name}</span>
                                    </div>
                                    
                                    <div className="col-md-6">
                                    <div className="input-group col-md-4 ">
                                        <span className="input-group-text  " style={{width : "100px"}}   id="inputGroup-sizing-default"> Action  </span>
                                        <input type="text" className="form-control " name="fonction_machine" onChange={handleInput} value={machine.fonction_machine}  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                                    </div>
                                    <span className="err-mess">{errorList.fonction}</span>
                                    </div>
                                    <div className="col-md-6">
                                    <div className="input-group col-md-4 ">
                                        <span className="input-group-text  " style={{width : "100px"}}  id="inputGroup-sizing-default"> date  </span>
                                        <input type="date" className="form-control " name="date_entree" onChange={handleInput} value={machine.date_entree}  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                                    </div>
                                    </div>
                                    <div className="col-md-6">
                                    <div className="input-group col-md-4 ">
                                        <span className="input-group-text  " style={{width : "100px"}}    id="inputGroup-sizing-default"> Accessoires  </span>
                                        <input type="text" className="form-control " name="accessoires_machine" onChange={handleInput} value={machine.accessoires_machine}  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                                    </div>
                                    <span className="err-mess">{errorList.accessoires}</span>
                                    </div>
                                    <div className="col-md-6">
                                    <div className="input-group col-md-4 ">
                                        <span className="input-group-text  " style={{width : "100px"}}   id="inputGroup-sizing-default"> Client  </span>
                                        <select type="text" className="form-control select-add " name="client_id" onChange={handleInput} value={machine.client_id}  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                                        <option value="default">choisir un client</option>
                                        <option value="MEGAFLEX">Megaflex</option>
                                          {clientOP}
                                            
                                        </select>
                                    </div>
                                    <span className="err-mess">{errorList.client_id}</span>
                                    </div>
                                    <div className="col-md-6">
                                    <div className="input-group col-md-4 ">
                                        <span className="input-group-text  " style={{width : "100px"}}  id="inputGroup-sizing-default"> Discipline  </span>
                                        <select type="text" className="form-control select-add" name="discipline_machine" onChange={handleInput} value={machine.discipline_machine}  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                                            <option value="default">choisir une discipline</option>
                                            <option value="hymatologie">Hymatologie</option>
                                            <option value="immunologie">immunologie</option>
                                            <option value="Biochimie">Biochimie</option>
                                            <option value="Bactériologie">Bactériologie</option>
                                        </select>
                                    </div>
                                    <span className="err-mess">{errorList.discipline}</span>

                                    </div>
                                    <div className="col-md-6">
                                    
                                    <div className="input-group col-md-4 ">
                                        <span className="input-group-text  " style={{width : "100px"}}   id="inputGroup-sizing-default"> Fournisseur  </span>
                                        <select type="text" className="form-control select-add" name="fournissur_id" onChange={handleInput} value={machine.fournissur_id}  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                                        <option value="default">choisir un fournisseur</option>
                                          {founisseurOP}
                                            
                                        </select>
                                    </div>
                                    <span className="err-mess">{errorList.fournissur_id}</span>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <input className="form-control form-control-sm" name="logo" onChange={handleImage}  id="formFileSm" type="file" />
                                        </div>
                                        <span className="err-mess">{errorList.image}</span>
                                    </div>
                                    <div className="col-md-12">
                                    <div className="input-group col-md-4 ">
                                        <span className="input-group-text  " style={{width : "100px"}}    id="inputGroup-sizing-default"> Accessoires  </span>
                                        <input type="text" className="form-control " name="raison" onChange={handleInput} value={machine.raison}  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                                        placeholder="Enter la raison"/>
                                    </div>
                                    <span className="err-mess">{errorList.raison}</span>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label   className="form-label" >Description</label>
                                            <textarea typeof="textarea" className="form-control" name="description" onChange={handleInput} value={machine.description}  id="exampleFormControlTextarea1" rows="3"></textarea>
                                            
                                        </div>
                                        <div className="err-mess">{errorList.description}</div>
                                    </div>
                                    
                                    <div className="form-group col-md-6">
                                        <button className="btn btn-outline-success btn-lg btn-block w-100 p-3 rounded-3">Modifier le fournisseur</button>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <Link to="/admin/viewmachines"  className="btn btn-outline-warning btn-lg btn-block w-100 p-3 rounded-3">Annuler</Link>
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

export default EditMachine;