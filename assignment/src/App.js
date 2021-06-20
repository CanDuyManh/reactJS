import React, { useState } from 'react';
import clsx from 'clsx';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import HomeAdmin from './admin/HomeAdmin.js';
import Blog from './TrangChu/Blog.js';
import LoginPage from './Login/LoginPage.js';
import SimpleDialog from './componentCommon/SimpleDialog.js';



export default function App() {
  var history = useHistory();
  const [user,setUser] = useState({name:'',acc:'',pass:'',status:false,});
  const [open, setOpen] = useState(false);
  const [messengerDialog , setMessengerDialog ] = useState('');

    const openDialog = (mess)=>{
      setOpen(true);
      setMessengerDialog(mess);
    }
  return (
    <Router>
     

      <Switch>
        <Route path="/login">
          <LoginPage user={user} setUser={setUser} url='/' openDialog={openDialog}></LoginPage>
        </Route>
        <Route path="/admin/login">
          <LoginPage user={user} setUser={setUser} url='/admin' openDialog={openDialog}></LoginPage>
        </Route>
        <Route path="/admin">
          <HomeAdmin user={user} setUser={setUser} openDialog={openDialog}></HomeAdmin>
        </Route>
        <Route path="/">
        <Blog user={user} setUser={setUser} openDialog={openDialog}></Blog>
        </Route>
      </Switch>
      <div style={{ textAlign :"right", }}>
      <Link to='/admin' style={{ textDecoration: 'none' , color : 'black' ,marginRight:20 }}>admin</Link>
      <Link to='/login' style={{ textDecoration: 'none' , color : 'black' ,marginRight:20 }}>login</Link>
      <Link to='/trangtru' style={{ textDecoration: 'none' , color : 'black' ,marginRight:20 }}>trangtru</Link>
      </div>
      <SimpleDialog open={open} setOpen={setOpen} messengerDialog={messengerDialog}></SimpleDialog>
  </Router>
  
   
  );
}
