import './App.css';
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';//nhớ (npm i react-router-dom)
import DefaultLayout from './containers/DefaultLayout';
import Login from './pages/Login';
import  LoadingBar  from 'react-redux-loading-bar';

function App() {
  return (
    <>

      <div className='position-absolute w-100'
          style={{ zIndex:100 }}>
          <LoadingBar updateTime={100}
            className="bg-danger"  style={{height:"2px"}}/>
      </div>

      {/* b4. gọi defaultlayout qua để điều hướng */}
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/*' element={<DefaultLayout/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
