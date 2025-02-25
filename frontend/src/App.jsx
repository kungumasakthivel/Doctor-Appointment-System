import AddDoctor from "./pages/AddDoctor";
import Doctors from "./pages/Doctors"
import { Routes, Route, Navigate } from "react-router-dom";
import './App.css'
function App() {

  return (
    <>
      <Routes path="/">
        <Route index element={<Navigate to="/doctors" replace />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/add-doctors' element={<AddDoctor />} />
      </Routes>
    </>
  )
}

export default App
