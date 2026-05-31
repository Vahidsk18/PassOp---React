import { useState } from 'react'
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import ShowTable from './components/ShowTable'
import Home from './components/Home';
import NotFound from './components/NotFound';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)


  return (
    <>
      <ToastContainer />

      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/manager' element={<Manager />} />
        <Route path='*' element={<NotFound />} />
      </Routes>

    </>
  )
}

export default App
