import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import LeanrHook from './LeanrHook.js';
import QuanLyDanhMuc from './QuanLyDanhMuc.js';
import QuanLyOder from './QuanLyOder.js';
import QuanLySanPham from './QuanLySanPham.js';







export default function HomeAdmin(props) {
  const history = useHistory();
  const {user , setUser ,openDialog}  = props;
  ;

      if(user.status){
        
      }else{
        openDialog('bạn cần đăng nhập trước');
       history.push('/admin/login');
      }
  
  
  return (
    <Router>
    <div>
    <LeanrHook></LeanrHook>
      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        
        <Route path="/admin/oder">
          <QuanLyOder openDialog={openDialog}/>
        </Route>
        <Route path="/admin/sanPham">
          <QuanLySanPham openDialog={openDialog}/>
        </Route>
        <Route path="/admin" >
          <QuanLyDanhMuc openDialog={openDialog}/>
        </Route>
      </Switch>
    </div>
  </Router>
  );
}
