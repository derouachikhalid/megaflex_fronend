import Dashboard from '../../layouts/frontend/Dashboard'
import ViewClients from '../../layouts/frontend/clients/ViewClients'
import AddClients from '../../layouts/frontend/clients/AddClients'

import AddFournisseurs from '../../layouts/frontend/fournisseurs/AddFournisseurs'
import ViewFournisseurs from '../../layouts/frontend/fournisseurs/ViewFournisseurs'

import EditFournisseurs from '../../layouts/frontend/fournisseurs/EditFournisseurs'
import ViewMachines from '../../layouts/frontend/machines/ViewMachines'
import AddMachine from '../../layouts/frontend/machines/AddMachine'
import EditMachine from '../../layouts/frontend/machines/EditMachine'
import AddPiece from '../../layouts/frontend/pieces/AddPiece'
import ViewPieces from '../../layouts/frontend/pieces/ViewPiece'
import EditPiece from '../../layouts/frontend/pieces/EditPiece'
import EditClients from '../../layouts/frontend/clients/EditClient'
import Register from '../../layouts/frontend/Register'
import ViewIntervention from '../../layouts/frontend/interventions/ViewInterventions'
import AddIntervention from '../../layouts/frontend/interventions/AddIntervention'
import ViewInterventiononly from '../../layouts/frontend/interventions/ViewIntervention'
import ChartDisplay from '../../layouts/frontend/Dashboard/charts/ChartDisplay'
import ViewMachine from '../../layouts/frontend/machines/ViewMachine'
import EditIntervention from '../../layouts/frontend/interventions/EditIntervention'



const routes = [
    { path : "/admin" , exact : true , name :"Admin"},
    { path : "/admin/dashboard" , exact : true , name :"Dashboard", component : Dashboard},
    { path : "/admin/dashboard/chartdisplay" , exact : true , name :"Dashboard", component : ChartDisplay},
    { path : "/admin/viewmachines" , exact : true , name :"Machines", component : ViewMachines},
    { path : "/admin/viewmachine/:ref" , exact : true , name :"Machines", component : ViewMachine},
    
    { path : "/admin/addmachines" , exact : true , name :"Machines", component : AddMachine},
    { path : "/admin/editmachines/:ref" , exact : true , name :"Machines", component : EditMachine},
    { path : "/admin/addfournisseurs" , exact : true , name :"Fournisseurs", component : AddFournisseurs},
    { path : "/admin/viewfournisseurs" , exact : true , name :"Fournisseurs", component : ViewFournisseurs},
    { path : "/admin/addpiece" , exact : true , name :"pieces", component : AddPiece},
    { path : "/admin/editpiece/:sn" , exact : true , name :"pieces", component : EditPiece},
    { path : "/admin/viewpieces" , exact : true , name :"pieces", component : ViewPieces},
    { path : "/admin/editfournisseurs/:id" , exact : true , name :"Fournisseurs", component : EditFournisseurs},
    
    { path : "/admin/viewclients" , exact : true , name :"Clients", component : ViewClients},
    { path : "/admin/addclients" , exact : true , name :"Clients", component : AddClients},
    { path : "/admin/editclients/:id" , exact : true , name :"Clients", component : EditClients},
    { path : "/admin/register" , exact : true , name :"register", component : Register},
    { path : "/admin/viewinterentions" , exact : true , name :"Interentions", component : ViewIntervention},
    { path : "/admin/addinterentions" , exact : true , name :"Interentions", component : AddIntervention},
    { path : "/admin/editinterention/:ref" , exact : true , name :"Interentions", component : EditIntervention},
    { path : "/admin/viewinterention/:code" , exact : true , name :"Interentions", component : ViewInterventiononly},
];

export default routes;