import { useEffect } from 'react'
import Index from './Components/Home/Index'
import './index.css'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {useDispatch} from "react-redux"
import { initFlowbite } from 'flowbite'

function App() {
  const dispatch = useDispatch()
  const loadUser = async () => {
  try{
    await axios.post("http://localhost:3000/api/v1/login",{email:'teamm2d007@gmail.com', password:'Password1234'},{
      headers: { 'Content-Type': 'application/json'},
      withCredentials: true
    })
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
  }catch(err)
  {
    console.log(err)
  }
  }

  useEffect(() => {
    initFlowbite();
    loadUser();
  },[])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
    </Router>
  )
}

export default App
