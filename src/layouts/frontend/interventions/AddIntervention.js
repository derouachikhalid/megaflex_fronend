import axios from "axios";
import React,{useEffect, useState} from "react";
import {Link} from "react-router-dom"
import { useHistory } from "react-router-dom";
import swal from "sweetalert";



function AddIntervention(props){
    const [ingenieurs, setIngenieurs] = useState([]);
    const [machines, setmachines] = useState([]);
    const [pieces, setpieces] = useState([]);
    const [interventions, setinterventions] = useState({
        code : '',
        raison:'',
        date:'',
        duree:'',
        ingenieur:'',
        machine:'',
        actions:'',
        type:'',
        pieces:[],
        errors_list :{}
    });
    const history = useHistory();

    

    useEffect(() => {
        axios.get(`api/viewmachines`).then(res=>{
            if(res.data.status === 200){
                setmachines(res.data.machines);
                
            }
        })
        axios.get(`api/viewpieces`).then(res=>{
            if(res.data.status === 200){
                setpieces(res.data.pieces);
                
            }
            
        })
        axios.get(`api/viewusers`).then(res=>{
            if(res.data.status === 200){
                console.log(res.data.users)
                setIngenieurs(res.data.users);
                
            }
            
        })
        
    }, []);

    const machineOP = machines.map((index)=>{
        return (<option value={index.ref_machine}>{index.name_machine}{" : ("+index.ref_machine+")"}</option>);
        
    })
    const pieceOP = pieces.map((index)=>{
        return (<option value={index.SN}>{index.designation}</option>);
        
    })
    
    const ingenOP = ingenieurs.map((index)=>{
        return (<option value={index.id}>{index.name} {" : ("+index.abreviation+")"}</option>);
        
    })




    const handleSubmit = (e) =>{
        e.preventDefault()
        axios.post(`api/addintervention`,interventions).then(res=>{
            console.log(res)
            if(res.data.status === 200)
                {
                    swal("ENREGISTER","L'intervention est ajouté");
                    history.push('/admin/viewinterentions');
                }else if(res.data.status === 201){
                    setinterventions({
                        ...interventions,errors_list : res.data.valdator_errors
                    });
                }else {
                    swal("PROBLEME",'Un autre probleme');
                    
                }
        })
        console.log(interventions.errors_list)

    }
    const handleselect = (e) =>{
        e.persist();
        let value = Array.from(e.target.selectedOptions, option => option.value);
        
        setinterventions({
            ...interventions,pieces : value
        })
    }
    const handleInput = (e) =>{
        e.persist();
        
        
        setinterventions({
            ...interventions,[e.target.name ]:e.target.value})

    }
    return (
        <div>
            
            <div className="container py-5 ">
                <div className="row justify-content-center">
                    <div className="col-md ">
                        <div className="card shadow" style={{height : "100%"}}>
                            
                                <ul className="nav nav-tabs">
                                <li class=" nav-item">
                                {props.match.url==="/admin/addinterentions"?
                                      <Link className="nav-inactive nav-link " aria-current="page" to="/admin/viewinterentions">les interventions</Link>
                                                         :
                                      <Link className="nav-inactive nav-link " aria-current="page" to="/user/viewinterventions">les interventions</Link>
                                    }
                                        
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="#">Ajouter une intervention</Link>
                                    </li>
                                    
                                    
                                    
                                </ul>
                            <div className="w-100 pt-2 h-75">
                                <form onSubmit={handleSubmit} className="row g-3 m-3" style={{paddingBottom : "100px"}} >
                                <div className="col-md-6">
                                <div className="input-group col-md-4 ">
                                        <span className="input-group-text  " style={{width : "100px"}}  id="inputGroup-sizing-default"> CODE  </span>
                                        <input type="text" className="form-control " name="code" onChange={handleInput} value={interventions.code}   aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/><br/>
                                        
                                    </div>
                                    <div className="err-mess">{interventions.errors_list.code}</div>
                                    </div>
                                    <div className="col-md-6">
                                    <div className="input-group col-md-4 ">
                                        <span className="input-group-text  " style={{width : "100px"}}  id="inputGroup-sizing-default"> Raison  </span>
                                        <input type="text" className="form-control " name="raison" onChange={handleInput} value={interventions.raison}  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/><br/>
                                        
                                    </div>
                                    <div className="err-mess">{interventions.errors_list.raison}</div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-group col-md-4 ">
                                                    <span className="input-group-text  " style={{ width: "100px" }} id="inputGroup-sizing-default"> Type  </span>
                                                    <select type="text" className="form-control select-add" name="type" onChange={handleInput} value={interventions.type} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"><br/>
                                                        <option value="default">choisir le type</option>
                                                        <option value="applicative">Applicative</option>
                                                        <option value="technique">Technique</option>
                                                    </select>
                                                    <br/>
                                                    
                                                </div>
                                                <div className="err-mess">{interventions.errors_list.type}</div>
                                        </div>


                                    
                                    
                                    
                                    <div className="col-md-6">
                                    <div className="input-group col-md-4 ">
                                        <span className="input-group-text  " style={{width : "100px"}}  id="inputGroup-sizing-default"> Date  </span>
                                        <input type="date" className="form-control " name="date" onChange={handleInput} value={interventions.date}   aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/><br/>
                                        
                                    </div>
                                    <div className="err-mess">{interventions.errors_list.date}</div>
                                    </div>

                                    <div className="col-md-6">
                                    <div className="input-group col-md-4 ">
                                        <span className="input-group-text  " style={{width : "100px"}}   id="inputGroup-sizing-default"> Durée  </span>
                                        <input type="number" className="form-control " name="duree" onChange={handleInput} value={interventions.duree}   aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/><br/>
                                        
                                    </div>
                                    <div className="err-mess">{interventions.errors_list.duree}</div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label   className="form-label" >Actions</label>
                                            <textarea typeof="textarea" className="form-control" name="actions" onChange={handleInput} value={interventions.actions}  id="exampleFormControlTextarea1" rows="3"></textarea>
                                            
                                        </div>
                                        <div className="err-mess">{interventions.errors_list.actions}</div>
                                    </div>



                                    
                                    <div className="col-md-6">
                                        
                                            
                                                <div className="input-group col-md-4 mb-4">
                                                    <span className="input-group-text  " style={{ width: "100px" }} id="inputGroup-sizing-default"> Ingénieur  </span>
                                                    <select type="text" className="form-control select-add " name="ingenieur" onChange={handleInput} value={interventions.ingenieur} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                                                        <option value="default">choisir un ingénieur</option>
                                                        {ingenOP}


                                                    </select><br/>
                                                   
                                                </div>
                                                <div className="err-mess">{interventions.errors_list.ingenieur}</div>
                                            
                                            
                                                <div className="input-group col-md-4 mb-4">
                                                    <span className="input-group-text  " style={{ width: "100px" }} id="inputGroup-sizing-default"> Machine  </span>
                                                    <select type="text" className="form-control select-add " name="machine" onChange={handleInput} value={interventions.machine} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                                                        <option value="default">choisir une machine</option>
                                                        {machineOP}


                                                    </select><br/>
                                                    
                                                </div>
                                                <div className="err-mess">{interventions.errors_list.machine}</div>
                                            
                                        
                                    </div>
                                    <div className="col-md-6">
                                    <div className="input-group col-md-4 ">
                                        <span className="input-group-text  " style={{width : "100px"}}  id="inputGroup-sizing-default"> Pieces de<br/> rechange  </span>
                                        <select type="text" className="form-control select-add" name="pieces[]" onChange={handleselect}  value={interventions.pieces}  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" multiple>
                                            <option value="default">choisir des pieces</option>
                                            {pieceOP}
                                            
                                        </select><br/>
                                        
                                    </div>
                                    <div className="err-mess">{interventions.errors_list.code}</div>
                                    </div>
                                    
                                    
                                    
                                    
                                    <div className="form-group md-3">
                                        <button className="btn btn-outline-success btn-lg btn-block w-100 p-3 rounded-3">Ajouter l'intervention</button>
                                    </div>
                                    
                                    
                                    
                                </form>


                            </div>

                             
                            <div className="card-body">
                                


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
}

export default AddIntervention;