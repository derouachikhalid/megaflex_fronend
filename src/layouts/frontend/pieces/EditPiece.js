import "../css/machines.css"
import axios from "axios";
import React,{useEffect, useState} from "react";
import {Link} from "react-router-dom"



function EditPiece(props){
    const [piece, setpiece] = useState({
        SN : '',
        designation:'',
        description:'',
        ref_machine:''
    });
    const [machines, setmachines] = useState([]);
    const SN = props.match.params.sn;
    useEffect(() => {
        axios.get(`/api/viewmachines`).then(res => {
            console.log(res)
            if (res.data.status === 200) {
                setmachines(res.data.machines);

            }
        
            
        });
        axios.get(`/api/selectpiece/${SN}`).then(res => {
            console.log(res)
            if (res.data.status === 200) {
                setpiece(res.data.piece);
            }
        
            
        });
        
    }, []);
    
    var machineOP = machines.map((index)=>{
        return (
            <option value={index.ref_machine}>{index.name_machine}</option>
        )
    })
    
    const handleInput = (e) => {
        e.persist();
        setpiece({
            ...piece,[e.target.name ]:e.target.value})
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        
        formData.append('SN',piece.SN);
        formData.append('designation',piece.designation);
        formData.append('description',piece.description);
        formData.append('ref_machine',piece.ref_machine);
        
        for (var value of formData.values()){
            console.log(value)
        }
        
        
        axios.post(`/api/editpiece/${SN}`,formData).then(res=>{
            console.log(res);

        });
        
    }
    return (
        <div>
            
            <div className="container py-5 ">
                <div className="row justify-content-center">
                    <div className="col-md ">
                        <div className="card shadow" style={{height : "100%"}}>
                            
                                <ul className="nav nav-tabs">
                                <li class="nav-item">
                                        <Link className="nav-inactive nav-link " aria-current="page" to="/admin/viewpieces">Les pieces</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-inactive nav-link" aria-current="page" to="/admin/addpiece">Ajouter une piece</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="#">Modifier une piece</Link>
                                    </li>
                                    
                                    
                                    
                                </ul>
                            <div className="w-100 pt-2 h-75">
                                <form onSubmit={handleSubmit} className="row g-3 m-3" style={{paddingBottom : "100px"}} >
                                <div className="col-md-6">
                                <div className="input-group col-md-4 ">
                                        <span className="input-group-text  " style={{width : "150px"}}  id="inputGroup-sizing-default"> SN  </span>
                                        <input type="text" className="form-control " name="SN" onChange={handleInput} value={piece.SN}  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                                    </div>

                                    </div>
                                    <div className="col-md-6">
                                    <div className="input-group col-md-4 ">
                                        <span className="input-group-text  " style={{width : "100px"}}  id="inputGroup-sizing-default"> Designation  </span>
                                        <input type="text" className="form-control " name="designation" onChange={handleInput} value={piece.designation}  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                                    </div>
                                    </div>
                                    
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label   className="form-label" >Description</label>
                                            <textarea typeof="textarea" className="form-control" name="description" onChange={handleInput} value={piece.description}  id="exampleFormControlTextarea1" rows="3"></textarea>
                                        </div>
                                    </div>
                                    
                                    
                                    <div className="col-md-6">
                                    
                                    <div className="input-group col-md-4 ">
                                        <span className="input-group-text  " style={{width : "100px"}}   id="inputGroup-sizing-default"> Machine  </span>
                                        <select type="text" className="form-control select-add" name="ref_machine" onChange={handleInput} value={piece.ref_machine}  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                                        <option >choisir une machine</option>
                                          {machineOP}
                                            
                                        </select>
                                    </div>
                                    </div>
                                    <div className="form-group col-md-6"></div>
                                    
                                    <div className="form-group col-md-6">
                                        <button className="btn btn-outline-success btn-lg btn-block w-100 p-3 rounded-3">Modifier le fournisseur</button>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <Link to="/admin/viewpieces"  className="btn btn-outline-warning btn-lg btn-block w-100 p-3 rounded-3">Annuler</Link>
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

export default EditPiece;