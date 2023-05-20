import "./css/register.css"
import axios from "axios";
import React, { useState} from "react";
import { Link } from "react-router-dom"
import swal from "sweetalert";
import { useHistory } from "react-router-dom";


function Register(){
    const [registerInput, setRegister] = useState({
        name:"",
        email:"",
        password:"",
        errors_list :{}
    });
    const history = useHistory();

    const handleInput = (e) => {
        e.persist();
        setRegister({
            ...registerInput,[e.target.name ]:e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if(registerInput.password1===registerInput.password2){
            const data = {
                nom:registerInput.name,
                email:registerInput.email,
                password:registerInput.password1,
                abreviation:registerInput.abreviation,
                role:registerInput.role,
                fonction:registerInput.fonction,
                genre:registerInput.genre
            } 
            console.log(data)
        axios.get('sanctum/csrf-cookie').then(response => {
            axios.post('/api/register', data).then(res=>{
                console.log(res);
                if(res.data.status === 200)
                {   
                    localStorage.setItem("user_name",res.data.username);
                    localStorage.setItem("user_token",res.data.token);
                    swal("Ajouté!", res.data.username+" est ajouté");
                    history.push('/admin/register')

                }else{
                    setRegister({
                        ...registerInput,errors_list : res.data.valdator_errors
                    });
                }
            });
        });
        }else{
            setRegister({
                ...registerInput,diff_pass : "Le mot de passe n'est pas confirmé"
            });
            console.log(registerInput.diff_pass)

        }
        
        
        
        
        
       
    }
    
    console.log(registerInput.errors_list)
    return (
        
        <div>

            <div className="container py-5 ">
                <div className="row justify-content-center">
                    <div className="col-md ">
                        <div className="card shadow" style={{ height: "100%" }}>

                            <ul className="nav-list nav pt-1 nav-tabs w-100 position-relative">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="#">Ajouter un utilisateur</Link>
                                </li>
                                

                                
                                
                            
                            
                        </ul>
                            

                            <div className="card-body">
                            <div className="w-100 pt-2 h-75">
                                <form onSubmit={handleSubmit} className="row g-3 m-3" style={{paddingBottom : "100px"}} >
                                <div className="col-md-6">
                                <div className="input-group col-md-4 ">
                                        <span className="input-group-text  " style={{width : "100px"}}  id="inputGroup-sizing-default"> Nom Complet  </span>
                                        <input type="text" className="form-control " name="name" onChange={handleInput} value={registerInput.name}  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Entrer le nom complet"/>
                                       
                                    </div>
                                    <span className="err-mess">{registerInput.errors_list.nom}</span>

                                    </div>
                                    <div className="col-md-6">
                                    <div className="input-group col-md-4 ">
                                        <span className="input-group-text  " style={{width : "100px"}}  id="inputGroup-sizing-default"> Abreviation  </span>
                                        <input type="text" className="form-control " name="abreviation" onChange={handleInput} value={registerInput.abreviation}  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Entrer un abréviation"/>
                                    </div>
                                    <span className="err-mess">{registerInput.errors_list.abreviation}</span>
                                    </div>
                                    
                                    <div className="col-md-6">
                                    <div className="input-group col-md-4 ">
                                        <span className="input-group-text  " style={{width : "100px"}}   id="inputGroup-sizing-default"> Email  </span>
                                        <input type="text" className="form-control " name="email" onChange={handleInput} value={registerInput.email}  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Entrer l'Email"/>
                                    </div>
                                    <span className="err-mess">{registerInput.errors_list.email}</span>
                                    </div>
                                    <div className="col-md-6">
                                    <div className="input-group col-md-4 ">
                                        <span className="input-group-text  " style={{width : "100px"}}  id="inputGroup-sizing-default"> Fonction  </span>
                                        <select type="text" className="form-control select-add " name="fonction" onChange={handleInput} value={registerInput.fonction}  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Entrer la fonction">
                                            <option value="default">choisir une fonction</option>
                                            <option value="ingénieur biomédical">ingénieur biomédical</option>
                                            <option value="ingénieur d'application">ingénieur d'application</option>
                                            <option value="administrateur">Administrateur</option>
                                            
                                        </select>
                                        </div>
                                        <span className="err-mess">{registerInput.errors_list.fonction}</span>
                                    </div>
                                    <div className="col-md-6">
                                    <div className="input-group col-md-4 ">
                                        <span className="input-group-text  " style={{width : "100px"}}    id="inputGroup-sizing-default"> Mot de passe  </span>
                                        <input type="password" className="form-control " name="password1" onChange={handleInput} value={registerInput.password1}  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Entrer un mot de passe"/>
                                    </div>
                                    <span className="err-mess">{registerInput.errors_list.password}</span>
                                    </div>
                                    <div className="col-md-6">
                                    <div className="  input-group col-md-4 ">
                                        <span className="input-group-text  " style={{width : "100px"}}   id="inputGroup-sizing-default"> Role  </span>
                                        <select type="text" className="form-control select-add " name="role" onChange={handleInput} value={registerInput.role}  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" >
                                        <option value="default">choisir un client</option>
                                        <option value="1">Administrateur</option>
                                        <option value="0">Utilisateur</option>
                                        
                                          
                                            
                                        </select>
                                    </div>
                                    <span className="err-mess">{registerInput.errors_list.role}</span>
                                    </div>
                                    <div className="col-md-6">
                                    <div className="input-group col-md-4 ">
                                        <span className="input-group-text  " style={{width : "100px"}}    id="inputGroup-sizing-default"> Mot de passe  </span>
                                        <input type="password" className="form-control " name="password2" onChange={handleInput} value={registerInput.password2}  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Comfirmer le mot de passe"/>
                                    </div>
                                    <span className="err-mess">{registerInput.diff_pass}</span>
                                    </div>
                                    <div className="col-md-6">
                                    <div className="input-group col-md-4 ">
                                        <span className="input-group-text  " style={{width : "100px"}}  id="inputGroup-sizing-default"> Genre  </span>
                                        <select type="text" className="form-control select-add " name="genre" onChange={handleInput} value={registerInput.genre}  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                                            <option value="default">choisir une discipline</option>
                                            <option value="masculin">Masculin</option>
                                            <option value="féminin">Féminin</option>
                                        </select>
                                    </div>
                                    <span className="err-mess">{registerInput.errors_list.genre}</span>

                                    </div>
                                    
                                    

                                    
                                    
                                    
                                    <div className="form-group md-3">
                                        <button className="btn btn-outline-success btn-lg btn-block w-100 p-3 rounded-3">Ajouter l'utilisateur</button>
                                    </div>
                                    
                                    
                                    
                                </form>


                            </div>
                                

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        

    );
}
export default Register;