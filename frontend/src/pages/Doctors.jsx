import { useNavigate } from "react-router-dom"
import DoctorList from "../components/DoctorList"

const Doctors = () => {
  const nav = useNavigate()

  return (
    <div className="w-full max-h-dvh flex-col items-end">
        <DoctorList />
        <button 
          className="rounded-2xl save-btn cursor-pointer show-absolute-btn" 
          onClick={() => nav('/add-doctors')}
        >
          New Doctor
        </button>
    </div>
  )
}

export default Doctors