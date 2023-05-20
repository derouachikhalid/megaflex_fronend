
import axios from "axios";
import React, {useState , useEffect} from "react";
import { Route , Redirect } from "react-router-dom";

import { useHistory } from "react-router-dom";
import MasterLayout2 from "../layouts/user/MasterLayout2";



function  UserProtectedRoute(...rest){
    const history = new useHistory();
    
    const [authentificated, setauthentificated] = useState(false);
    const [loading, setloading] = useState(true);
    useEffect( ()  =>  {
        axios.get(`/api/checkUseringAuth`).then(
            res=>{
                if(res.status === 200){
                    setauthentificated(true)
                    console.log(res)
                }
                setloading(false);
                
            }
        )
        
        return () => {
            setauthentificated(false)
        };
    }, []);
    axios.interceptors.response.use(undefined,function axiosRetryInterceptors(err){
        if(err.response.status === 401)
        {
            <Redirect to="/login"/>
        }
        return Promise.reject(err);
    });
    axios.interceptors.response.use(
        function (response){
            return response;
        },function (error){
            if(error.response.status=== 404){
                console.log("page 404");
                history.push("/user");
            }
        }
    );
    if(loading){

        return (
            <div className="position-absolute top-50 start-50 translate-middle">
                <div className="spinner-border text-success " role="status">
                    <span class="sr-only"></span>
                </div>
            </div>);
        
    }
    
    

      
        return  (
            <Route {...rest}
                render={({props,location}) =>
                authentificated ?
            (<MasterLayout2 authentificated {...props}/>) :
            (<Redirect to={{pathname: "/login", state :{from:location}}} />)
        }
        />);
}
export default UserProtectedRoute;