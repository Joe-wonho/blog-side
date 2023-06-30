import React from 'react';
// import Footer from './components/Footer';
import MainPage from './pages/MainPage';
import Myblogpage from './pages/MyblogPage';
import PostPage from './pages/PostPage';
import WritePage from './pages/WritePage';
import SeriesPage from './pages/SeriesPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Mypage from './pages/Mypage';
import KaKaoLoginPage from './components/Login/KaKaoLogin';
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
              <Route path='/:nickname' element={<PostPage />}></Route>
              <Route path='/:nickname/series' element={<SeriesPage />}></Route>
              {/* <Route path='/:nickname/series' element={<Myblogpage />}></Route> */}
              <Route path='/login' element={<LoginPage />}></Route>
              <Route path='/signup' element={<SignupPage />}></Route>
              <Route path='/write' element={<WritePage />}></Route>
              <Route path='/mypage' element={<Mypage />}></Route>
              <Route path='/oauth/callback/kakao' element={<KaKaoLoginPage />} />
            </Routes>
          </BrowserRouter>
        </RecoilRoot>
      </CookiesProvider>
    </>
  );
};

export default App;
