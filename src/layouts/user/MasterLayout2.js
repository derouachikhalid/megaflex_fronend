import React from "react";
import Navbar2 from "./Navbar2"
import Sidebar2 from "./Sidebar2"
import Footer2 from "./footer2"
import '../../assets/admin/css/styles.css'
import '../../assets/admin/js/scripts'
import "jquery";
import { Switch ,Redirect , Route } from "react-router-dom";
import routes from "../../routes/user/routes";


const MasterLayout2 = () => {

    return (
        <div className="sb-nav-fixed">
            <Navbar2/>
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                
                <div ></div>
                    <Sidebar2/>
                </div>
                <div id="layoutSidenav_content" style={{top: '-47px'}} >
                
                    <main style={{marginTop:"77px",bottom : "90px"}}>
                    
                        <Switch>
                            {routes.map((route,idx) => {
                                return route.component && (
                                    <Route 
                                    key={idx}
                                    path={route.path}
                                    exact={route.exact}
                                    name={route.name}
                                    render={(props)=>(
                                        <route.component {...props}/>
                                    )}
                                    />
                                )
                            })

                        }
                            <Redirect from="/user" to="/user/viewmachines"/>
                        </Switch>
                       

                    </main>
                    <Footer2/>
                </div>
            </div>

        </div>
    );
}
export default MasterLayout2;