import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router/AppRouter'
import { observer } from "mobx-react-lite";
import { Context } from ".";
import { check } from "./http/userApi";
import { getUserSub } from "./http/subApi";

const App =  observer(() =>  {

  const {user} = useContext(Context);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    check().then(data => {
      user.setUser(data);
      user.setIsAuth(true);
      getUserSub(data.id).then(res => {
        if(res && res.data) {
          user.setIsSubscribe(true)
        } else {
          user.setIsSubscribe(false)
        }
      })
    }).catch(e => {
      user.setUser(false);
      user.setIsAuth(false);
      user.setIsSubscribe(false)}).finally(()=>{ setLoading(false) })
  },[])
  if (loading) {
    return <div>загрузка</div>;
  }

  return (
   <BrowserRouter>
      <AppRouter />
   </BrowserRouter>
  );
}, [])

export default App;
