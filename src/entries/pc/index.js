import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { Switch } from 'react-router';
import BasicLayout from './layout/BasicLayout'
import List from './pages/list'
import Login from './pages/login'
import Register from './pages/register'
import Home from './pages/home'
import Usercenter from './pages/usercenter'
import Detail from './pages/detail'
import Updatepwd from './pages/updatepwd'
import Create from './pages/create'
import Car from './pages/car'

function App() {
  return (
    <HashRouter>
      <Switch>
        <BasicLayout>
          <Route path="/" component={Home} exact/>
          <Route path="/list" component={List} />
          <Route path="/login" component={Login} />
          <Route path="/updatepwd" component={Updatepwd} />
          <Route path="/register" component={Register} />
          <Route path="/usercenter" component={Usercenter} />
          <Route path="/create/:id" component={Create} />
          <Route path="/create" component={Create} />
          <Route path="/car" component={Car} />
          <Route path="/detail/:id" component={Detail} />
        </BasicLayout>
      </Switch>
    </HashRouter>
  );
}

export default App;
