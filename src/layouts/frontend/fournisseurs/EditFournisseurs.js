import axios from "axios";
import React,{useState,useEffect} from "react";
import {Link} from "react-router-dom"
import { useHistory } from "react-router-dom";
import swal from "sweetalert";






function EditFournisseurs(props){
    const [loading, setLoading] = useState(true);
    const [picture, setPicture] = useState([]);
    const [fournisseur, setfournisseur] = useState({
        name_founissor : "",
        email_founissor : "",
        adresse_founissor : "",
        telephone_founissor : "",
        description_founissor : "",
        
        
    });
    const [errorList, seterrorList] = useState({});
    const history = useHistory();
    const id_fournissor = props.match.params.id;
    console.log(id_fournissor);
    useEffect(() => {
        axios.get(`/api/editfournisseur/${id_fournissor}`).then(res=>{
            if(res.data.status === 200){
                setfournisseur(res.data.fournisseur);
                console.log(fournisseur);
            }else{
                console.log("error");
            }
            setLoading(false);
        })
        
    }, []);
    var html = "";
    if (loading) {
        html = <div className="position-absolute top-50 start-50 translate-middle">
            <div className="spinner-border text-success " role="status">
                <span class="sr-only"></span>
            </div>
        </div>
    }
    
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
        formData.append('name',fournisseur.name_founissor);
        formData.append('email',fournisseur.email_founissor);
        formData.append('telephone',fournisseur.telephone_founissor);
        formData.append('adresse',fournisseur.adresse_founissor);
        formData.append('description',fournisseur.description_founissor);
        
        
        axios.post(`/api/updatefournisseur/${id_fournissor}`,formData).then(res=>{
            if(res.data.status === 200)
                {
                    console.log("ENREGISTER")
                    swal("ENREGISTER","Le fournisseur est ajouté");
                    history.push('/admin/viewfournisseurs');
                }else if(res.data.status === 201){
                    console.log(res.data)
                    seterrorList(res.data.valdator_errors)
                    
                }else {
                    console.log("NOT Found")
                    swal("PROBLEME",'Auccun fournisseur trouvé');
                    
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
                                        <Link className="nav-inactive nav-link " aria-current="page" to="/admin/viewfournisseurs">les fournisseurs</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-inactive nav-link " aria-current="page" to="/admin/addfournisseurs">Ajouter un fournisseur</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="#">Modifier un fournisseur</Link>
                                    </li>
                                    
                                    
                                    
                                </ul>
                            <div className="w-100 pt-2 h-75">
                            {html}
                                <form onSubmit={handleSubmit} className="row g-3 m-3" style={{paddingBottom : "100px"}} >
                                    
                                    <div className="col-md-6">
                                    <div className="input-group col-md-4 ">
                                        <span className="input-group-text  " style={{width : "80px"}}  id="inputGroup-sizing-default"> Le nom  </span>
                                        <input type="text" className="form-control " name="name_founissor" onChange={handleInput} value={fournisseur.name_founissor}  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                                    </div>
                                    <span className="err-mess">{errorList.name}</span>
                                    </div>
                                    <div className="col-md-6"></div>
                                    <div className="col-md-6">
                                    <div className="input-group col-md-4 ">
                                        <span className="input-group-text  " style={{width : "80px"}}   id="inputGroup-sizing-default"> Email  </span>
                                        <input type="text" className="form-control " name="email_founissor" onChange={handleInput} value={fournisseur.email_founissor}  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                                    </div>
                                    <span className="err-mess">{errorList.email}</span>
                                    </div>
                                    <div className="col-md-6"></div>
                                    <div className="col-md-6">
                                    <div className="input-group col-md-4 ">
                                        <span className="input-group-text  " style={{width : "80px"}}    id="inputGroup-sizing-default"> Tel  </span>
                                        <input type="text" className="form-control " name="telephone_founissor" onChange={handleInput} value={fournisseur.telephone_founissor}  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                                    </div>
                                    <span className="err-mess">{errorList.telephone}</span>
                                    </div>
                                    <div className="col-md-6"></div>
                                    <div className="col-md-6">
                                    <div className="input-group col-md-4 ">
                                        <span className="input-group-text  " style={{width : "80px"}}   id="inputGroup-sizing-default"> Adresse  </span>
                                        <input type="text" className="form-control " name="adresse_founissor" onChange={handleInput} value={fournisseur.adresse_founissor}  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                                    </div>
                                    <span className="err-mess">{errorList.adresse}</span>
                                    </div>
                                    <div className="col-md-6"></div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <input className="form-control form-control-sm" name="logo" onChange={handleImage}  id="formFileSm" type="file" />
                                        </div>
                                        <span className="err-mess">{errorList.image}</span>
                                    </div>
                                    
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label   className="form-label" >Description</label>
                                            <textarea typeof="textarea" className="form-control" name="description_founissor" onChange={handleInput} value={fournisseur.description_founissor}  id="exampleFormControlTextarea1" rows="3"></textarea>
                                        </div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <button className="btn btn-outline-success btn-lg btn-block w-100 p-3 rounded-3">Modifier le fournisseur</button>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <Link to="/admin/viewfournisseurs"  className="btn btn-outline-warning btn-lg btn-block w-100 p-3 rounded-3">Annuler</Link>
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

export default EditFournisseurs;