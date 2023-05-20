import axios from "axios";
import React,{useState} from "react";
import { Link } from "react-router-dom";


function AddClients(){
    const [picture, setPicture] = useState([]);
    const [client, setClient] = useState({
        name : "",
        email : "",
        telephone : "",
        ville : "",
        descrition : "",
        errors_list:{}
    });
    
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
        formData.append('name',client.name);
        formData.append('email',client.email);
        formData.append('telephone',client.telephone);
        formData.append('ville',client.ville);
        formData.append('description',client.description);

        
        axios.post(`/api/add-client`,formData).then(res=>{
            console.log(res);
            if(res.data.status === 200){


            }else{
                setClient({
                    ...client,errors_list : res.data.valdator_errors})
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
                                <li className="nav-item">
                                    <Link className="nav-inactive nav-link " aria-current="page" to="/admin/viewclients">Les clients</Link>
                                </li>
                                
                                    <li class="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="#">Ajouter un client</Link>
                                    </li>
                                    
                                    
                                </ul>
                            <div className="w-100 pt-2 h-75">
                                <form onSubmit={handleSubmit} className="row g-3 m-3"  style={{paddingBottom : "100px"}}>
                                    <div className="col-md-6">
                                        <div className="input-group col-md-4 ">
                                            <span className="input-group-text  " style={{ width: "80px" }} id="inputGroup-sizing-default"> Le nom  </span>
                                            <input type="text" className="form-control " name="name" onChange={handleInput} value={client.name} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                                        </div>
                                        <span className="err-mess">{client.errors_list.name}</span>
                                    </div>
                                    <div className="col-md-6"></div>
                                    <div className="col-md-6">
                                        <div className="input-group col-md-4 ">
                                            <span className="input-group-text  " style={{ width: "80px" }} id="inputGroup-sizing-default"> Email  </span>
                                            <input type="text" className="form-control " name="email" onChange={handleInput} value={client.email} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                                        </div>
                                        <span className="err-mess">{client.errors_list.email}</span>
                                    </div>
                                    <div className="col-md-6"></div>
                                    <div className="col-md-6">
                                        <div className="input-group col-md-4 ">
                                            <span className="input-group-text  " style={{ width: "80px" }} id="inputGroup-sizing-default"> Tel  </span>
                                            <input type="text" className="form-control " name="telephone" onChange={handleInput} value={client.telephone} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                                        </div>
                                        <span className="err-mess">{client.errors_list.telephone}</span>
                                    </div>
                                    <div className="col-md-6"></div>
                                    <div className="col-md-6">
                                        <div className="input-group col-md-4 ">
                                            <span className="input-group-text  " style={{ width: "80px" }} id="inputGroup-sizing-default"> ville  </span>
                                            <input type="text" className="form-control " name="ville" onChange={handleInput} value={client.ville} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                                        </div>
                                        <span className="err-mess">{client.errors_list.ville}</span>
                                    </div>
                                    <div className="col-md-6"></div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <input className="form-control form-control-sm" name="logo" onChange={handleImage} value={client.logo} id="formFileSm" type="file" />
                                        </div>
                                        <span className="err-mess">{client.errors_list.logo}</span>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label" >Description</label>
                                            <textarea typeof="textarea" className="form-control" name="description" onChange={handleInput} value={client.description} id="exampleFormControlTextarea1" rows="3"></textarea>
                                        </div>
                                        <span className="err-mess">{client.errors_list.description}</span>
                                    </div>
                                    <div className="form-group md-3">
                                        <button className="btn btn-outline-success btn-lg btn-block w-100 p-3 rounded-3"> Ajouter le client </button>
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
export default AddClients;