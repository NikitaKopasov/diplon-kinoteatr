import React, { useContext } from "react";
import { Route, Routes} from 'react-router-dom';
import { authRoutes, publicRoutes } from "./routes"
import Auth from "../pages/Auth";
import { Context } from "..";
const AppRouter = () => {

    const {user} = useContext(Context);

    return(
        <Routes>
            {
               user.isAuth === true && authRoutes.map(({path, Component}) => <Route key={path} path={path} element={<Component/>}/>)
            }
            {
                publicRoutes.map(({path, Component}) => <Route key={path} path={path} element={<Component/>}/>)
            }
            <Route path="*" element={<Auth/>}/>
        </Routes>
    );
};

export default AppRouter;