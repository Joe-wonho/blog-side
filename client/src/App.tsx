import React from 'react';
// import Footer from './components/Footer';
import MainPage from './pages/MainPage';
import PostPage from './pages/PostPage';
import WritePage from './pages/WritePage';
import SeriesPage from './pages/SeriesPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Mypage from './pages/Mypage';
import DetailPage from './pages/DetailPage';
import NotFoundPage from './pages/NotFoundPage';
import SeriesDetailPage from './pages/SeriesDetailPage';
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
              <Route path='/' element={<MainPage />}></Route>
              <Route path='/:nickname' element={<PostPage />}></Route>
              <Route path='/:nickname/series' element={<SeriesPage />}></Route>
              <Route path='/:nickname/series/:seriesName' element={<SeriesDetailPage />}></Route>
              <Route path='/:nickname/:postId' element={<DetailPage />}></Route>
              <Route path='/login' element={<LoginPage />}></Route>
              <Route path='/signup' element={<SignupPage />}></Route>
              <Route path='/write' element={<WritePage />}></Route>
              <Route path='/write/:postId' element={<WritePage />}></Route>
              <Route path='/mypage' element={<Mypage />}></Route>
              <Route path='/oauth/callback/kakao' element={<KaKaoLoginPage />} />
              <Route path='/*' element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </RecoilRoot>
      </CookiesProvider>
    </>
  );
};

export default App;
