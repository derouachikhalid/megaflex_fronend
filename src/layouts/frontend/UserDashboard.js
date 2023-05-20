import React from "react";

import Navbar from "./Navbar"
function UserDashbord(){
    
    return (
        <div>
            <Navbar/>
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6 rounded-3">
                        <div className="card shadow ">
                            <div className="card-header bg-primary">
                                <h1 className="text-center fw-bold text-white">User</h1>

                            </div>
                            <div className="card-body">
                                


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default UserDashbord;