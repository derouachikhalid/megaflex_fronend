import { faGears, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

function ViewClients(){
    const [loading, setLoading] = useState(true);
    const [clients, setClients] = useState({});
    const [input, setinput] = useState("");
    const [Choice, setChoice] = useState("id");
    useEffect(() => {
        axios.get(`/api/viewclients`).then(res=>{
            console.log(res)
            if(res.data.status === 200){
                setClients(res.data.clients);

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
        

        axios.delete(`/api/deleteclient/${id}`).then(res=>{
            if(res.status === 500){
                swal("success",res.data,"success");
                console.log("vous ne pouver pas le supprimer")

            }
            else{
                if(res.data.status===200){
                swal("success",res.data.message,"success");
                thisClicked.closest('tr').remove();

                }else if(res.data.status ===404){
                swal("success",res.data.message,"success");
                

                }
            }
        });
    }





    
    var html = "";
    if(loading){
        html = <div className="position-absolute top-50 start-50 translate-middle">
            <div className="spinner-border text-success " role="status">
                <span class="sr-only"></span>
            </div>
        </div>
    }else{
        
        html = clients.filter((index)=>{
            if(input===""){
                return index;
            }else {
                switch (Choice) {
                    case "id":
                        if(index.id == input){
                            return index;
                        }
                        
                        break;
                    case "name":
                        if(index.name_client.toLowerCase().includes(input.toLowerCase())){
                            return index;
                        }
                        
                        break;
                    case "email":
                        if(index.email_client.toLowerCase().includes(input.toLowerCase())){
                            return index;
                        }
                        
                        break;
                    case "ville":
                        if(index.ville_client.toLowerCase().includes(input.toLowerCase())){
                            return index;
                        }
                        
                        break;    
                
                    default:
                        break;
                }
            } 
        }).map((index)=>{
            return (<tr key={index.id}>
                <td>{index.id}</td>
                <td>{index.name_client}</td>
                <td>{index.email_client}</td>
                <td ><div className="col d-none d-lg-block p-auto">{index.telephone_client}</div></td>
                <td>{index.ville_client}</td>
                <td> <Link type="button" className="btn " to={`/admin/editclients/${index.id}`}><FontAwesomeIcon className="text-warning" icon={faPenToSquare}/></Link> <button className="btn " onClick={(e)=>deleting(e,index.id)} ><FontAwesomeIcon className="text-danger" icon={faTrashCan}/></button></td>
            </tr>
            );
        });
        

    }
    
     return (
        <div>
            
        <div className="container py-5 ">
            <div className="row justify-content-center">
                <div className="col-xs ">
                    <div className="card shadow" style={{height : "100%"}}>
                        
                            
                                
                            
                    
                            
                            <ul className="nav nav-tabs">
                            <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="#">Les clients</Link>
                                </li>
                                
                                    <li class="nav-item">
                                        <Link className="nav-inactive nav-link " aria-current="page" to="/admin/addclients">Ajouter un client</Link>
                                    </li>
                                    <li className="nav-item position-absolute end-0 me-2" >
                                    <ul className="list-inline">
                                    <li className="list-inline-item">
                                    <select id="form1" className="form-control select-fil" onChange={(e)=>{ setChoice(e.target.value) }}  >
                                        <option value="default" >choisir un filtre</option>
                                        <option value="id" >identifiant</option>
                                        <option value="name" >Nom</option>
                                        <option value="email" >Email</option>
                                        <option value="ville" >Ville</option>

                                    </select>
                                    
                                </li>
                                <li className="list-inline-item">
                                <input type="search" id="form1" className="form-control " onChange={searchChange} placeholder="Rechercher ..." />
                                    
                                </li>

                                    </ul>
                                    </li>
                                
                            
                               
                            
                                
                            </ul>
                        

                         
                        <div className="card-body">
                            <table className="table table-border ">
                                <thead className="w-100">
                                    <tr>
                                        <th>id</th>
                                        <th>name</th>
                                        <th>email</th>
                                        <th ><div className="col d-none d-lg-block p-auto">telephone</div></th>
                                        <th>ville</th>
                                        <th className="text-center"><FontAwesomeIcon icon={faGears}/></th>
                                    </tr>
                                </thead>
                                <tbody className="w-100">
                                    {html}
                                    
                                </tbody>
                            </table>
                            


                        </div>
                    
                            


                       
                    </div>
                </div>
            </div>
        </div>
    </div>
     );
}
export default ViewClients;