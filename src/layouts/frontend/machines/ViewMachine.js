import "../css/machine.css"
import { faAngleRight, faArrowsDownToLine, faClock, faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import Template from "../../../assets/admin/assets/img/fiche_technique.jpg"
import Template2 from "../../../assets/admin/assets/img/fiche_technique_2.jpg"




function ViewMachine(props) {
    const [loading, setLoading] = useState(true);
    const [machine, setMachine] = useState({});
    const [interventions, setInterventions] = useState({});
    const code_inter = props.match.params.ref;
    
    const pdfGenerate = () => {
         var page=1;
        

        console.log(interventions.length/4)
        var doc = new jsPDF("p","mm","a4",)
        doc.setFont("Times New Roman","normal")
        doc.setFontSize(12)
        doc.setTextColor("#0e3b65")
        doc.addImage(Template2,"jpg",0,0,210,297)
        doc.text(40,31,machine.date_entree,0)
        doc.text(104,31,machine.name_machine,0)
        doc.text(104,36,machine.ref_machine,0) 
        doc.text(104,41,machine.client.name_client,0)
        doc.text(178,31,machine.date_entree,0)
        doc.text(183,20.95,""+page,0)
        doc.text(24,67.5,machine.raison,0)
        doc.text(111,46.5,machine.accessoires_machine,{maxWidth : 104},0)
        doc.text(6,46.5,machine.description,{maxWidth : 104},0)

        
        
        var offsetx = 5;
        var offsety = 149;
        var index = 1;

        interventions.forEach(intervention => {
            doc.text(offsetx+4,offsety-8,intervention.date,90)
            doc.text(offsetx+14,offsety-14,intervention.user.abreviation,90)
            doc.text(offsetx+19,offsety-31.5,intervention.actions,{maxWidth : 98,renderingMode : "fill" ,},0)
            doc.text(offsetx+121,offsety-11,intervention.duree+" heures",90)
            var pieces = intervention.pieces;
            var offsety1 = offsety;
            pieces.forEach(piece => {
                doc.text(offsetx+127,offsety1-31,piece.SN,{maxWidth : 50,renderingMode : "fill" ,},0)
                doc.text(offsetx+164,offsety1-31,"1",{maxWidth : 60,renderingMode : "fill" ,},0)
                offsety1=offsety1 + 4
            })
            doc.text(offsetx+170,offsety-31,intervention.conclusion,{maxWidth : 50,renderingMode : "fill" ,},0)
            offsety=offsety+36.5;
            index++;
            if(index===5){
                
                doc.addPage();
                page++;
                doc.addImage(Template,"jpg",0,0,210,297)
                doc.text(40,32,machine.date_entree,0)
                doc.text(104,32,machine.name_machine,0)
                doc.text(104,37,machine.ref_machine,0) 
                doc.text(104,42,machine.client.name_client,0)
                doc.text(178,32,machine.date_entree,0)
                doc.text(183,20.5,""+page,0)
                 index = 0;
                 offsetx = 5;
                 offsety = 107;
            }
            
            

        });
        doc.save("Fiche_"+machine.name_machine+"_"+machine.ref_machine+".pdf")
    }
    useEffect(() => {
        axios.get(`/api/viewmachine/${code_inter}`).then(res=>{
            if(res.data.status === 200){
                console.log(res.data)
                setMachine(res.data.machine);
                setInterventions(res.data.intervetions);
                console.log(machine)

            }
            setLoading(false)
             
        })
        
        
    }, []);
    var Allinter="";
    if(!loading){
        console.log(interventions);
         Allinter = interventions.map((item)=>{
            return (
            <div key={item.CODE_INTER}>
                <button class="btn btn-inter btn-light w-100 border mb-1 position-relative" style={{ textAlign: "left",border : "solid 1px #1e9d9e !impotrant" }}  type="button" data-toggle="collapse" data-target={`#navbarNavDropdow${item.CODE_INTER}`} aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <FontAwesomeIcon icon={faAngleRight} /> { item.CODE_INTER}
                        <span className="hour rounded-1 text-white bg-warning position-absolute end-0 me-2 pe-2 ps-2 " ><FontAwesomeIcon icon={faClock} /> {item.duree}</span>
                                
                </button>
                <div class="collapse navbar-collapse  " id={`navbarNavDropdow${item.CODE_INTER}`}>
                    <ul class="navbar-nav m-3 ">
    
                       
                            <div className="container-fluid">
                                <table className="table  ">
                                    <tbody>
                                        <tr>
                                            <th > Ingénieur </th>
                                            <td > {item.user.name} </td>
                                        </tr>



                                        <tr>
                                            <th > Type </th>
                                            <td > {item.type} </td>

                                        </tr>
                                        <tr >
                                            <th > Raison </th>
                                            <td > {item.raison} </td>

                                        </tr>
                                    </tbody>
                                </table>
                      <div className="card m-0">
                          <div className="card-header text-center">
                              Les actions réalisées

                          </div>
                                    <div className="action card-body ">
                                        {item.actions.split("\n").map(function (item, idx) {
                                            return (
                                                <span key={idx}>
                                                    {item}
                                                    <br />
                                                </span>
                                            )
                                        })}

                                    </div>

                      </div>
                      <table className="table  ">
                                    <tbody>
                                        
                                        <tr>
                                            <th > Date </th>
                                            <td > {item.date} </td>

                                        </tr>
                                        
                                    </tbody>
                                </table>
                                
                                
                                
                            </div>
    
                    </ul>
                </div>
            </div>);
            
            
    
        })

    }
    

            
    var html =""

    if (loading) {
        html = <div className="position-absolute top-50 start-50 translate-middle">
                <div className="spinner-border text-success " role="status">
                  <span class="sr-only"></span>
                </div>
               </div>
    } else{
        html =<div className="mach_info"   >
            <div className="row p-2"  >
                  <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                      <div className="">
                      <img className="d-block  m-auto w-100 h-100"  src={`http://localhost:8000/${machine.image_machine}`} alt="" />
                      
                      </div>

                  </div>
                  <div className="col-lg-6 col-md-8 col-sm-12 col-12 mt-1 position-relative ">
                      <table className="table w-100 ">
                          <thead>
                          <tr className="header-row">
                            <th > SN </th>
                            <td > {machine.ref_machine} </td>
                          </tr>
                          </thead>
                          <tbody>
                          <tr >
                            <th > Nom </th>
                            <td > {machine.name_machine} </td>
                          </tr>

                          
                          
                          <tr>
                          <th > Discipline </th>
                          <td > {machine.discipline_machine} </td>

                          </tr>
                          <tr >
                          <th > Client </th>
                          <td > {machine.client.name_client} </td>

                          </tr>
                          <tr>
                          
                          </tr>
                          <tr>
                          <th > Date d'entrée </th>
                          <td > {machine.date_entree} </td>

                          </tr>
                          <tr>
                          <th > Accessoire </th>
                          <td className="text-break" > {machine.accessoires_machine} </td>

                          </tr>

                          </tbody>
                          
                          
                          
                          
                      </table>
                      <div className="position-absolute top-0 end-0  ">
                          <div className="bg-white p-2 m-2">
                          <div className="nmbr-inter d-lg-none rounded-circle m-2   m-auto  text-center " >
                           {interventions.length}
                       </div>
                          </div>
                          

                          </div>
                      


                  </div>
                  
                  <div className="col-lg-2   d-none d-lg-block">
                      <br/>
                       <h6 className="text-center">Nombre <br/>d'interventions</h6>
                       <div className="nmbr-inter rounded-circle m-auto  text-center " >
                           {interventions.length}
                       </div>
                  </div>
                  
              </div>
              <div>
              {Allinter}

              </div>
              <button className="btn btn-success" onClick={pdfGenerate} ><FontAwesomeIcon icon={faDownload}/>  Telecharger la fiche machine  <FontAwesomeIcon icon={faDownload}/></button>
              


            
              </div>

    }
    
    return (
      <div className="container-fluid  py-5 ">
          <div className="card shadow  " style={{border : "solid 1px #1e9d9e"}}>
              {html}
              
          </div>

      </div>
    );
}

export default ViewMachine;