
import { faHardDrive, faHashtag, faStore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React,{useState,useEffect} from "react";


function NumberOfFournissor(){
    
    const [fournisseur, setfournisseur] = useState([]);
    
    useEffect(() => {
        axios.get(`/api/viewfournissors`).then(res => {
            
            if (res.data.status === 200) {
                
                setfournisseur(res.data.fournisseurs)
            }
        });
        
    }, []);
    var html = "";
    console.log(fournisseur)
    html = fournisseur.map(item=>{
        return(<tr>
            <td>{item.name_founissor}</td>
            <td>{item.email_founissor}</td>
        </tr>);
    });
    
     return (
        <div>
             <button class="btn btn-inter btn-light w-100 border mb-1 position-relative" style={{ textAlign: "left" }} type="button" data-toggle="collapse" data-target="#detailsFou" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
             <FontAwesomeIcon className="px-2" icon={faStore}/> Fournisseurs
                        <span className="hour rounded-1 text-white bg-warning position-absolute end-0 me-2 pe-2 ps-2 " ><FontAwesomeIcon icon={faHashtag} /> {fournisseur.length}</span>
                                
             </button>
             <div class="collapse navbar-collapse  " id="detailsFou">
                    <table className="table">
                        <thead>
                            <tr>
                                <td>Fournisseur</td>
                                <td>Email fournisseur</td>
                            </tr>
                        </thead>
                        <tbody>
                            {html}
                        </tbody>
                    </table>
                    
             </div>
             

         </div>
     );
}
export default NumberOfFournissor;