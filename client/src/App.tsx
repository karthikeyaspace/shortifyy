import React from 'react';
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import RedirectHandler from './components/RedirectHandler';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    // <div className='w-screen h-screen flex flex-col'>
    //   <Toaster />
    //   <Router>
    //     <Navbar />
    //     <Routes>
    //       <Route path='/' element={<Home />} />
    //       <Route path='/:alias' element={<RedirectHandler />} /> 
    //     </Routes>
    //   </Router>
    // </div>
    <div>
      app under service! sorry for the inconvenience
      <br />
      meanwhile, you can check my other projs at 
      <a href="https://kv3.vercel.app">link</a>

    </div>
  );
}

export default App;
