import React,{useState} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import Navbar from "../layouts/frontend/Navbar"
import "./css/login.css"
function Login(){
    const [loginInput, setLogin] = useState({
        email:"",
        password:"",
        errors_list :{}
    });
    const history = useHistory();

    const handleInput = (e) => {
        e.persist();
        setLogin({
            ...loginInput,[e.target.name ]:e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const loginData = {
            email:loginInput.email,
            password:loginInput.password,
        } 
        /*const apiClient = axios.create({
            baseURL: `http://localhost:8000`,
            withCredentials: true,
          }); 
          let config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
          }*/
        console.log(loginData);
        axios.get('sanctum/csrf-cookie').then(response => {
            axios.post('/api/login', loginData).then(res=>{
                console.log(res);
                if(res.data.status === 200)
                {
                    localStorage.setItem("user_name",res.data.username);
                    localStorage.setItem("user_token",res.data.token);
                    if(localStorage.getItem("user_token")){
                    
                    history.push('/admin');
                    }
                }else if(res.data.status === 201){
                    setLogin({
                        ...loginInput,errors_list : res.data.valdator_errors
                    });
                }else {
                    swal("Ouups !!!",'The credentials is false');
                    history.push('/login');
                }
            });
        });
        
        
        
       
    }
    return (
        <div>
            <Navbar/>
            <div className="container py-5 mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6 rounded-3">
                        <div className="card shadow ">
                            <div className="card-header " style={{backgroundColor : "#1e9d9e"}}>
                                <h1 className="text-center fw-bold text-white">S'authentifier</h1>

                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group md-3">
                                        <label style={{color : "#eb5e1a", fontSize : "18px" ,fontWeight :"bold"}}>Email</label>
                                        <input type="text" style={{border : "solid 1px #1e9d9e"}} name="email" onChange={handleInput} value={loginInput.email} className="form-control"  placeholder="Enter l'adresse mail" />
                                        <div className="text-danger fs-6">{loginInput.errors_list.email}</div>
                                    </div>
                                    <div className="form-group md-3">
                                        <label style={{color : "#eb5e1a", fontSize : "18px" ,fontWeight :"bold"}}>Mot de passe</label>
                                        <input type="password" style={{border : "solid 1px #1e9d9e"}}  name="password" onChange={handleInput} value={loginInput.password} className="form-control"  placeholder="Enter le mot de passe" />
                                        <div className="text-danger fs-6">{loginInput.errors_list.password}</div>
                                    </div>
                                    <br />
                                    <div className="form-group md-3">
                                        <button className="login btn w-100" style={{border : "solid 1px #1e9d9e",height : "50px",color : "#eb5e1a", fontSize : "18px" ,fontWeight :"bold"}} > Se Connecter </button>
                                    </div>
                                </form>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>
                
            </style>
        </div>

    );
}
export default Login;