
import ViewIntervention from "../../layouts/frontend/interventions/ViewInterventions";
import ViewMachine from "../../layouts/frontend/machines/ViewMachine";
import ViewMachines from "../../layouts/frontend/machines/ViewMachines";
import AddIntervention from "../../layouts/frontend/interventions/AddIntervention"
import EditIntervention from "../../layouts/frontend/interventions/EditIntervention";


const routes = [
    { path : "/user/viewinterventions" , exact : true , name :"user"},
    { path : "/user/viewmachines" , exact : true , name :"Dashboard", component : ViewMachines},
    { path : "/user/viewinterventions" , exact : true , name :"Dashboard", component : ViewIntervention},
    { path : "/user/viewpieces" , exact : true , name :"Machines", component : ViewIntervention},
    { path : "/user/viewmachine/:ref" , exact : true , name :"Machines", component : ViewMachine},
    { path : "/user/editinterention/:ref" , exact : true , name :"Interentions", component : EditIntervention},
    { path : "/user/addinterentions" , exact : true , name :"Interentions", component : AddIntervention},
    { path : "/user/viewmachine/:ref" , exact : true , name :"Machines", component : ViewMachine},
    
   
];

export default routes;