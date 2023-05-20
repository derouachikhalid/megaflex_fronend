
import { faEye, faHashtag, faPersonCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";

import ChartDisplayIng from "./charts/ChartDisplayIng";


function NumberOfEngineers(){
    const [engineers, setengineers] = useState([]);
    
    useEffect(() => {
        axios.get(`/api/viewingenieurs`).then(res=>{
            
            if (res.data.status === 200) {
                
                setengineers(res.data.users)
            }
        });
        
    }, []);
    var html ="";
    
    html = engineers.map(item=>{
        return(<tr>
            <td>{item.name}</td>
            <td>{item.email}</td>
        </tr>);
    });
    
    
     return (
        <div>
        <button class="btn btn-inter btn-light w-100 border mb-1 position-relative" style={{ textAlign: "left" }} type="button" data-toggle="collapse" data-target="#detailsEng" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <FontAwesomeIcon className="px-2" icon={faPersonCircleCheck}/> Ingénieurs
                   <span className="hour rounded-1 text-white bg-warning position-absolute end-0 me-2 pe-2 ps-2 " ><FontAwesomeIcon icon={faHashtag} /> {engineers.length}</span>
                           
        </button>
        <div class="collapse navbar-collapse  " id="detailsEng">
            <div className="row">
                <div className="col-md-6">
                <table className="table">
                   <thead>
                       <tr>
                           <td>Ingénieur</td>
                           <td>Email</td>
                       </tr>
                   </thead>
                   <tbody>
                       {html}
                   </tbody>
               </table>
                </div>
                <div className="col-md-6">
                    <ChartDisplayIng/>

                </div>

            </div>
            <Link to="/admin/viewmachines"><button type="button"  className="btn btn-primary txt-white w-100 mb-1"  ><FontAwesomeIcon   icon={faEye} /> Afficher tous ingénieurs</button></Link>
               
               
        </div>
        

    </div>
     );
}
export default NumberOfEngineers;