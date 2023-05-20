import axios from "axios";
import React,{useState} from "react";
import {Link} from "react-router-dom";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";




function AddFournisseurs(){
    const [picture, setPicture] = useState([]);
    const [fournisseur, setfournisseur] = useState({
        name : "",
        email : "",
        telephone : "",
        adresse : "",
        descrition : "",
        errors_list :{}
    });
    const history = useHistory();
    
    const handleInput = (e) => {
        e.persist();
        setfournisseur({
            ...fournisseur,[e.target.name ]:e.target.value})

    }
    const handleImage = (e) => {
        setPicture( {image : e.target.files[0]})

    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('image',picture.image);
        formData.append('name',fournisseur.name);
        formData.append('email',fournisseur.email);
        formData.append('telephone',fournisseur.telephone);
        formData.append('adresse',fournisseur.adresse);
        formData.append('description',fournisseur.description);
        
        axios.post(`/api/add-fournissor`,formData).then(res=>{
            if(res.data.status === 200)
                {
                    console.log("ENREGISTER")
                    swal("ENREGISTER","Le fournisseur est ajouté");
                    history.push('/admin/viewfournisseurs');
                }else if(res.data.status === 201){
                    console.log(res.data)
                    setfournisseur({
                        ...fournisseur,errors_list : res.data.valdator_errors
                    });
                }else {
                    console.log("PROBLEME")
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
                                        <Link className="nav-link " aria-current="page" to="/admin/viewfournisseurs">les fournisseurs</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="#">Ajouter un fournisseur</Link>
                                    </li>
                                    
                                    
                                    
                                </ul>
                            <div className="w-100 pt-2 h-75">
                                <form onSubmit={handleSubmit} className="row g-3 m-3" style={{paddingBottom : "100px"}} >
                                    <div className="col-md-6">
                                    <div className="input-group col-md-4 ">
                                        <span className="input-group-text  " style={{width : "80px"}}  id="inputGroup-sizing-default"> Le nom  </span>
                                        <input type="text" className="form-control " name="name" onChange={handleInput} value={fournisseur.name}  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                                    </div>
                                    <span className="err-mess">{fournisseur.errors_list.name}</span>
                                    </div>
                                    <div className="col-md-6"></div>
                                    <div className="col-md-6">
                                    <div className="input-group col-md-4 ">
                                        <span className="input-group-text  " style={{width : "80px"}}   id="inputGroup-sizing-default"> Email  </span>
                                        <input type="text" className="form-control " name="email" onChange={handleInput} value={fournisseur.email}  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                                    </div>
                                    <span className="err-mess">{fournisseur.errors_list.email}</span>
                                    </div>
                                    <div className="col-md-6"></div>
                                    <div className="col-md-6">
                                    <div className="input-group col-md-4 ">
                                        <span className="input-group-text  " style={{width : "80px"}}    id="inputGroup-sizing-default"> Tel  </span>
                                        <input type="text" className="form-control " name="telephone" onChange={handleInput} value={fournisseur.telephone}  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                                    </div>
                                    <span className="err-mess">{fournisseur.errors_list.telephone}</span>
                                    </div>
                                    <div className="col-md-6"></div>
                                    <div className="col-md-6">
                                    <div className="input-group col-md-4 ">
                                        <span className="input-group-text  " style={{width : "80px"}}   id="inputGroup-sizing-default"> Adresse  </span>
                                        <input type="text" className="form-control " name="adresse" onChange={handleInput} value={fournisseur.adresse}  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                                    </div>
                                    <span className="err-mess">{fournisseur.errors_list.adresse}</span>
                                    </div>
                                    <div className="col-md-6"></div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <input className="form-control form-control-sm" name="logo" onChange={handleImage}  id="formFileSm" type="file" />
                                        </div>
                                        <span className="err-mess">{fournisseur.errors_list.image}</span>
                                    </div>
                                    
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label   className="form-label" >Description</label>
                                            <textarea typeof="textarea" className="form-control" name="description" onChange={handleInput} value={fournisseur.description}  id="exampleFormControlTextarea1" rows="3"></textarea>
                                        </div>
                                        <span className="err-mess">{fournisseur.errors_list.description}</span>
                                    </div>
                                    <div className="form-group md-3">
                                        <button className="btn btn-outline-success btn-lg btn-block w-100 p-3 rounded-3">Ajouter le fournisseur</button>
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

export default AddFournisseurs;