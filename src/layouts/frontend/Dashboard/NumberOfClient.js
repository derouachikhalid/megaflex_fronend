
import { faHardDrive, faHashtag, faPeopleLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React,{useState,useEffect} from "react";


function NumberOfClient(){
    const [clients, setclients] = useState([]);
    
    useEffect(() => {
        axios.get(`/api/viewclients`).then(res=>{
            
            if (res.data.status === 200) {
                
                setclients(res.data.clients)
            }
        });
        
    }, []);
    var html ="";
    console.log(clients)
    html = clients.map(item=>{
        return(<tr>
            <td>{item.name_client}</td>
            <td>{item.ville_client}</td>
        </tr>);
    });
     return (
        <div>
             <button class="btn  btn-inter btn-light w-100 border mb-1 position-relative" style={{ textAlign: "left" }} type="button" data-toggle="collapse" data-target="#detailsClient" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
             <FontAwesomeIcon className="px-2" icon={faPeopleLine}/> Clients
                        <span className="hour rounded-1 text-white bg-warning position-absolute end-0 me-2 pe-2 ps-2 " ><FontAwesomeIcon icon={faHashtag} /> {clients.length}</span>
                                
                </button>
                <div class="collapse navbar-collapse  " id="detailsClient">
                    <table className="table">
                        <thead>
                            <tr>
                                <td>Clients</td>
                                <td>Ville</td>
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
export default NumberOfClient;