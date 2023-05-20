
import {  faEye, faHardDrive, faHashtag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import ChartDisplayMach from "./charts/ChartDisplay";


function NumberOfMachine(){
    
    
    const [machine, setmachines] = useState([]);
    
    useEffect(() => {
        axios.get(`/api/viewmachines`).then(res => {
            
            if (res.data.status === 200) {
                
                setmachines(res.data.machines)
            }
        });
        axios.get(`/api/viewmachines`).then(res => {
            
            if (res.data.status === 200) {
                
                setmachines(res.data.machines)
            }
        });
        
        
    }, []);
    var html ="";
    console.log(machine)
    html = machine.map(item=>{
        return(<tr>
            <td>{item.name_machine}</td>
            <td>{item.date_entree}</td>
        </tr>);
    });
    
     return (
         <div>
             <button class="btn btn-inter btn-inter btn-light w-100 border mb-1 position-relative" style={{ textAlign: "left" }} type="button" data-toggle="collapse" data-target="#detailsMachine" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
             <FontAwesomeIcon className="px-2" icon={faHardDrive}/> Machines
                        <span className="hour rounded-1 text-white bg-warning position-absolute end-0 me-2 pe-2 ps-2 " ><FontAwesomeIcon icon={faHashtag} /> {machine.length}</span>
                                
             </button>
             <div class=" collapse navbar-collapse   "  id="detailsMachine">
             <div class="row">
             
                 <div className="col-md-12">
                 <table className="table">
                        <thead>
                            <tr>
                                <th>Machine</th>
                                <th>Date d'entrée</th>
                            </tr>
                        </thead>
                        <tbody>
                            {html}
                        </tbody>
                    </table>
                 </div>
                 <div className="col-md-6">
                 <ChartDisplayMach   />
                 </div>
                 </div>
                 <Link to="/admin/viewmachines"><button type="button"  className="btn btn-primary txt-white w-100 mb-1"  ><FontAwesomeIcon   icon={faEye} /> Afficher tous les machines</button></Link>
                 
                 
                 
                    

                
             </div>
             

         </div>
     );
}
export default NumberOfMachine;