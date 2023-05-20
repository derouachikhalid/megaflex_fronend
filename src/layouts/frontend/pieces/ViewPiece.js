import { faGears, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

function ViewPieces(){
    const [loading, setloading] = useState(true);
    const [pieces, setpieces] = useState([]);
    const [order, setorder] = useState("ASC");
    useEffect(() => {
        axios.get(`/api/viewpieces`).then(res => {
            
            if (res.data.status === 200) {
                setpieces(res.data.pieces);

            }
            setloading(false);
            
        });
        
    }, []);

    const deleting = (e,id) => {
        e.preventDefault()
        const thisClicked = e.currentTarget;
        
        axios.delete(`/api/deletepiece/${id}`).then(res=>{
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
        
        html =pieces.map((index)=>{
            return (<tr key={index.SN}>
                <td className="col">{index.SN}</td>
                <td className="col">{index.designation}</td>
                <td ><div className="col d-none d-lg-block">{index.description}</div></td>
                <td className="col">{index.ref_machine}</td>
                <td> <Link type="button" className="btn" to={`/admin/editpiece/${index.SN}`}><FontAwesomeIcon className="text-warning" icon={faPenToSquare}/></Link> <button className="btn " onClick={(e)=>deleting(e,index.SN)} ><FontAwesomeIcon className="text-danger" icon={faTrashCan}/></button></td>
            </tr>
            );
        });
        

    }
    const sorting = (col)=>{
        if(order==="ASC"){
            const sorted = [...pieces].sort((a,b)=>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1 
            );
            setpieces(sorted);
            setorder("DSC");

        }
        if(order==="DSC"){
            const sorted = [...pieces].sort((a,b)=>
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1 
            );
            setpieces(sorted);
            setorder("ASC");

        }

    }
    
     return (
        <div>
            
        <div className="container py-5 ">
            <div className="row justify-content-center">
                <div className="col-xs ">
                    <div className="card shadow" style={{height : "100%"}}>
                        
                            
                                
                            
                    
                            
                            <ul className="nav nav-tabs">
                            <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="#">Les pieces</Link>
                                </li>
                                
                                    <li class="nav-item">
                                        <Link className="nav-inactive nav-link " aria-current="page" to="/admin/addpiece">Ajouter une piece</Link>
                                    </li>
                                
                            </ul>
                        

                         
                        <div className="card-body">
                            <table className="table table-border table table-hover">
                                <thead>
                                    <tr>
                                        <th onClick={()=>sorting("SN")}>#</th>
                                        <th onClick={()=>sorting("designation")} >designation</th>
                                        <th ><div className="d-none d-lg-block">description</div></th>
                                        <th onClick={()=>sorting("ref_machine")} >machine</th>
                                        <th className="text-center" ><FontAwesomeIcon icon={faGears}/></th>
                                    </tr>
                                </thead>
                                <tbody>
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
export default ViewPieces;