
import { faEye, faEyeSlash, faHashtag, faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";


function NumberOfInterventin(){
    
    const [interventions,setinterventions] = useState([]);
    
    useEffect(() => {
        axios.get(`/api/viewinterventions`).then(res => {
            
            if (res.data.status === 200) {
                
                setinterventions(res.data.interventions)
            }
        });
        
    }, []);
    var html ="";
    console.log(interventions)
    var counter=0;
    html = interventions.map(item=>{
        
        
        counter++;
        if(counter <= 10){
            return(<tr>
                <td>{item.CODE_INTER}</td>
                <td>{item.machine.name_machine}</td>
                <td>{item.date}</td>
            </tr>);
        }
       
    });
    
     return (
        <div>
             <button class="btn btn-inter btn-light w-100 border mb-1 position-relative" style={{ textAlign: "left" }} type="button" data-toggle="collapse" data-target="#detailsInter" aria-controls="navbarNavDropdown" aria-expanded="true" aria-label="Toggle navigation">
             <FontAwesomeIcon className="px-2" icon={faScrewdriverWrench}/> Intervention
                        <span className="hour rounded-1 text-white bg-warning position-absolute end-0 me-2 pe-2 ps-2 " ><FontAwesomeIcon icon={faHashtag} /> {interventions.length}</span>
                                
             </button>
             <div class="collapse navbar-collapse  " id="detailsInter">
                    <table className="table">
                        <thead>
                            <tr>
                                <td>Intervention</td>
                                <td>machine</td>
                                <td>Date</td>
                            </tr>
                        </thead>
                        <tbody>
                            {html}
                        </tbody>
                    </table>
                    <Link to="/admin/viewinterentions"><button type="button"  className="btn btn-primary txt-white w-100 mb-1"  ><FontAwesomeIcon   icon={faEye} /> Afficher tous les interventions</button></Link>

                    
             </div>
             

         </div>
     );
}
export default NumberOfInterventin;