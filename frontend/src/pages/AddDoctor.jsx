import { useState } from "react"
import { useNavigate } from "react-router-dom"
const AddDoctor = () => {
  const [name, setName] = useState('')
  const [special, setSpecial] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const nav = useNavigate();

  const postDoctor = async () => {
    const data = {
        name:name, 
        specialization: special,
        workingHours:{
            start: startTime,
            end: endTime
        }  
    }
    console.log(data)
    try {
        const res = await fetch(`https://doctor-appointment-system-awge.onrender.com/doctors`,
            {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }          
        );
        if(res.status == 400) {
            throw new Error('Error in creating notes please check the fields')
        } else {
            nav('/doctors')
        }
    } catch (err) {
        console.error(err)
        alert(err)
    }
  }

  return (
    <div className=" h-dvh flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
            <input 
                type="text" 
                value={name} 
                placeholder="Doctor Name" 
                className="w-full" 
                onChange={(e) => setName(e.target.value)}
            />
            <input 
                type="text"
                value={special} 
                placeholder="Specialization" 
                className="w-full" 
                onChange={(e) => setSpecial(e.target.value)}
            />
            <div className="flex items-center gap-2">
                <input 
                    type="text" 
                    value={startTime}
                    placeholder="Start Time" 
                    onChange={(e) => setStartTime(e.target.value)}
                />
                <input 
                    type="text" 
                    value={endTime}
                    placeholder="End Time" 
                    onChange={(e) => setEndTime(e.target.value)}
                />
            </div>
            <button 
                className="rounded-full save-btn cursor-pointer"
                onClick={postDoctor}
            >
                Add Doctor
            </button>
        </div>
        <button className="save-btn back-btn rounded-full" onClick={() => nav('/doctors')}>Back</button>
    </div>
  )
}

export default AddDoctor