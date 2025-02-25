import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns";
import { useNavigate } from "react-router-dom"
import PropTypes from 'prop-types';

const Appointment = ({ data, closeModal }) => {
    const [id, setId] = useState(data._id)
    const [date, setDate] = useState();
    const [duration, setDuration] = useState();
    const [appointmentType, setAppointmentType] = useState('');
    const [patientName, setPatientName] = useState('');

    const [notes, setNotes] = useState('');

    const nav = useNavigate();

    function LimitedDatePicker() {
      return (
        <div>
          <DatePicker
            className="text-white w-xs"
            selected={date}
            onChange={(date) => setDate(date)}
            minDate={new Date()} // Prevents past date selection
            maxDate={addDays(new Date(), 7)} // Allows selection only within 7 days
            dateFormat="dd-MM-yyyy"
            placeholderText="Select a date"
          />
        </div>
      );
    }

    const postAppointment = async () => {
      const data = {
        doctorId:id,
        date: date,
        duration: duration,
        appointmentType: appointmentType,
        patientName: patientName,
        notes: notes
      }

      console.log(data)

      try {
        const res = await fetch(`https://doctor-appointment-system-awge.onrender.com/appointment`, 
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }
        )
        console.log(res)
        if(res.status >= 400) {
            throw new Error('Error in creating notes please check the fields')
        } else {
            nav('/doctors')
        }
        if(res.status == 200) {
          closeModal(true)
        }
      } catch (err) {
        console.error(err)
        alert(err)
      }
    }
  return (
    <div className="flex flex-col items-center gap-2.5">
        <h3 className="font-bold text-3xl">Book Appointment</h3>
        <input 
          className="w-xs"
          type="text" 
          value={id} 
          placeholder="Doctor ID" 
          onChange={(e) => setId(e.target.value)} 
        />
        <LimitedDatePicker />
        <input 
          className="w-xs"
          type="text"
          value={duration}
          placeholder="Duration in minutes (multiple of 30)"
          onChange={(e) => setDuration(e.target.value)}
        />
        <input 
          className="w-xs"
          type="text"
          value={appointmentType}
          placeholder="Appointment Type"
          onChange={(e) => setAppointmentType(e.target.value)}
        />
        <input 
          className="w-xs"
          type="text"
          value={patientName}
          placeholder="Patient Name"
          onChange={(e) => setPatientName(e.target.value)}
        />
        <input 
          className="w-xs"
          type="text"
          value={notes}
          placeholder="Short Note"
          onChange={(e) => setNotes(e.target.value)}
        />
        <button 
          className="save-btn rounded-full cursor-pointer"
          onClick={postAppointment}
        >
          Book
        </button>
    </div>
  )
}

Appointment.propTypes = {//+
  data: PropTypes.object.isRequired,//+
  closeModal: PropTypes.func.isRequired,//+
};//

export default Appointment
