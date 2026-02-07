import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'photoswipe/dist/photoswipe.css';
import './App.css';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Outlet } from 'react-router';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ToastContainer />
    </>
  );
};

export default App;
