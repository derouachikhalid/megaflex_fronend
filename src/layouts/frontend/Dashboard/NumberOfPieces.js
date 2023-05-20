
import { faArrowRightArrowLeft, faHashtag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React,{useState,useEffect} from "react";


function NumberOfPieces(){
    
    const [pieces, setpieces] = useState([]);
    const [loadingstate, setLoadingstate] = useState(false);
    
    useEffect(() => {
        axios.get(`/api/viewpieces`).then(res => {
            
            if (res.data.status === 200) {
                
                setpieces(res.data.pieces)
            }
            setLoadingstate(true)
        });
        
    }, []);
    var html ="";
    console.log(pieces)
    
    if(loadingstate){html = pieces.map(item=>{
        return(<tr>
            <td>{item.designation}</td>
            <td>{item.machine.name_machine}</td>
        </tr>);
    });}

    
     return (
        <div>
             <button class="btn btn-inter btn-light w-100 border mb-1 position-relative" style={{ textAlign: "left" }} type="button" data-toggle="collapse" data-target="#detailsPieces" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
             <FontAwesomeIcon className="px-2" icon={faArrowRightArrowLeft}/> Pieces
                        <span className="hour rounded-1 text-white bg-warning position-absolute end-0 me-2 pe-2 ps-2 " ><FontAwesomeIcon icon={faHashtag} /> {pieces.length}</span>
                                
             </button>
             <div class="collapse navbar-collapse  " id="detailsPieces">
                    <table className="table">
                        <thead>
                            <tr>
                                <td>Piece</td>
                                <td>machine</td>
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
export default NumberOfPieces;