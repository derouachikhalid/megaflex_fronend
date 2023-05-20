import React from "react";
import Navbar from "../../layouts/frontend/Navbar"
import Sidebar from "./Sidebar"
import Footer from "./footer"
import '../../assets/admin/css/styles.css'
import '../../assets/admin/js/scripts'
import "jquery";
import { Switch ,Redirect , Route } from "react-router-dom";
import routes from "../../routes/admin/routes";


const MasterLayout = () => {

    return (
        <div className="sb-nav-fixed">
            <Navbar/>
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                
                <div ></div>
                    <Sidebar/>
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
                            <Redirect from="/admin" to="/admin/dashboard"/>
                        </Switch>

                    </main>
                    <Footer/>
                </div>
            </div>

        </div>
    );
}
export default MasterLayout;