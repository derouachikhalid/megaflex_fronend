import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"



function ViewInterventiononly(props) {
    const [intervention, setintervention] = useState({});
    const [loading, setLoading] = useState(true);
    const code_inter = props.match.params.code;
    console.log(code_inter)
    
    useEffect(() => {
        axios.get(`/api/viewintervention/${code_inter}`).then(res => {
            console.log(res)
            if (res.data.status === 200) {
                setintervention(res.data.intervention);

            }
            setLoading(false);
        });

    }, []);
    
    var html = "";
    if (loading) {
        html = <div className="position-absolute top-50 start-50 translate-middle">
                <div className="spinner-border text-success " role="status">
                  <span class="sr-only"></span>
                </div>
               </div>
    } else{
        html =intervention.pieces.map(index=>{
            return (<tr key={index.SN}>
                <td className="col">{index.SN}</td>
                <td className="col">{index.designation}</td>
                <td ><div className="col d-none d-lg-block">{index.description}</div></td>
                <td className="col">{index.ref_machine}</td>
                
            </tr>
        ); });

    }



    return (
        <div>

            <div className="container-fluid py-5 ">
                <div className="row justify-content-center">
                    <div className="col-md ">
                        <div className="card shadow" style={{ height: "100%" }}>

                            <ul className="nav nav-tabs">
                                <li className="nav-item">
                                    <Link className="nav-link " aria-current="page" to="/admin/viewinterentions">Les interventions</Link>
                                </li>
                                <li className="nav-item pt-2">
                                /
                                </li>
                                

                                <li class="nav-item">
                                    <Link className="nav-link " aria-current="page" >{intervention.CODE_INTER}</Link>
                                </li>


                            </ul>

                            <div className="card-body">
                                <h3>Les pieces utilisées dans l'intervention:</h3>
                            <table className="table table-border rounded border table table-hover">
                                <thead>
                                    <tr>
                                        <td>#</td>
                                        <td>designation</td>
                                        <td  ><div className="d-none d-lg-block">description</div></td>
                                        <td>machine</td>
                                        
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
        </div>);
}

export default ViewInterventiononly;