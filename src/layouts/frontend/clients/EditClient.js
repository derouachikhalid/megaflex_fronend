import axios from "axios";
import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";


function EditClients(props){
    const [picture, setPicture] = useState([]);
    const [client, setClient] = useState({
        
    });
    const [errors_list, seterrors_list] = useState({});

    const id_client = props.match.params.id;
    useEffect(() => {
        axios.get(`api/selectclient/${id_client}`).then(res=>{
            if(res.data.status===200){
                setClient(res.data.client);

            }

        });
    }, []);
    const handleInput = (e) => {
        e.persist();
        setClient({
            ...client,[e.target.name ]:e.target.value})

    }
    const handleImage = (e) => {
        setPicture( {image : e.target.files[0]})

    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('image',picture.image);
        formData.append('name',client.name_client);
        formData.append('email',client.email_client);
        formData.append('telephone',client.telephone_client);
        formData.append('ville',client.ville_client);
        formData.append('description',client.description_client);

        seterrors_list({})
        axios.post(`/api/editclient/${id_client}`,formData).then(res=>{
            
            if(res.data.status===200){

            }else{
                seterrors_list(res.data.valdator_errors)

            }

        });
        
        
    }
    
    return (
        <div>
            
            <div className="container py-5 ">
                <div className="row justify-content-center">
                    <div className="col-md ">
                        <div className="card shadow" style={{height : "100%"}}>
                            
                                <ul className="nav nav-tabs bg-primary ">
                                <li className="nav-item">
                                    <Link className="nav-inactive nav-link text-white font-weight-bold" aria-current="page" to="/admin/viewclients">Les clients</Link>
                                </li>
                                
                                    <li class="nav-item">
                                        <Link className="nav-inactive nav-link text-white font-weight-bold" aria-current="page" to="/admin/addclients">Ajouter un client</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link className="nav-link font-weight-bold active" aria-current="page" to="#">Modifier le client</Link>
                                    </li>
                                    
                                    
                                </ul>
                            <div className="w-100 pt-2 h-75">
                                <form onSubmit={handleSubmit} className="row g-3 m-3"  style={{paddingBottom : "100px"}}>
                                    <div className="col-md-6">
                                        <div className="input-group col-md-4 ">
                                            <span className="input-group-text  " style={{ width: "80px" }} id="inputGroup-sizing-default"> Le nom  </span>
                                            <input type="text" className="form-control " name="name_client" onChange={handleInput} value={client.name_client} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                                        </div>
                                        <span className="err-mess">{errors_list.name}</span>
                                    </div>
                                    <div className="col-md-6"></div>
                                    <div className="col-md-6">
                                        <div className="input-group col-md-4 ">
                                            <span className="input-group-text  " style={{ width: "80px" }} id="inputGroup-sizing-default"> Email  </span>
                                            <input type="text" className="form-control " name="email_client" onChange={handleInput} value={client.email_client} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                                        </div>
                                        <span className="err-mess">{errors_list.email}</span>
                                    </div>
                                    <div className="col-md-6"></div>
                                    <div className="col-md-6">
                                        <div className="input-group col-md-4 ">
                                            <span className="input-group-text  " style={{ width: "80px" }} id="inputGroup-sizing-default"> Tel  </span>
                                            <input type="text" className="form-control " name="telephone_client" onChange={handleInput} value={client.telephone_client} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                                        </div>
                                        <span className="err-mess">{errors_list.telephone}</span>
                                    </div>
                                    <div className="col-md-6"></div>
                                    <div className="col-md-6">
                                        <div className="input-group col-md-4 ">
                                            <span className="input-group-text  " style={{ width: "80px" }} id="inputGroup-sizing-default"> ville  </span>
                                            <input type="text" className="form-control " name="ville_client" onChange={handleInput} value={client.ville_client} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                                        </div>
                                        <span className="err-mess">{errors_list.ville}</span>
                                    </div>
                                    <div className="col-md-6"></div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <input className="form-control form-control-sm" name="logo" onChange={handleImage} value={client.logo}  id="formFileSm" type="file" />
                                        </div>
                                        <span className="err-mess">{errors_list.description}</span>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label" >Description</label>
                                            <textarea typeof="textarea" className="form-control" name="description_client" onChange={handleInput} value={client.description_client} id="exampleFormControlTextarea1" rows="3"></textarea>
                                        </div>
                                        
                                    </div>
                                    <div className="form-group col-md-6">
                                        <button className="btn btn-outline-success btn-lg btn-block w-100 p-3 rounded-3">Modifier le fournisseur</button>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <Link to="/admin/viewclients"  className="btn btn-outline-warning btn-lg btn-block w-100 p-3 rounded-3">Annuler</Link>
                                    </div>
                                    
                                    
                                    
                                </form>


                            </div>

                             
                            <div className="card-body">
                                


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default EditClients;