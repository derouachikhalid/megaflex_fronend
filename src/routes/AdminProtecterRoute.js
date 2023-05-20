
import axios from "axios";
import React, {useState , useEffect} from "react";
import { Route , Redirect } from "react-router-dom";
import MasterLayout from "../layouts/admin/MasterLayout";
import { useHistory } from "react-router-dom";



function  AdminProtectedRoute(...rest){
    const history = useHistory();
    const [authentificated, setauthentificated] = useState(false);
    const [loading, setloading] = useState(true);
    useEffect( ()  =>  {
        axios.get(`/api/checkingAuth`).then(
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
        if(err.response.status != 200)
        {
            <Redirect to="/login"/>
        }
        return Promise.reject(err);
    });
    axios.interceptors.response.use(
        function (response){
            return response;
        },function (error){
            if(error.response.status === 403){
                console.log("User interface");
                history.push("/user");
            }else if(error.response.status=== 404){
                console.log("page 404");
                //history.push("/user");
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
            (<MasterLayout authentificated {...props}/>) :
            (<Redirect to={{pathname: "/login", state :{from:location}}} />)
        }
        />);
}
export default AdminProtectedRoute;