

import { BrowserRouter as Router, Route , Switch } from 'react-router-dom';
import Login from './components/Login';

import About from './components/About';
import AdminProtectedRoute from './routes/AdminProtecterRoute';

import axios from 'axios';
import UserDashbord from './layouts/frontend/UserDashboard';
import { Redirect } from 'react-router-dom';
import Register from './layouts/frontend/Register';
import UserProtectedRoute from './routes/UserProtectedRoute';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = `http://localhost:8000`;
axios.defaults.headers.post['Content-Type']="Application/json"
axios.defaults.headers.post['Accept']="Application/json"
axios.interceptors.request.use(function (config){
  const token = localStorage.getItem("user_token");
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/*<Route path='/admin' name="Admin" render={(props)=> <MasterLayout {...props} />}/> */}
          <AdminProtectedRoute path='/admin' name="Admin"  />
          <UserProtectedRoute path='/user' name="User"  />
             
          
          <Route path='/login' >
            {localStorage.getItem("user_token")? <Redirect to='/admin'/>:<Login/>}
          </Route>
          {/*<Route path='/register' >
            {localStorage.getItem("user_token")? <Redirect to='/admin'/>:<Register/>}
          </Route>*/}
          <Route path='/about' component={About}/>
          

          
        </Switch>
      </Router>
      
    </div>
    
  );
}

export default App;
