import React from "react";
import {Link} from "react-router-dom"
import "../frontend/css/machine.css"
import NumberOfClient from "./Dashboard/NumberOfClient";
import NumberOfEngineers from "./Dashboard/NumberOfEngineers";
import NumberOfFournissor from "./Dashboard/NumberOfFournissor";
import NumberOfInterventin from "./Dashboard/NumberOfinterventions";
import NumberOfMachine from "./Dashboard/NumberOfMachine";
import NumberOfPieces from "./Dashboard/NumberOfPieces";





function Dasboard(){
    
    return (
        <div>

            <div className="container py-5 ">
                <div className="row justify-content-center">
                    <div className="col-md ">
                        <div className="card shadow" style={{ height: "100%" }}>

                            <ul class="nav nav-tabs">
                                <li class="nav-item">
                                    <Link class="nav-link active" aria-current="page" to="#">Tableau de bord</Link>
                                </li>
                                

                            </ul>
                            <div className="card-body">
                                <div class="content-wrapper">
                                    <div class="">
                                    
                                        <div class="row">
                                        


                                            
                                                <NumberOfMachine/>
                                            

                                            
                                                <NumberOfClient/>
                                            

                                            
                                                <NumberOfFournissor/>
                                            
                                            
                                                <NumberOfInterventin/>
                                            
                                            
                                               
                                            
                                            
                                                <NumberOfEngineers/>
                                            

                                        </div>
                                        
                                        

                                    </div>



                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default Dasboard;