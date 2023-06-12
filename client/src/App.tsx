import React from 'react';
// import Footer from './components/Footer';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
//1024px기준
const App: React.FC = () => {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<MainPage />}></Route>
            <Route path='/login' element={<LoginPage />}></Route>
            <Route path='/signup' element={<SignupPage />}></Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
};

export default App;
