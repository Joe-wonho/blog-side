import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// import Hello from './components/Hello';
// import Counter from './components/Counter';
// import MyForm from './components/MyForm';
//1024px기준
const App: React.FC = () => {
  //     console.log(`${name} says hello`);
  //   };

  //   const onSubmit = (form: { name: string; description: string }) => {
  //     console.log(form);
  //   };
  //   return (
  //     <>
  //       <Hello name="First" onClick={onClick}></Hello>
  //       <hr />
  //       <h1>카운터 예제</h1>
  //       <Counter />
  //       <hr />

  //       <h1>Form 예제</h1>
  //       <MyForm onSubmit={onSubmit}></MyForm>
  //     </>
  //   );}
  return (
    <>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path='/' element={<MainPage />}></Route>
          <Route path='/login' element={<LoginPage />}></Route>
        </Routes>
      </BrowserRouter>
      <Footer></Footer>
    </>
  );
};

export default App;
