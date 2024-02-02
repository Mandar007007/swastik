import { useEffect } from 'react'
import Index from './Components/Home/Index'
import './index.css'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { initFlowbite } from 'flowbite'
import Signup from './Components/Registration/Signup'
import OtpPage from './Components/Registration/OtpPage'
import Signin from './Components/Registration/Signin'
import Navbar from './Components/Navbar/Navbar'
import ChatBot from './Components/ChatBot/ChatBot'
import UploadFiles from './Components/DashBoard/UploadFiles'
import ModelCard from './Components/Models/ModelCard'
import ProductPage from './Components/Models/ProductPage'
import Test from './Components/Models/Test'

function App() {
  const dispatch = useDispatch()
  const loadUser = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/v1/me", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (data.user) {
        dispatch({ type: "SET_USER", payload: data.user });
      } else {
        dispatch({ type: "CLEAR_USER" });
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    initFlowbite();
    loadUser();
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path='register' element={<Signup />} />
        <Route path='otp' element={<OtpPage />} />
        <Route path='signin' element={<Signin />} />
        <Route path='upload_files' element={<UploadFiles />} />
        <Route path='chatbot' element={<ChatBot />} />
        <Route path='products' element={<ProductPage />} />
      </Routes>
    </Router>
    
  )
}

export default App
