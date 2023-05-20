import React from "react";
import { Link } from "react-router-dom";

const Footer2 = () => {

    return (
        <footer class="py-4 card shadow bg-white  mt-auto fixed-bottom" >
                    <div class="container-fluid px-4">
                        <div class="d-flex align-items-center justify-content-between small">
                            <div class="text-muted">Copyright &copy; GBIM PFE 2022</div>
                            <div>
                                <Link to="#">Privacy Policy</Link>
                                &middot;
                                <Link to="#">Terms &amp; Conditions</Link>
                            </div>
                        </div>
                    </div>
                </footer>
    );
}
export default Footer2;