import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from "react-modal";
import Appointment from './Appointment';

Modal.setAppElement('body');
const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  function closeModal({val}) {
    setIsOpen(val);
  } 

  useEffect(() => {
    setLoading(true)
    axios.get('https://doctor-appointment-system-awge.onrender.com/doctors').then((response) => {
      setDoctors(response.data);
    });
    setLoading(false)
  }, []);
  console.log(doctors);
  return (
    <div className='w-full flex items-center justify-center mt-20'>
      <table className='table-auto border-collapse'>
        <thead>
          <tr>
            <th className='border p-2'>Doctor Name</th>
            <th className='border p-2'>Specialist</th>
            <th className='border p-2'>Timing</th>
            <th className='border p-2'>Appointment</th>
          </tr>
        </thead>
        <tbody>
          {loading?<p>Loading</p>:null}
          {doctors.map((doc) => (
            <tr key={doc._id}>
              <td className='border p-2'>{doc.name}</td>
              <td className='border p-2'>{doc.specialization}</td>
              <td className='border p-2'>{doc.workingHours.start} - {doc.workingHours.end}</td>
              <td className='border p-2 flex justify-center'>
                <button 
                  className='rounded-full book-btn'
                  onClick={() => setIsOpen(true)}
                >
                  Book
                </button>
              </td>
              <Modal
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                style={{
                  content: {
                    width: "80%",
                    margin: "auto",
                    padding: "20px",
                    borderRadius: "10px",
                    textAlign: "center",
                    backgroundColor: "rgb(30, 27, 27)",
                    color: "white",
                  },
                }}
              >
                <Appointment data={doc} closeModal={closeModal} />
                <button 
                  className='cursor-pointer rounded-full mt-3 save-btn' 
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </button>
              </Modal> 
            </tr>
          ))}
        </tbody>
      </table> 
    </div>
  )
}

export default DoctorList