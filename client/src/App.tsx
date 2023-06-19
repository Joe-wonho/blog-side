import React from 'react';
// import Footer from './components/Footer';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Mypage from './pages/Mypage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { CookiesProvider } from 'react-cookie';

//1024px기준
const App: React.FC = () => {
  return (
    <>
      <CookiesProvider>
        <RecoilRoot>
          <BrowserRouter>
            <Routes>
              <Route path='/main' element={<MainPage />}></Route>
              <Route path='/login' element={<LoginPage />}></Route>
              <Route path='/signup' element={<SignupPage />}></Route>
              <Route path='/mypage' element={<Mypage />}></Route>
            </Routes>
          </BrowserRouter>
        </RecoilRoot>
      </CookiesProvider>
    </>
  );
};

export default App;
