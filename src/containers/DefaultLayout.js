import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Routers from '../router/Routers';
import Header from './Header';
import { useSelector } from 'react-redux';

//b2. tạo default
const DefaultLayout = (props) => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    return ( 
        <>
            {!isLoggedIn ? (
                <Navigate to="/login"/>
            ) : (
                <>
                    {/* đây là gọi từ file header qua để show navbar */}
                    <Header/>

                    {/* mảng routers map để chuyển từ mảng này sang mảng router khác  */}
                    <Routes>
                        {Routers.map((route, idx) => (
                        <Route key={idx} path={route.path} element={route.component}/>
                        ))}
                    </Routes>
                </>
            )}
        </>
    );
}
 
export default DefaultLayout;