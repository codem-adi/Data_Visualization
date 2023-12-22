import { Routes, Route } from "react-router-dom"
import CheckIfLogin from './utils/CheckIfLogin'


import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Uploadfile from './pages/Uploadfile'
import ViewDataset from './pages/ViewDataset'


export default function App() {

  return (
    <>
      <Routes>
        <Route exact path="/" element={<CheckIfLogin Component={Home} />} />
        <Route exact path="/upload" element={<CheckIfLogin Component={Uploadfile} />} />
        <Route exact path="/view/dataset" element={<CheckIfLogin Component={ViewDataset} />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </>
  )
}


