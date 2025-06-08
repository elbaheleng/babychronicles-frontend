import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { GlobalStyles } from '@mui/material';
import { amber } from '@mui/material/colors';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { addBathApi, addBottlefeedApi, addBreastfeedingApi, addDiaperchangeApi, addHealthApi, addMilestoneApi, addPlaytimeApi, addPottytimeApi, addPumpingApi, addSleepApi, getAllBabiesByUserApi } from '../services/allApis';

//extensions for age calculation
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import Buttonstackdashboard from '../components/Buttonstackdashboard';
import { addBabyStatusContext, babyContext } from '../context/Contexttoshare';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Highlights from '../components/Highlights';

dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);


function Dashboard() {
  const { addBabyStatus, setAddBabyStatus } = useContext(addBabyStatusContext)
  const { baby, setBaby } = useContext(babyContext)
  //states
  const [modalBreastfeeding, setModalBreastfeeding] = useState(false)
  const [modalBottlefeed, setModalBottlefeed] = useState(false)
  const [modalDiaperchange, setModalDiaperchange] = useState(false)
  const [modalSleep, setModalSleep] = useState(false)
  const [modalPumping, setModalPumping] = useState(false)
  const [modalPottytime, setModalPottytime] = useState(false)
  const [modalPlaytime, setModalPlaytime] = useState(false)
  const [modalBath, setModalBath] = useState(false)
  const [modalMilestone, setModalMilestone] = useState(false)
  const [modalHealth, setModalHealth] = useState(false)
  const [firstLoad, setFirstLoad] = useState(true)
  const [userDetails, setUserDetails] = useState({})
  const [userBabies, setUserBabies] = useState([])
  const [age, setAge] = useState("")
  const [logAdded, setLogAdded] = useState({})
  const [token, settoken] = useState("")
  


  const [breastfeedingDetails, setBreastfeedingDetails] = useState({
    date: dayjs(),
    starttime: dayjs(),
    endtime: dayjs(),
    duration: "",
    side: ""
  })
  const [bottlefeedDetails, setBottlefeedDetails] = useState({
    date: dayjs(),
    time: dayjs(),
    quantity: "",
    type: ""
  })
  const [diaperchangeDetails, setDiaperchangeDetails] = useState({
    date: dayjs(),
    time: dayjs(),
    type: ""
  })
  const [sleepDetails, setSleepDetails] = useState({
    date: dayjs(),
    starttime: dayjs(),
    endtime: dayjs(),
    duration: ""
  })
  const [pumpingDetails, setPumpingDetails] = useState({
    date: dayjs(),
    starttime: dayjs(),
    endtime: dayjs(),
    duration: "",
    side: "",
    quantity: ""
  })
  const [pottytimeDetails, setPottytimeDetails] = useState({
    date: dayjs(),
    time: dayjs(),
    type: ""
  })
  const [playtimeDetails, setPlaytimeDetails] = useState({
    date: dayjs(),
    starttime: dayjs(),
    endtime: dayjs(),
    duration: "",
    description: ""
  })
  const [bathDetails, setBathDetails] = useState({
    date: dayjs(),
    starttime: dayjs(),
    endtime: dayjs(),
    duration: ""
  })
  const [milestoneDetails, setMilestoneDetails] = useState({
    date: dayjs(),
    description: ""
  })
  const [healthDetails, setHealthDetails] = useState({
    date: dayjs(),
    time: dayjs(),
    type: "",
    description: ""
  })

  //console.log(breastfeedingDetails);
  //console.log(bottlefeedDetails);
  //console.log(diaperchangeDetails);
  //console.log(sleepDetails);
  //console.log(pumpingDetails);
  //console.log(pottytimeDetails);
  //console.log(playtimeDetails);
  //console.log(bathDetails);
  //console.log(milestoneDetails);
  //console.log(healthDetails);





  //to get today's date and display
  const today = new Date();
  const day = today.getDate();
  const month = today.toLocaleString('default', { month: 'long' });
  const year = today.getFullYear();
  const weekday = today.toLocaleString('default', { weekday: 'long' });

  //functions****************************************************
  //to calculate end time
  const calculateEndtimeBreastfeeding = () => {
    const endTime = breastfeedingDetails.starttime.add(breastfeedingDetails.duration, 'minute');
    setBreastfeedingDetails({ ...breastfeedingDetails, endtime: endTime })
  }
  const calculateEndtimeSleep = () => {
    const endTime = sleepDetails.starttime.add(sleepDetails.duration, 'minute');
    setSleepDetails({ ...sleepDetails, endtime: endTime })
  }
  const calculateEndtimePumping = () => {
    const endTime = pumpingDetails.starttime.add(pumpingDetails.duration, 'minute');
    setPumpingDetails({ ...pumpingDetails, endtime: endTime })
  }
  const calculateEndtimePlaytime = () => {
    const endTime = playtimeDetails.starttime.add(playtimeDetails.duration, 'minute');
    setPlaytimeDetails({ ...playtimeDetails, endtime: endTime })
  }
  const calculateEndtimeBath = () => {
    const endTime = bathDetails.starttime.add(bathDetails.duration, 'minute');
    setBathDetails({ ...bathDetails, endtime: endTime })
  }
  //to close modals-----------------------------------------------
  const closeBreastfeedingModal = () => {
    setModalBreastfeeding(false)
    handleBreastfeedingReset()
  }
  const closeBottlefeedModal = () => {
    setModalBottlefeed(false)
    handleBottlefeedReset()
  }
  const closeDiaperchangeModal = () => {
    setModalDiaperchange(false)
    handleDiaperchangeReset()
  }
  const closeSleepModal = () => {
    setModalSleep(false)
    handleSleepReset()
  }
  const closePumpingModal = () => {
    setModalPumping(false)
    handlePumpingReset()
  }
  const closePottytimeModal = () => {
    setModalPottytime(false)
    handlePottytimeReset()
  }
  const closePlaytimeModal = () => {
    setModalPlaytime(false)
    handlePlaytimeReset()
  }
  const closeBathModal = () => {
    setModalBath(false)
    handleBathReset()
  }
  const closeMilestoneModal = () => {
    setModalMilestone(false)
    handleMilestoneReset()
  }
  const closeHealthModal = () => {
    setModalHealth(false)
    handleHealthReset()
  }

  //to reset modals-----------------------------------------------
  const handleBreastfeedingReset = () => {
    setBreastfeedingDetails({
      date: dayjs(),
      starttime: dayjs(),
      endtime: dayjs(),
      duration: "",
      side: ""
    })
  }
  const handleBottlefeedReset = () => {
    setBottlefeedDetails({
      date: dayjs(),
      time: dayjs(),
      quantity: "",
      type: ""
    })
  }
  const handleDiaperchangeReset = () => {
    setDiaperchangeDetails({
      date: dayjs(),
      time: dayjs(),
      type: ""
    })
  }
  const handleSleepReset = () => {
    setSleepDetails({
      date: dayjs(),
      starttime: dayjs(),
      endtime: dayjs(),
      duration: ""
    })
  }

  const handlePumpingReset = () => {
    setPumpingDetails({
      date: dayjs(),
      starttime: dayjs(),
      endtime: dayjs(),
      duration: "",
      side: "",
      quantity: ""
    })
  }
  const handlePottytimeReset = () => {
    setPottytimeDetails({
      date: dayjs(),
      time: dayjs(),
      type: ""
    })
  }
  const handlePlaytimeReset = () => {
    setPlaytimeDetails({
      date: dayjs(),
      starttime: dayjs(),
      endtime: dayjs(),
      duration: "",
      description: ""
    })
  }
  const handleBathReset = () => {
    setBathDetails({
      date: dayjs(),
      starttime: dayjs(),
      endtime: dayjs(),
      duration: ""
    })
  }
  const handleMilestoneReset = () => {
    setMilestoneDetails({
      date: dayjs(),
      description: ""
    })
  }
  const handleHealthReset = () => {
    setHealthDetails({
      date: dayjs(),
      time: dayjs(),
      type: "",
      description: ""
    })
  }



  //to submit activities
  const handleBreastfeedingSubmit = async () => {
    const { date, starttime, endtime, duration, side } = breastfeedingDetails
    const { _id } = baby
    //console.log(date, starttime, endtime, duration, side,_id);

    const result = await addBreastfeedingApi({ babyid: _id, date, starttime, endtime, duration, side })
    if (result.status == 200) {
      toast.success("Breastfeeding log added.")
      setLogAdded(result.data)
      closeBreastfeedingModal()
    } else {
      toast.error("Something went wrong")
      closeBreastfeedingModal()
    }
  }
  const handleBottlefeedSubmit = async () => {
    const { date, time, type, quantity } = bottlefeedDetails
    const { _id } = baby

    const result = await addBottlefeedApi({ babyid: _id, date, time, type, quantity })
    if (result.status == 200) {
      toast.success("Bottle feed log added.")
      setLogAdded(result.data)

      closeBottlefeedModal()
    } else {
      toast.error("Something went wrong")
      closeBottlefeedModal()
    }
  }
  const handleDiaperChangeSubmit = async () => {
    const { date, time, type } = diaperchangeDetails
    const { _id } = baby

    const result = await addDiaperchangeApi({ babyid: _id, date, time, type })
    if (result.status == 200) {
      toast.success("Diaper change log added.")
      setLogAdded(result.data)

      closeDiaperchangeModal()
    } else {
      toast.error("Something went wrong")
      closeDiaperchangeModal()
    }
  }
  const handleSleepSubmit = async () => {
    const { date, starttime, endtime, duration } = sleepDetails
    const { _id } = baby

    const result = await addSleepApi({ babyid: _id, date, starttime, endtime, duration })
    if (result.status == 200) {
      toast.success("Sleep log added.")
      setLogAdded(result.data)

      closeSleepModal()
    } else {
      toast.error("Something went wrong")
      closeSleepModal()
    }
  }
  const handlePumpingSubmit = async () => {
    const usermail = userDetails.email
    const { date, starttime, endtime, duration, side, quantity } = pumpingDetails

    const result = await addPumpingApi({ date, starttime, endtime, duration, side, quantity, usermail })
    if (result.status == 200) {
      toast.success("Pumping log added.")
      closePumpingModal()
    } else {
      toast.error("Something went wrong")
      closePumpingModal()
    }
  }
  const handlePottytimeSubmit = async () => {
    const { date, time, type } = pottytimeDetails
    const { _id } = baby

    const result = await addPottytimeApi({ babyid: _id, date, time, type })
    if (result.status == 200) {
      toast.success("Potty time log added.")
      setLogAdded(result.data)

      closePottytimeModal()
    } else {
      toast.error("Something went wrong")
      closePottytimeModal()
    }
  }

  const handlePlaytimeSubmit = async () => {
    const { date, starttime, endtime, description, duration } = playtimeDetails
    const { _id } = baby

    const result = await addPlaytimeApi({ babyid: _id, date, starttime, endtime, description, duration })
    if (result.status == 200) {
      toast.success("Play time log added.")
      setLogAdded(result.data)

      closePlaytimeModal()
    } else {
      toast.error("Something went wrong")
      closePlaytimeModal()
    }
  }
  const handleBathSubmit = async () => {
    const { date, starttime, endtime, duration } = bathDetails
    const { _id } = baby

    const result = await addBathApi({ babyid: _id, date, starttime, endtime, duration })
    if (result.status == 200) {
      toast.success("Bath log added.")
      setLogAdded(result.data)

      closeBathModal()
    } else {
      toast.error("Something went wrong")
      closeBathModal()
    }
  }
  const handleMilestoneSubmit = async () => {
    const { date, description } = milestoneDetails
    const { _id } = baby

    const result = await addMilestoneApi({ babyid: _id, date, description })


    if (result.status == 200) {
      toast.success("Milestone added.")
      closeMilestoneModal()
    } else {
      toast.error("Something went wrong")
      closeMilestoneModal()
    }
  }
  const handleHealthSubmit = async () => {
    const { date, type, description, time } = healthDetails
    const { _id } = baby

    const result = await addHealthApi({ babyid: _id, date, type, description, time })
    if (result.status == 200) {
      toast.success("Health/Vaccine log added.")
      closeHealthModal()
    } else {
      toast.error("Something went wrong")
      closeHealthModal()
    }
  }


  //to get all babies added by the user
  const getAllBabiesByUser = async (token) => {
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    console.log("inside fun frontend");
    
    const result = await getAllBabiesByUserApi(reqHeader)
    setUserBabies(result.data)
    console.log(result);
    

  }

  // console.log(userBabies);
  //console.log(baby);

  //to calculate baby's age
  const calculateAge = () => {

    const dob = dayjs(baby.dob).tz('Asia/Kolkata');
    const now = dayjs().tz('Asia/Kolkata');

    const totalDays = now.diff(dob, 'day');
    const years = Math.floor(totalDays / 365);
    const months = Math.floor((totalDays % 365) / 30);
    const weeks = Math.floor(((totalDays % 365) % 30) / 7);
    const days = ((totalDays % 365) % 30) % 7;

    const ageParts = [];
    let babyage = ""
    if (years > 0) ageParts.push(`${years} year${years > 1 ? 's' : ''}`);
    if (months > 0) ageParts.push(`${months} month${months > 1 ? 's' : ''}`);
    if (weeks > 0) ageParts.push(`${weeks} week${weeks > 1 ? 's' : ''}`);
    if (days > 0) ageParts.push(`${days} day${days > 1 ? 's' : ''}`);
    if (ageParts.length > 0) {
      babyage = ageParts.join(', ')
    } else {
      babyage = '0 days'
    }
    setAge(babyage)
  }

  //function to handle baby selection
  const selectBaby = (e) => {
    setFirstLoad(false)
    setBaby(e.target.value)
    localStorage.setItem("baby", JSON.stringify(e.target.value))
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      const user = JSON.parse(sessionStorage.getItem("existingUser"))
      settoken(token)
      setUserDetails(user)
      getAllBabiesByUser(token)
      if (modalBreastfeeding) {
        calculateEndtimeBreastfeeding()
      }
      if (modalSleep) {
        calculateEndtimeSleep()
      }
      if (modalPumping) {
        calculateEndtimePumping()
      }
      if (modalPlaytime) {
        calculateEndtimePlaytime()
      }
      if (modalBath) {
        calculateEndtimeBath()
      }
    }
    if (!firstLoad) {
      calculateAge()
    }
  }, [breastfeedingDetails.duration, sleepDetails.duration, pumpingDetails.duration, playtimeDetails.duration, bathDetails.duration, baby, addBabyStatus])
  useEffect(() => {
    if (sessionStorage.getItem("token") && localStorage.getItem("baby")) {
      setFirstLoad(false)
    }
  }, [])
  console.log(userBabies);
  
  useEffect(() => {
    const baby1 = JSON.parse(localStorage.getItem("baby"))
    setBaby(baby1)
  }, [])
  return (

    <>
      <Header />
      <p className='text-end'>{`${month} ${day}, ${year}, ${weekday}`}</p>
      <div className='flex justify-between items-center'>
        <div>
          <h3 className='text-xl ms-5'>Hello {userDetails.fullname}! </h3>
          {!token ? <h4 className='ms-5'>Please login.</h4> :!firstLoad ? <h4 className='ms-5'> {baby.name} is {age} old!</h4> : <h4 className='ms-5'>Please select your baby from dropdown.</h4>}
        </div>
        <div className='text-end my-5'>
          <p className='me-3'>Choose Baby</p>
          <Select
            className='mt-2 w-32 md:w-80 me-3'
            value={baby}
            onChange={(e) => selectBaby(e)}
            id="demo-simple-select-helper-label"
            renderValue={(selected) => {
              if (!selected || selected === '') {
                return 'Select Baby';
              }
              return selected.name === '' ? `Baby ${userBabies.indexOf(selected) + 1}` : selected.name;
            }}
          >
            {userBabies?.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item?.name}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
      {!firstLoad && <p className='ms-5'>Click on the icons to log the activities.</p>}
      {!firstLoad && <div className='md:grid grid-cols-[3fr_1fr]'>
        <div className='grid md:grid-cols-5 grid-cols-3 my-3'>
          <div className=' flex flex-col justify-center items-center my-2'>
            <img onClick={() => setModalBreastfeeding(true)} style={{ height: "50px" }} src="/mother.png" alt="mother" />
            <p className='font-bold mb-1'>Breastfeeding</p>
            <Link to={'/breastfeeding_log'}><button type='button' className='bg-pink-700 text-white px-3 py-0.5 rounded'>View Log</button></Link>
          </div>
          <div className=' flex flex-col justify-center items-center my-2'>
            <img onClick={() => setModalBottlefeed(true)} style={{ height: "50px" }} src="/milk-bottle.png" alt="milk bottle" />
            <p className='font-bold mb-1'>Bottle Feed</p>
            <Link to={'/bottlefeed_log'}><button className='bg-pink-700 text-white px-3 py-0.5 rounded'>View Log</button></Link>
          </div>
          <div className=' flex flex-col justify-center items-center my-2'>
            <img onClick={() => setModalDiaperchange(true)} style={{ height: "50px" }} src="/baby-diaper.png" alt="diaper" />
            <p className='font-bold mb-1'>Diaper Change</p>
            <Link to={'/diaperchange_log'}><button className='bg-pink-700 text-white px-3 py-0.5 rounded'>View Log</button></Link>
          </div>
          <div className=' flex flex-col justify-center items-center my-2'>
            <img onClick={() => setModalSleep(true)} style={{ height: "50px" }} src="/baby-sleep.png" alt="sleep" />
            <p className='font-bold mb-1'>Sleep</p>
            <Link to={'/sleep_log'}><button className='bg-pink-700 text-white px-3 py-0.5 rounded'>View Log</button></Link>
          </div>
          <div className=' flex flex-col justify-center items-center my-2'>
            <img onClick={() => setModalPumping(true)} style={{ height: "50px" }} src="/breast-pump.png" alt="pump" />
            <p className='font-bold mb-1'>Pumping</p>
            <Link to={'/pumping'}><button className='bg-pink-700 text-white px-3 py-0.5 rounded'>View Log</button></Link>
          </div>
          <div className=' flex flex-col justify-center items-center my-2'>
            <img onClick={() => setModalPottytime(true)} style={{ height: "50px" }} src="/potty.png" alt="potty" />
            <p className='font-bold mb-1'>Potty Time</p>
            <Link to={'/pottytime_log'}><button className='bg-pink-700 text-white px-3 py-0.5 rounded'>View Log</button></Link>
          </div>
          <div className=' flex flex-col justify-center items-center my-2'>
            <img onClick={() => setModalBath(true)} style={{ height: "50px" }} src="/baby-bath.png" alt="bath" />
            <p className='font-bold mb-1'>Bath</p>
            <Link to={'/bath_log'}><button className='bg-pink-700 text-white px-3 py-0.5 rounded'>View Log</button></Link>
          </div>
          <div className=' flex flex-col justify-center items-center my-2'>
            <img onClick={() => setModalPlaytime(true)} style={{ height: "50px" }} src="/rocking-horse.png" alt="play" />
            <p className='font-bold mb-1'>Playtime</p>
            <Link to={'/playtime_log'}><button className='bg-pink-700 text-white px-3 py-0.5 rounded'>View Log</button></Link>
          </div>
          <div className=' flex flex-col justify-center items-center my-2'>
            <img onClick={() => setModalMilestone(true)} style={{ height: "50px" }} src="/milestone.png" alt="milestone" />
            <p className='font-bold mb-1'>Milestones</p>
            <Link to={'/milestone_log'}><button className='bg-pink-700 text-white px-3 py-0.5 rounded'>View Log</button></Link>
          </div>
          <div className=' flex flex-col justify-center items-center my-2'>
            <img onClick={() => setModalHealth(true)} style={{ height: "50px" }} src="/baby-vaccine.png" alt="vaccine" />
            <p className='font-bold mb-1'>Health & Vaccines</p>
            <Link to={'/health_log'}><button className='bg-pink-700 text-white px-3 py-0.5 rounded'>View Log</button></Link>
          </div>
        </div>
        <div>
          <Highlights id={baby._id} log={logAdded} />
        </div>
        <Buttonstackdashboard />
      </div>}
      {firstLoad &&
        <div>
          <div className='hidden md:block'>
            <img src="/hero_md.jpg" alt="babyimage" />
          </div>
          <div className='md:hidden'>
            <img src="/hero_sm.jpg" alt="babyimage" />
          </div>
        </div>
      }

      {modalBreastfeeding &&
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

          <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">

                {/* title of modal */}
                <div className="bg-white p-4 flex justify-between items-center sm:px-6">
                  <h1 className='text-pink-600 text-2xl me-10'>Log Breastfeeding</h1>
                  <FontAwesomeIcon onClick={closeBreastfeedingModal} className='text-black bg-amber-300 fa-x px-3 py-2 rounded' icon={faXmark} />
                </div>
                {/* boby of modal */}
                <div className="bg-white px-4 pt-3 pb-4 sm:p-6 sm:pb-4">
                  <div className='text-xl'>
                    <span className='italic p-3'>Select Side</span>
                    <input checked={breastfeedingDetails.side === "Left"} onChange={(e) => setBreastfeedingDetails({ ...breastfeedingDetails, side: e.target.value })} type="radio" id="left" name="side" value="Left" className='me-2' />
                    <label htmlFor="left" className='me-5'>Left</label>
                    <input checked={breastfeedingDetails.side === "Right"} onChange={(e) => setBreastfeedingDetails({ ...breastfeedingDetails, side: e.target.value })} type="radio" id="right" name="side" value="Right" className='me-2' />
                    <label htmlFor="right" className='me-5'>Right</label>

                  </div>
                  <p className='px-3 mt-3'>Select Date, Start time and duration in minutes</p>
                  <div className="grid grid-cols-2 ">
                    <div className='p-3 '>
                      <div className="mb-3 pt-2">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          {/* Override today's date highlight color */}
                          <GlobalStyles styles={{
                            '.MuiPickersDay-today': {
                              backgroundColor: amber[200] + ' !important',
                              color: 'black',
                              border: '1px solid ' + amber[500],
                            },
                            '.MuiPickersDay-root.Mui-selected': {
                              backgroundColor: amber[300] + ' !important',
                              color: 'black',
                            },
                            '.MuiPickersDay-root.Mui-selected:hover': {
                              backgroundColor: amber[400] + ' !important',
                            },
                            '.MuiPickersDay-root:hover': {
                              backgroundColor: amber[100],
                            },
                          }} />
                          <DatePicker defaultValue={dayjs()}
                            onChange={(e) => setBreastfeedingDetails({ ...breastfeedingDetails, date: e })}
                            format="DD/MM/YYYY"
                            maxDate={dayjs()}
                            value={breastfeedingDetails.date}
                          />
                        </LocalizationProvider>
                      </div>
                      <div className="mb-3 pt-2">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <GlobalStyles styles={{
                            // Selected clock number
                            '.MuiClockNumber-root.Mui-selected': {
                              backgroundColor: `${amber[300]} !important`,
                              color: 'black !important',
                            },
                            '.MuiClockNumber-root.Mui-selected:hover': {
                              backgroundColor: `${amber[400]} !important`,
                            },
                            '.MuiClockNumber-root:hover': {
                              backgroundColor: `${amber[100]} !important`,
                            },

                            // Clock face
                            '.MuiClock-clock': {
                              backgroundColor: `${amber[100]} !important`,
                            },

                            // Clock needle (pointer)
                            '.MuiClockPointer-root': {
                              backgroundColor: `${amber[400]} !important`,
                            },

                            // Clock needle outer dot (thumb)
                            '.MuiClockPointer-thumb': {
                              backgroundColor: `${amber[500]} !important`,
                              border: `1px solid ${amber[500]} !important`,
                              boxShadow: 'none !important',
                            }

                          }} />
                          <TimePicker label="Start time"
                            value={breastfeedingDetails.starttime}
                            onChange={(e) => setBreastfeedingDetails({ ...breastfeedingDetails, starttime: e })}

                          />
                        </LocalizationProvider>

                      </div>
                    </div>
                    <div className='p-3 '>
                      <div className="mb-3 pt-2">
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                          <GlobalStyles styles={{
                            // Selected clock number
                            '.MuiClockNumber-root.Mui-selected': {
                              backgroundColor: `${amber[300]} !important`,
                              color: 'black !important',
                            },
                            '.MuiClockNumber-root.Mui-selected:hover': {
                              backgroundColor: `${amber[400]} !important`,
                            },
                            '.MuiClockNumber-root:hover': {
                              backgroundColor: `${amber[100]} !important`,
                            },

                            // Clock face
                            '.MuiClock-clock': {
                              backgroundColor: `${amber[100]} !important`,
                            },

                            // Clock needle (pointer)
                            '.MuiClockPointer-root': {
                              backgroundColor: `${amber[400]} !important`,
                            },

                            // Clock needle outer dot (thumb)
                            '.MuiClockPointer-thumb': {
                              backgroundColor: `${amber[500]} !important`,
                              border: `1px solid ${amber[500]} !important`,
                              boxShadow: 'none !important',
                            }

                          }} />
                          <TimePicker label="End time"
                            readOnly
                            value={breastfeedingDetails.endtime}
                            onChange={(e) => setBreastfeedingDetails({ ...breastfeedingDetails, endtime: e })}
                          />
                        </LocalizationProvider>
                      </div>
                      <div className="mb-3">
                        <OutlinedInput className='mt-2'
                          value={breastfeedingDetails.duration}
                          onChange={(e) => setBreastfeedingDetails({ ...breastfeedingDetails, duration: e.target.value })}
                          endAdornment={<InputAdornment position="end">minutes</InputAdornment>}
                        />
                      </div>
                    </div>
                  </div>

                </div>
                {/* footer of modal */}
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button type="button" onClick={handleBreastfeedingSubmit} className="inline-flex w-full justify-center rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold ring-1  ring-pink-600 ring-inset text-white shadow-xs hover:bg-white hover:text-pink-600  sm:ml-3 sm:w-auto">Submit</button>
                  <button type="button" onClick={handleBreastfeedingReset} className="mt-3 inline-flex w-full justify-center rounded-md bg-amber-200 px-3 py-2 text-sm font-semibold text-black shadow-xs ring-1 ring-amber-300 ring-inset hover:bg-gray-50 hover:text-amber-500 hover:ring-amber-300 sm:mt-0 sm:w-auto">Reset</button>
                </div>
              </div>
            </div>
          </div>
        </div>}

      {modalBottlefeed &&
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

          <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">

                {/* title of modal */}
                <div className="bg-white p-4 flex justify-between items-center sm:px-6">
                  <h1 className='text-pink-600 text-2xl me-10'>Log Bottle feed</h1>
                  <FontAwesomeIcon onClick={closeBottlefeedModal} className='text-black bg-amber-300 fa-x px-3 py-2 rounded' icon={faXmark} />
                </div>
                {/* boby of modal */}
                <div className="bg-white px-4 pt-3 pb-4 sm:p-6 sm:pb-4">
                  <div className='text-xl'>
                    <span className='italic p-3'>Select Type</span>
                    <input checked={bottlefeedDetails.type === "Breast milk"} onChange={(e) => setBottlefeedDetails({ ...bottlefeedDetails, type: e.target.value })} type="radio" id="breastmilk" name="type" value="Breast milk" className='me-2' />
                    <label htmlFor="breastmilk" className='me-5'>Breast Milk</label>
                    <input checked={bottlefeedDetails.type === "Formula milk"} onChange={(e) => setBottlefeedDetails({ ...bottlefeedDetails, type: e.target.value })} type="radio" id="formulamilk" name="type" value="Formula milk" className='me-2' />
                    <label htmlFor="formulamilk" className='me-5'>Formula Milk</label>

                  </div>
                  <p className='px-3 mt-3'>Select Date, time and quantity in ml</p>
                  <div className="grid grid-cols-2 ">
                    <div className='p-3 '>
                      <div className="mb-3 pt-2">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          {/* Override today's date highlight color */}
                          <GlobalStyles styles={{
                            '.MuiPickersDay-today': {
                              backgroundColor: amber[200] + ' !important',
                              color: 'black',
                              border: '1px solid ' + amber[500],
                            },
                            '.MuiPickersDay-root.Mui-selected': {
                              backgroundColor: amber[300] + ' !important',
                              color: 'black',
                            },
                            '.MuiPickersDay-root.Mui-selected:hover': {
                              backgroundColor: amber[400] + ' !important',
                            },
                            '.MuiPickersDay-root:hover': {
                              backgroundColor: amber[100],
                            },
                          }} />
                          <DatePicker defaultValue={dayjs()}
                            onChange={(e) => setBottlefeedDetails({ ...bottlefeedDetails, date: e })}
                            format="DD/MM/YYYY"
                            maxDate={dayjs()}
                            value={bottlefeedDetails.date}
                          />
                        </LocalizationProvider>
                      </div>
                      <div className="mb-3 pt-2">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <GlobalStyles styles={{
                            // Selected clock number
                            '.MuiClockNumber-root.Mui-selected': {
                              backgroundColor: `${amber[300]} !important`,
                              color: 'black !important',
                            },
                            '.MuiClockNumber-root.Mui-selected:hover': {
                              backgroundColor: `${amber[400]} !important`,
                            },
                            '.MuiClockNumber-root:hover': {
                              backgroundColor: `${amber[100]} !important`,
                            },

                            // Clock face
                            '.MuiClock-clock': {
                              backgroundColor: `${amber[100]} !important`,
                            },

                            // Clock needle (pointer)
                            '.MuiClockPointer-root': {
                              backgroundColor: `${amber[400]} !important`,
                            },

                            // Clock needle outer dot (thumb)
                            '.MuiClockPointer-thumb': {
                              backgroundColor: `${amber[500]} !important`,
                              border: `1px solid ${amber[500]} !important`,
                              boxShadow: 'none !important',
                            }

                          }} />
                          <TimePicker label="Start time"
                            value={bottlefeedDetails.time}
                            onChange={(e) => setBottlefeedDetails({ ...bottlefeedDetails, time: e })}

                          />
                        </LocalizationProvider>

                      </div>
                    </div>
                    <div className='p-3 '>
                      <div className="mb-3">
                        <OutlinedInput className='mt-2'
                          value={bottlefeedDetails.quantity}
                          onChange={(e) => setBottlefeedDetails({ ...bottlefeedDetails, quantity: e.target.value })}
                          endAdornment={<InputAdornment position="end">ml</InputAdornment>}
                        />
                      </div>
                    </div>
                  </div>

                </div>
                {/* footer of modal */}
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button type="button" onClick={handleBottlefeedSubmit} className="inline-flex w-full justify-center rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold ring-1  ring-pink-600 ring-inset text-white shadow-xs hover:bg-white hover:text-pink-600  sm:ml-3 sm:w-auto">Submit</button>
                  <button type="button" onClick={handleBottlefeedReset} className="mt-3 inline-flex w-full justify-center rounded-md bg-amber-200 px-3 py-2 text-sm font-semibold text-black shadow-xs ring-1 ring-amber-300 ring-inset hover:bg-gray-50 hover:text-amber-500 hover:ring-amber-300 sm:mt-0 sm:w-auto">Reset</button>
                </div>
              </div>
            </div>
          </div>
        </div>}

      {modalDiaperchange &&
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

          <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">

                {/* title of modal */}
                <div className="bg-white p-4 flex justify-between items-center sm:px-6">
                  <h1 className='text-pink-600 text-2xl me-10'>Log Diaper change</h1>
                  <FontAwesomeIcon onClick={closeDiaperchangeModal} className='text-black bg-amber-300 fa-x px-3 py-2 rounded' icon={faXmark} />
                </div>
                {/* boby of modal */}
                <div className="bg-white px-4 pt-3 pb-4 sm:p-6 sm:pb-4">
                  <div className='text-xl'>
                    <p className='italic p-3'>Select Type</p>
                    <input checked={diaperchangeDetails.type === "Wet"} onChange={(e) => setDiaperchangeDetails({ ...diaperchangeDetails, type: e.target.value })} type="radio" id="wet" name="type" value="Wet" className='me-2 ms-3' />
                    <label htmlFor="wet" className='me-5'>Wet</label>
                    <input checked={diaperchangeDetails.type === "Dirty"} onChange={(e) => setDiaperchangeDetails({ ...diaperchangeDetails, type: e.target.value })} type="radio" id="dirty" name="type" value="Dirty" className='me-2' />
                    <label htmlFor="dirty" className='me-5'>Dirty</label>
                    <input checked={diaperchangeDetails.type === "Wet + Dirty"} onChange={(e) => setDiaperchangeDetails({ ...diaperchangeDetails, type: e.target.value })} type="radio" id="wet+dirty" name="type" value="Wet + Dirty" className='me-2' />
                    <label htmlFor="wet+dirty" className='me-5'>Wet + Dirty</label>
                  </div>
                  <p className='px-3 mt-3'>Select Date and time</p>
                  <div className="grid grid-cols-2 gap-4 ">
                    <div className="mb-3 pt-2">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {/* Override today's date highlight color */}
                        <GlobalStyles styles={{
                          '.MuiPickersDay-today': {
                            backgroundColor: amber[200] + ' !important',
                            color: 'black',
                            border: '1px solid ' + amber[500],
                          },
                          '.MuiPickersDay-root.Mui-selected': {
                            backgroundColor: amber[300] + ' !important',
                            color: 'black',
                          },
                          '.MuiPickersDay-root.Mui-selected:hover': {
                            backgroundColor: amber[400] + ' !important',
                          },
                          '.MuiPickersDay-root:hover': {
                            backgroundColor: amber[100],
                          },
                        }} />
                        <DatePicker defaultValue={dayjs()}
                          onChange={(e) => setDiaperchangeDetails({ ...diaperchangeDetails, date: e })}
                          format="DD/MM/YYYY"
                          maxDate={dayjs()}
                          value={diaperchangeDetails.date}
                        />
                      </LocalizationProvider>
                    </div>
                    <div className="mb-3 pt-2">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <GlobalStyles styles={{
                          // Selected clock number
                          '.MuiClockNumber-root.Mui-selected': {
                            backgroundColor: `${amber[300]} !important`,
                            color: 'black !important',
                          },
                          '.MuiClockNumber-root.Mui-selected:hover': {
                            backgroundColor: `${amber[400]} !important`,
                          },
                          '.MuiClockNumber-root:hover': {
                            backgroundColor: `${amber[100]} !important`,
                          },

                          // Clock face
                          '.MuiClock-clock': {
                            backgroundColor: `${amber[100]} !important`,
                          },

                          // Clock needle (pointer)
                          '.MuiClockPointer-root': {
                            backgroundColor: `${amber[400]} !important`,
                          },

                          // Clock needle outer dot (thumb)
                          '.MuiClockPointer-thumb': {
                            backgroundColor: `${amber[500]} !important`,
                            border: `1px solid ${amber[500]} !important`,
                            boxShadow: 'none !important',
                          }

                        }} />
                        <TimePicker label="Time"
                          value={diaperchangeDetails.time}
                          onChange={(e) => setDiaperchangeDetails({ ...diaperchangeDetails, time: e })}

                        />
                      </LocalizationProvider>

                    </div>
                  </div>
                </div>
                {/* footer of modal */}
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button type="button" onClick={handleDiaperChangeSubmit} className="inline-flex w-full justify-center rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold ring-1  ring-pink-600 ring-inset text-white shadow-xs hover:bg-white hover:text-pink-600  sm:ml-3 sm:w-auto">Submit</button>
                  <button type="button" onClick={handleDiaperchangeReset} className="mt-3 inline-flex w-full justify-center rounded-md bg-amber-200 px-3 py-2 text-sm font-semibold text-black shadow-xs ring-1 ring-amber-300 ring-inset hover:bg-gray-50 hover:text-amber-500 hover:ring-amber-300 sm:mt-0 sm:w-auto">Reset</button>
                </div>
              </div>
            </div>
          </div>
        </div>}

      {modalSleep &&
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

          <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">

                {/* title of modal */}
                <div className="bg-white p-4 flex justify-between items-center sm:px-6">
                  <h1 className='text-pink-600 text-2xl me-10'>Log Sleep</h1>
                  <FontAwesomeIcon onClick={closeSleepModal} className='text-black bg-amber-300 fa-x px-3 py-2 rounded' icon={faXmark} />
                </div>
                {/* boby of modal */}
                <div className="bg-white px-4 pt-3 pb-4 sm:p-6 sm:pb-4">
                  <p className='px-3 mt-3'>Select Date, Start time and duration in minutes</p>
                  <div className="grid grid-cols-2 ">
                    <div className='p-3 '>
                      <div className="mb-3 pt-2">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          {/* Override today's date highlight color */}
                          <GlobalStyles styles={{
                            '.MuiPickersDay-today': {
                              backgroundColor: amber[200] + ' !important',
                              color: 'black',
                              border: '1px solid ' + amber[500],
                            },
                            '.MuiPickersDay-root.Mui-selected': {
                              backgroundColor: amber[300] + ' !important',
                              color: 'black',
                            },
                            '.MuiPickersDay-root.Mui-selected:hover': {
                              backgroundColor: amber[400] + ' !important',
                            },
                            '.MuiPickersDay-root:hover': {
                              backgroundColor: amber[100],
                            },
                          }} />
                          <DatePicker defaultValue={dayjs()}
                            onChange={(e) => setSleepDetails({ ...sleepDetails, date: e })}
                            format="DD/MM/YYYY"
                            maxDate={dayjs()}
                            value={sleepDetails.date}
                          />
                        </LocalizationProvider>
                      </div>
                      <div className="mb-3 pt-2">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <GlobalStyles styles={{
                            // Selected clock number
                            '.MuiClockNumber-root.Mui-selected': {
                              backgroundColor: `${amber[300]} !important`,
                              color: 'black !important',
                            },
                            '.MuiClockNumber-root.Mui-selected:hover': {
                              backgroundColor: `${amber[400]} !important`,
                            },
                            '.MuiClockNumber-root:hover': {
                              backgroundColor: `${amber[100]} !important`,
                            },

                            // Clock face
                            '.MuiClock-clock': {
                              backgroundColor: `${amber[100]} !important`,
                            },

                            // Clock needle (pointer)
                            '.MuiClockPointer-root': {
                              backgroundColor: `${amber[400]} !important`,
                            },

                            // Clock needle outer dot (thumb)
                            '.MuiClockPointer-thumb': {
                              backgroundColor: `${amber[500]} !important`,
                              border: `1px solid ${amber[500]} !important`,
                              boxShadow: 'none !important',
                            }

                          }} />
                          <TimePicker label="Start time"
                            value={sleepDetails.starttime}
                            onChange={(e) => setSleepDetails({ ...sleepDetails, starttime: e })}

                          />
                        </LocalizationProvider>

                      </div>
                    </div>
                    <div className='p-3 '>
                      <div className="mb-3 pt-2">
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                          <GlobalStyles styles={{
                            // Selected clock number
                            '.MuiClockNumber-root.Mui-selected': {
                              backgroundColor: `${amber[300]} !important`,
                              color: 'black !important',
                            },
                            '.MuiClockNumber-root.Mui-selected:hover': {
                              backgroundColor: `${amber[400]} !important`,
                            },
                            '.MuiClockNumber-root:hover': {
                              backgroundColor: `${amber[100]} !important`,
                            },

                            // Clock face
                            '.MuiClock-clock': {
                              backgroundColor: `${amber[100]} !important`,
                            },

                            // Clock needle (pointer)
                            '.MuiClockPointer-root': {
                              backgroundColor: `${amber[400]} !important`,
                            },

                            // Clock needle outer dot (thumb)
                            '.MuiClockPointer-thumb': {
                              backgroundColor: `${amber[500]} !important`,
                              border: `1px solid ${amber[500]} !important`,
                              boxShadow: 'none !important',
                            }

                          }} />
                          <TimePicker label="End time"
                            readOnly
                            value={sleepDetails.endtime}
                            onChange={(e) => setSleepDetails({ ...sleepDetails, endtime: e })}
                          />
                        </LocalizationProvider>
                      </div>
                      <div className="mb-3">
                        <OutlinedInput className='mt-2'
                          value={sleepDetails.duration}
                          onChange={(e) => setSleepDetails({ ...sleepDetails, duration: e.target.value })}
                          endAdornment={<InputAdornment position="end">minutes</InputAdornment>}
                        />
                      </div>
                    </div>
                  </div>

                </div>
                {/* footer of modal */}
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button type="button" onClick={handleSleepSubmit} className="inline-flex w-full justify-center rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold ring-1  ring-pink-600 ring-inset text-white shadow-xs hover:bg-white hover:text-pink-600  sm:ml-3 sm:w-auto">Submit</button>
                  <button type="button" onClick={handleSleepReset} className="mt-3 inline-flex w-full justify-center rounded-md bg-amber-200 px-3 py-2 text-sm font-semibold text-black shadow-xs ring-1 ring-amber-300 ring-inset hover:bg-gray-50 hover:text-amber-500 hover:ring-amber-300 sm:mt-0 sm:w-auto">Reset</button>
                </div>
              </div>
            </div>
          </div>
        </div>}

      {modalPumping &&
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

          <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">

                {/* title of modal */}
                <div className="bg-white p-4 flex justify-between items-center sm:px-6">
                  <h1 className='text-pink-600 text-2xl me-10'>Log Pumping</h1>
                  <FontAwesomeIcon onClick={closePumpingModal} className='text-black bg-amber-300 fa-x px-3 py-2 rounded' icon={faXmark} />
                </div>
                {/* boby of modal */}
                <div className="bg-white px-4 pt-3 pb-4 sm:p-6 sm:pb-4">
                  <div className='text-xl'>
                    <span className='italic p-3'>Select Side</span>
                    <input checked={pumpingDetails.side === "Left"} onChange={(e) => setPumpingDetails({ ...pumpingDetails, side: e.target.value })} type="radio" id="left" name="side" value="Left" className='me-2' />
                    <label htmlFor="left" className='me-5'>Left</label>
                    <input checked={pumpingDetails.side === "Right"} onChange={(e) => setPumpingDetails({ ...pumpingDetails, side: e.target.value })} type="radio" id="right" name="side" value="Right" className='me-2' />
                    <label htmlFor="right" className='me-5'>Right</label>

                  </div>
                  <p className='px-3 mt-3'>Select Date, Start time and duration in minutes and quantity in ml</p>
                  <div className="grid grid-cols-2 ">
                    <div className='p-3 '>
                      <div className="mb-3 pt-2">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          {/* Override today's date highlight color */}
                          <GlobalStyles styles={{
                            '.MuiPickersDay-today': {
                              backgroundColor: amber[200] + ' !important',
                              color: 'black',
                              border: '1px solid ' + amber[500],
                            },
                            '.MuiPickersDay-root.Mui-selected': {
                              backgroundColor: amber[300] + ' !important',
                              color: 'black',
                            },
                            '.MuiPickersDay-root.Mui-selected:hover': {
                              backgroundColor: amber[400] + ' !important',
                            },
                            '.MuiPickersDay-root:hover': {
                              backgroundColor: amber[100],
                            },
                          }} />
                          <DatePicker defaultValue={dayjs()}
                            onChange={(e) => setPumpingDetails({ ...pumpingDetails, date: e })}
                            format="DD/MM/YYYY"
                            maxDate={dayjs()}
                            value={pumpingDetails.date}
                          />
                        </LocalizationProvider>
                      </div>
                      <div className="mb-3 pt-2">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <GlobalStyles styles={{
                            // Selected clock number
                            '.MuiClockNumber-root.Mui-selected': {
                              backgroundColor: `${amber[300]} !important`,
                              color: 'black !important',
                            },
                            '.MuiClockNumber-root.Mui-selected:hover': {
                              backgroundColor: `${amber[400]} !important`,
                            },
                            '.MuiClockNumber-root:hover': {
                              backgroundColor: `${amber[100]} !important`,
                            },

                            // Clock face
                            '.MuiClock-clock': {
                              backgroundColor: `${amber[100]} !important`,
                            },

                            // Clock needle (pointer)
                            '.MuiClockPointer-root': {
                              backgroundColor: `${amber[400]} !important`,
                            },

                            // Clock needle outer dot (thumb)
                            '.MuiClockPointer-thumb': {
                              backgroundColor: `${amber[500]} !important`,
                              border: `1px solid ${amber[500]} !important`,
                              boxShadow: 'none !important',
                            }

                          }} />
                          <TimePicker label="Start time"
                            value={pumpingDetails.starttime}
                            onChange={(e) => setPumpingDetails({ ...pumpingDetails, starttime: e })}

                          />
                        </LocalizationProvider>

                      </div>
                    </div>
                    <div className='p-3 '>
                      <div className="mb-3 pt-2">
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                          <GlobalStyles styles={{
                            // Selected clock number
                            '.MuiClockNumber-root.Mui-selected': {
                              backgroundColor: `${amber[300]} !important`,
                              color: 'black !important',
                            },
                            '.MuiClockNumber-root.Mui-selected:hover': {
                              backgroundColor: `${amber[400]} !important`,
                            },
                            '.MuiClockNumber-root:hover': {
                              backgroundColor: `${amber[100]} !important`,
                            },

                            // Clock face
                            '.MuiClock-clock': {
                              backgroundColor: `${amber[100]} !important`,
                            },

                            // Clock needle (pointer)
                            '.MuiClockPointer-root': {
                              backgroundColor: `${amber[400]} !important`,
                            },

                            // Clock needle outer dot (thumb)
                            '.MuiClockPointer-thumb': {
                              backgroundColor: `${amber[500]} !important`,
                              border: `1px solid ${amber[500]} !important`,
                              boxShadow: 'none !important',
                            }

                          }} />
                          <TimePicker label="End time"
                            readOnly
                            value={pumpingDetails.endtime}
                            onChange={(e) => setPumpingDetails({ ...pumpingDetails, endtime: e })}
                          />
                        </LocalizationProvider>
                      </div>
                      <div className="mb-3">
                        <OutlinedInput className='mt-2'
                          value={pumpingDetails.duration}
                          onChange={(e) => setPumpingDetails({ ...pumpingDetails, duration: e.target.value })}
                          endAdornment={<InputAdornment position="end">minutes</InputAdornment>}
                        />
                      </div>
                    </div>
                    <div className='px-3 '>
                      <div className="mb-3">
                        <OutlinedInput
                          value={pumpingDetails.quantity}
                          onChange={(e) => setPumpingDetails({ ...pumpingDetails, quantity: e.target.value })}
                          endAdornment={<InputAdornment position="end">ml</InputAdornment>}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* footer of modal */}
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button type="button" onClick={handlePumpingSubmit} className="inline-flex w-full justify-center rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold ring-1  ring-pink-600 ring-inset text-white shadow-xs hover:bg-white hover:text-pink-600  sm:ml-3 sm:w-auto">Submit</button>
                  <button type="button" onClick={handlePumpingReset} className="mt-3 inline-flex w-full justify-center rounded-md bg-amber-200 px-3 py-2 text-sm font-semibold text-black shadow-xs ring-1 ring-amber-300 ring-inset hover:bg-gray-50 hover:text-amber-500 hover:ring-amber-300 sm:mt-0 sm:w-auto">Reset</button>
                </div>
              </div>
            </div>
          </div>
        </div>}

      {modalPottytime &&
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

          <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">

                {/* title of modal */}
                <div className="bg-white p-4 flex justify-between items-center sm:px-6">
                  <h1 className='text-pink-600 text-2xl me-10'>Log Potty time</h1>
                  <FontAwesomeIcon onClick={closePottytimeModal} className='text-black bg-amber-300 fa-x px-3 py-2 rounded' icon={faXmark} />
                </div>
                {/* boby of modal */}
                <div className="bg-white px-4 pt-3 pb-4 sm:p-6 sm:pb-4">
                  <div className='text-xl'>
                    <p className='italic p-3'>Select Type</p>
                    <input checked={pottytimeDetails.type === "Pee"} onChange={(e) => setPottytimeDetails({ ...pottytimeDetails, type: e.target.value })} type="radio" id="pee" name="type" value="Pee" className='me-2 ms-3' />
                    <label htmlFor="pee" className='me-5'>Pee</label>
                    <input checked={pottytimeDetails.type === "Poop"} onChange={(e) => setPottytimeDetails({ ...pottytimeDetails, type: e.target.value })} type="radio" id="poop" name="type" value="Poop" className='me-2' />
                    <label htmlFor="poop" className='me-5'>Poop</label>
                    <input checked={pottytimeDetails.type === "Pee + Poop"} onChange={(e) => setPottytimeDetails({ ...pottytimeDetails, type: e.target.value })} type="radio" id="pee+poop" name="type" value="Pee + Poop" className='me-2' />
                    <label htmlFor="pee+poop" className='me-5'>Pee + Poop</label>
                  </div>
                  <p className='px-3 mt-3'>Select Date and time</p>
                  <div className="grid grid-cols-2 gap-4 ">
                    <div className="mb-3 pt-2">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {/* Override today's date highlight color */}
                        <GlobalStyles styles={{
                          '.MuiPickersDay-today': {
                            backgroundColor: amber[200] + ' !important',
                            color: 'black',
                            border: '1px solid ' + amber[500],
                          },
                          '.MuiPickersDay-root.Mui-selected': {
                            backgroundColor: amber[300] + ' !important',
                            color: 'black',
                          },
                          '.MuiPickersDay-root.Mui-selected:hover': {
                            backgroundColor: amber[400] + ' !important',
                          },
                          '.MuiPickersDay-root:hover': {
                            backgroundColor: amber[100],
                          },
                        }} />
                        <DatePicker defaultValue={dayjs()}
                          onChange={(e) => setPottytimeDetails({ ...pottytimeDetails, date: e })}
                          format="DD/MM/YYYY"
                          maxDate={dayjs()}
                          value={pottytimeDetails.date}
                        />
                      </LocalizationProvider>
                    </div>
                    <div className="mb-3 pt-2">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <GlobalStyles styles={{
                          // Selected clock number
                          '.MuiClockNumber-root.Mui-selected': {
                            backgroundColor: `${amber[300]} !important`,
                            color: 'black !important',
                          },
                          '.MuiClockNumber-root.Mui-selected:hover': {
                            backgroundColor: `${amber[400]} !important`,
                          },
                          '.MuiClockNumber-root:hover': {
                            backgroundColor: `${amber[100]} !important`,
                          },

                          // Clock face
                          '.MuiClock-clock': {
                            backgroundColor: `${amber[100]} !important`,
                          },

                          // Clock needle (pointer)
                          '.MuiClockPointer-root': {
                            backgroundColor: `${amber[400]} !important`,
                          },

                          // Clock needle outer dot (thumb)
                          '.MuiClockPointer-thumb': {
                            backgroundColor: `${amber[500]} !important`,
                            border: `1px solid ${amber[500]} !important`,
                            boxShadow: 'none !important',
                          }

                        }} />
                        <TimePicker label="Time"
                          value={pottytimeDetails.time}
                          onChange={(e) => setPottytimeDetails({ ...pottytimeDetails, time: e })}

                        />
                      </LocalizationProvider>

                    </div>
                  </div>
                </div>
                {/* footer of modal */}
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button type="button" onClick={handlePottytimeSubmit} className="inline-flex w-full justify-center rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold ring-1  ring-pink-600 ring-inset text-white shadow-xs hover:bg-white hover:text-pink-600  sm:ml-3 sm:w-auto">Submit</button>
                  <button type="button" onClick={handlePottytimeReset} className="mt-3 inline-flex w-full justify-center rounded-md bg-amber-200 px-3 py-2 text-sm font-semibold text-black shadow-xs ring-1 ring-amber-300 ring-inset hover:bg-gray-50 hover:text-amber-500 hover:ring-amber-300 sm:mt-0 sm:w-auto">Reset</button>
                </div>
              </div>
            </div>
          </div>
        </div>}

      {modalPlaytime &&
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

          <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">

                {/* title of modal */}
                <div className="bg-white p-4 flex justify-between items-center sm:px-6">
                  <h1 className='text-pink-600 text-2xl me-10'>Log Play time</h1>
                  <FontAwesomeIcon onClick={closePlaytimeModal} className='text-black bg-amber-300 fa-x px-3 py-2 rounded' icon={faXmark} />
                </div>
                {/* boby of modal */}
                <div className="bg-white px-4 pt-3 pb-4 sm:p-6 sm:pb-4">
                  <div className='text-xl'>
                    <span className='italic p-3'>Description</span>
                    <OutlinedInput className='mt-2 w-56 md:w-80 ms-3'
                      value={playtimeDetails.description}
                      onChange={(e) => setPlaytimeDetails({ ...playtimeDetails, description: e.target.value })}
                    />

                  </div>
                  <p className='px-3 mt-3'>Select Date, Start time and duration in minutes</p>
                  <div className="grid grid-cols-2 ">
                    <div className='p-3 '>
                      <div className="mb-3 pt-2">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          {/* Override today's date highlight color */}
                          <GlobalStyles styles={{
                            '.MuiPickersDay-today': {
                              backgroundColor: amber[200] + ' !important',
                              color: 'black',
                              border: '1px solid ' + amber[500],
                            },
                            '.MuiPickersDay-root.Mui-selected': {
                              backgroundColor: amber[300] + ' !important',
                              color: 'black',
                            },
                            '.MuiPickersDay-root.Mui-selected:hover': {
                              backgroundColor: amber[400] + ' !important',
                            },
                            '.MuiPickersDay-root:hover': {
                              backgroundColor: amber[100],
                            },
                          }} />
                          <DatePicker defaultValue={dayjs()}
                            onChange={(e) => setPlaytimeDetails({ ...playtimeDetails, date: e })}
                            format="DD/MM/YYYY"
                            maxDate={dayjs()}
                            value={playtimeDetails.date}
                          />
                        </LocalizationProvider>
                      </div>
                      <div className="mb-3 pt-2">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <GlobalStyles styles={{
                            // Selected clock number
                            '.MuiClockNumber-root.Mui-selected': {
                              backgroundColor: `${amber[300]} !important`,
                              color: 'black !important',
                            },
                            '.MuiClockNumber-root.Mui-selected:hover': {
                              backgroundColor: `${amber[400]} !important`,
                            },
                            '.MuiClockNumber-root:hover': {
                              backgroundColor: `${amber[100]} !important`,
                            },

                            // Clock face
                            '.MuiClock-clock': {
                              backgroundColor: `${amber[100]} !important`,
                            },

                            // Clock needle (pointer)
                            '.MuiClockPointer-root': {
                              backgroundColor: `${amber[400]} !important`,
                            },

                            // Clock needle outer dot (thumb)
                            '.MuiClockPointer-thumb': {
                              backgroundColor: `${amber[500]} !important`,
                              border: `1px solid ${amber[500]} !important`,
                              boxShadow: 'none !important',
                            }

                          }} />
                          <TimePicker label="Start time"
                            value={playtimeDetails.starttime}
                            onChange={(e) => setPlaytimeDetails({ ...playtimeDetails, starttime: e })}

                          />
                        </LocalizationProvider>

                      </div>
                    </div>
                    <div className='p-3 '>
                      <div className="mb-3 pt-2">
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                          <GlobalStyles styles={{
                            // Selected clock number
                            '.MuiClockNumber-root.Mui-selected': {
                              backgroundColor: `${amber[300]} !important`,
                              color: 'black !important',
                            },
                            '.MuiClockNumber-root.Mui-selected:hover': {
                              backgroundColor: `${amber[400]} !important`,
                            },
                            '.MuiClockNumber-root:hover': {
                              backgroundColor: `${amber[100]} !important`,
                            },

                            // Clock face
                            '.MuiClock-clock': {
                              backgroundColor: `${amber[100]} !important`,
                            },

                            // Clock needle (pointer)
                            '.MuiClockPointer-root': {
                              backgroundColor: `${amber[400]} !important`,
                            },

                            // Clock needle outer dot (thumb)
                            '.MuiClockPointer-thumb': {
                              backgroundColor: `${amber[500]} !important`,
                              border: `1px solid ${amber[500]} !important`,
                              boxShadow: 'none !important',
                            }

                          }} />
                          <TimePicker label="End time"
                            readOnly
                            value={playtimeDetails.endtime}
                            onChange={(e) => setPlaytimeDetails({ ...playtimeDetails, endtime: e })}
                          />
                        </LocalizationProvider>
                      </div>
                      <div className="mb-3">
                        <OutlinedInput className='mt-2'
                          value={playtimeDetails.duration}
                          onChange={(e) => setPlaytimeDetails({ ...playtimeDetails, duration: e.target.value })}
                          endAdornment={<InputAdornment position="end">minutes</InputAdornment>}
                        />
                      </div>
                    </div>
                  </div>

                </div>
                {/* footer of modal */}
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button type="button" onClick={handlePlaytimeSubmit} className="inline-flex w-full justify-center rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold ring-1  ring-pink-600 ring-inset text-white shadow-xs hover:bg-white hover:text-pink-600  sm:ml-3 sm:w-auto">Submit</button>
                  <button type="button" onClick={handlePlaytimeReset} className="mt-3 inline-flex w-full justify-center rounded-md bg-amber-200 px-3 py-2 text-sm font-semibold text-black shadow-xs ring-1 ring-amber-300 ring-inset hover:bg-gray-50 hover:text-amber-500 hover:ring-amber-300 sm:mt-0 sm:w-auto">Reset</button>
                </div>
              </div>
            </div>
          </div>
        </div>}

      {modalBath &&
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

          <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">

                {/* title of modal */}
                <div className="bg-white p-4 flex justify-between items-center sm:px-6">
                  <h1 className='text-pink-600 text-2xl me-10'>Log Bath</h1>
                  <FontAwesomeIcon onClick={closeBathModal} className='text-black bg-amber-300 fa-x px-3 py-2 rounded' icon={faXmark} />
                </div>
                {/* boby of modal */}
                <div className="bg-white px-4 pt-3 pb-4 sm:p-6 sm:pb-4">
                  <p className='px-3 mt-3'>Select Date, Start time and duration in minutes</p>
                  <div className="grid grid-cols-2 ">
                    <div className='p-3 '>
                      <div className="mb-3 pt-2">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          {/* Override today's date highlight color */}
                          <GlobalStyles styles={{
                            '.MuiPickersDay-today': {
                              backgroundColor: amber[200] + ' !important',
                              color: 'black',
                              border: '1px solid ' + amber[500],
                            },
                            '.MuiPickersDay-root.Mui-selected': {
                              backgroundColor: amber[300] + ' !important',
                              color: 'black',
                            },
                            '.MuiPickersDay-root.Mui-selected:hover': {
                              backgroundColor: amber[400] + ' !important',
                            },
                            '.MuiPickersDay-root:hover': {
                              backgroundColor: amber[100],
                            },
                          }} />
                          <DatePicker defaultValue={dayjs()}
                            onChange={(e) => setBathDetails({ ...bathDetails, date: e })}
                            format="DD/MM/YYYY"
                            maxDate={dayjs()}
                            value={bathDetails.date}
                          />
                        </LocalizationProvider>
                      </div>
                      <div className="mb-3 pt-2">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <GlobalStyles styles={{
                            // Selected clock number
                            '.MuiClockNumber-root.Mui-selected': {
                              backgroundColor: `${amber[300]} !important`,
                              color: 'black !important',
                            },
                            '.MuiClockNumber-root.Mui-selected:hover': {
                              backgroundColor: `${amber[400]} !important`,
                            },
                            '.MuiClockNumber-root:hover': {
                              backgroundColor: `${amber[100]} !important`,
                            },

                            // Clock face
                            '.MuiClock-clock': {
                              backgroundColor: `${amber[100]} !important`,
                            },

                            // Clock needle (pointer)
                            '.MuiClockPointer-root': {
                              backgroundColor: `${amber[400]} !important`,
                            },

                            // Clock needle outer dot (thumb)
                            '.MuiClockPointer-thumb': {
                              backgroundColor: `${amber[500]} !important`,
                              border: `1px solid ${amber[500]} !important`,
                              boxShadow: 'none !important',
                            }

                          }} />
                          <TimePicker label="Start time"
                            value={bathDetails.starttime}
                            onChange={(e) => setBathDetails({ ...bathDetails, starttime: e })}

                          />
                        </LocalizationProvider>

                      </div>
                    </div>
                    <div className='p-3 '>
                      <div className="mb-3 pt-2">
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                          <GlobalStyles styles={{
                            // Selected clock number
                            '.MuiClockNumber-root.Mui-selected': {
                              backgroundColor: `${amber[300]} !important`,
                              color: 'black !important',
                            },
                            '.MuiClockNumber-root.Mui-selected:hover': {
                              backgroundColor: `${amber[400]} !important`,
                            },
                            '.MuiClockNumber-root:hover': {
                              backgroundColor: `${amber[100]} !important`,
                            },

                            // Clock face
                            '.MuiClock-clock': {
                              backgroundColor: `${amber[100]} !important`,
                            },

                            // Clock needle (pointer)
                            '.MuiClockPointer-root': {
                              backgroundColor: `${amber[400]} !important`,
                            },

                            // Clock needle outer dot (thumb)
                            '.MuiClockPointer-thumb': {
                              backgroundColor: `${amber[500]} !important`,
                              border: `1px solid ${amber[500]} !important`,
                              boxShadow: 'none !important',
                            }

                          }} />
                          <TimePicker label="End time"
                            readOnly
                            value={bathDetails.endtime}
                            onChange={(e) => setBathDetails({ ...bathDetails, endtime: e })}
                          />
                        </LocalizationProvider>
                      </div>
                      <div className="mb-3">
                        <OutlinedInput className='mt-2'
                          value={bathDetails.duration}
                          onChange={(e) => setBathDetails({ ...bathDetails, duration: e.target.value })}
                          endAdornment={<InputAdornment position="end">minutes</InputAdornment>}
                        />
                      </div>
                    </div>
                  </div>

                </div>
                {/* footer of modal */}
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button type="button" onClick={handleBathSubmit} className="inline-flex w-full justify-center rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold ring-1  ring-pink-600 ring-inset text-white shadow-xs hover:bg-white hover:text-pink-600  sm:ml-3 sm:w-auto">Submit</button>
                  <button type="button" onClick={handleBathReset} className="mt-3 inline-flex w-full justify-center rounded-md bg-amber-200 px-3 py-2 text-sm font-semibold text-black shadow-xs ring-1 ring-amber-300 ring-inset hover:bg-gray-50 hover:text-amber-500 hover:ring-amber-300 sm:mt-0 sm:w-auto">Reset</button>
                </div>
              </div>
            </div>
          </div>
        </div>}

      {modalMilestone &&
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

          <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">

                {/* title of modal */}
                <div className="bg-white p-4 flex justify-between items-center sm:px-6">
                  <h1 className='text-pink-600 text-2xl me-10'>Log Milestone</h1>
                  <FontAwesomeIcon onClick={closeMilestoneModal} className='text-black bg-amber-300 fa-x px-3 py-2 rounded' icon={faXmark} />
                </div>
                {/* boby of modal */}
                <div className="bg-white px-4 pt-3 pb-4 sm:p-6 sm:pb-4">
                  <div className='text-xl'>
                    <span className='italic p-3'>Description</span>
                    <OutlinedInput className='mt-2 w-56 md:w-80 ms-3'
                      value={milestoneDetails.description}
                      onChange={(e) => setMilestoneDetails({ ...milestoneDetails, description: e.target.value })}
                    />

                  </div>
                  <div className='mt-5 flex'>
                    <span className='italic p-3 text-xl me-3'>Select Date</span>
                    <div>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {/* Override today's date highlight color */}
                        <GlobalStyles styles={{
                          '.MuiPickersDay-today': {
                            backgroundColor: amber[200] + ' !important',
                            color: 'black',
                            border: '1px solid ' + amber[500],
                          },
                          '.MuiPickersDay-root.Mui-selected': {
                            backgroundColor: amber[300] + ' !important',
                            color: 'black',
                          },
                          '.MuiPickersDay-root.Mui-selected:hover': {
                            backgroundColor: amber[400] + ' !important',
                          },
                          '.MuiPickersDay-root:hover': {
                            backgroundColor: amber[100],
                          },
                        }} />
                        <DatePicker defaultValue={dayjs()}
                          onChange={(e) => setMilestoneDetails({ ...milestoneDetails, date: e })}
                          format="DD/MM/YYYY"
                          maxDate={dayjs()}
                          value={milestoneDetails.date}
                          className='w-56 md:w-80 ms-7'
                        />
                      </LocalizationProvider>
                    </div>
                  </div>
                </div>
                {/* footer of modal */}
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button type="button" onClick={handleMilestoneSubmit} className="inline-flex w-full justify-center rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold ring-1  ring-pink-600 ring-inset text-white shadow-xs hover:bg-white hover:text-pink-600  sm:ml-3 sm:w-auto">Submit</button>
                  <button type="button" onClick={handleMilestoneReset} className="mt-3 inline-flex w-full justify-center rounded-md bg-amber-200 px-3 py-2 text-sm font-semibold text-black shadow-xs ring-1 ring-amber-300 ring-inset hover:bg-gray-50 hover:text-amber-500 hover:ring-amber-300 sm:mt-0 sm:w-auto">Reset</button>
                </div>
              </div>
            </div>
          </div>
        </div>}

      {modalHealth &&
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

          <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">

                {/* title of modal */}
                <div className="bg-white p-4 flex justify-between items-center sm:px-6">
                  <h1 className='text-pink-600 text-2xl me-10'>Log Health & Vaccines</h1>
                  <FontAwesomeIcon onClick={closeHealthModal} className='text-black bg-amber-300 fa-x px-3 py-2 rounded' icon={faXmark} />
                </div>
                {/* boby of modal */}
                <div className="bg-white px-4 pt-3 pb-4 sm:p-6 sm:pb-4">
                  <div className='text-xl flex mb-4'>
                    <span className='italic p-3 mt-2 me-11'>Type</span>

                    <div>
                      <Select className='mt-2 w-56 md:w-80 ms-3'
                        value={healthDetails.type == "" ? "Type" : healthDetails.type}
                        onChange={(e) => setHealthDetails({ ...healthDetails, type: e.target.value })}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                      >
                        <MenuItem value="Weight">Weight</MenuItem>
                        <MenuItem value="Height">Height</MenuItem>
                        <MenuItem value="Head Circumference">Head Circumference</MenuItem>
                        <MenuItem value="Vaccine">Vaccine</MenuItem>
                        <MenuItem value="Unwell">Unwell</MenuItem>
                        <MenuItem value="Medicine">Medicine</MenuItem>
                      </Select>
                    </div>
                  </div>
                  <div className='text-xl'>
                    <span className='italic p-3'>Description</span>
                    <OutlinedInput className='mt-2 w-56 md:w-80 ms-3'
                      value={healthDetails.description}
                      onChange={(e) => setHealthDetails({ ...healthDetails, description: e.target.value })}
                    />
                  </div>
                  <div className='mt-5 flex'>
                    <span className='italic p-3 text-xl me-3'>Select Date</span>
                    <div>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {/* Override today's date highlight color */}
                        <GlobalStyles styles={{
                          '.MuiPickersDay-today': {
                            backgroundColor: amber[200] + ' !important',
                            color: 'black',
                            border: '1px solid ' + amber[500],
                          },
                          '.MuiPickersDay-root.Mui-selected': {
                            backgroundColor: amber[300] + ' !important',
                            color: 'black',
                          },
                          '.MuiPickersDay-root.Mui-selected:hover': {
                            backgroundColor: amber[400] + ' !important',
                          },
                          '.MuiPickersDay-root:hover': {
                            backgroundColor: amber[100],
                          },
                        }} />
                        <DatePicker defaultValue={dayjs()}
                          onChange={(e) => setHealthDetails({ ...healthDetails, date: e })}
                          format="DD/MM/YYYY"
                          maxDate={dayjs()}
                          value={healthDetails.date}
                          className='w-56 md:w-80 ms-7'
                        />
                      </LocalizationProvider>
                    </div>
                  </div>
                  <div className='mt-5 flex'>
                    <span className='italic p-3 text-xl me-3'>Select Time</span>
                    <div>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <GlobalStyles styles={{
                          // Selected clock number
                          '.MuiClockNumber-root.Mui-selected': {
                            backgroundColor: `${amber[300]} !important`,
                            color: 'black !important',
                          },
                          '.MuiClockNumber-root.Mui-selected:hover': {
                            backgroundColor: `${amber[400]} !important`,
                          },
                          '.MuiClockNumber-root:hover': {
                            backgroundColor: `${amber[100]} !important`,
                          },

                          // Clock face
                          '.MuiClock-clock': {
                            backgroundColor: `${amber[100]} !important`,
                          },

                          // Clock needle (pointer)
                          '.MuiClockPointer-root': {
                            backgroundColor: `${amber[400]} !important`,
                          },

                          // Clock needle outer dot (thumb)
                          '.MuiClockPointer-thumb': {
                            backgroundColor: `${amber[500]} !important`,
                            border: `1px solid ${amber[500]} !important`,
                            boxShadow: 'none !important',
                          }

                        }} />
                        <TimePicker defaultValue={dayjs()}
                          value={healthDetails.time}
                          onChange={(e) => setHealthDetails({ ...healthDetails, time: e })}
                          className='w-56 md:w-80 ms-7'

                        />
                      </LocalizationProvider>
                    </div>

                  </div>
                </div>
                {/* footer of modal */}
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button type="button" onClick={handleHealthSubmit} className="inline-flex w-full justify-center rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold ring-1  ring-pink-600 ring-inset text-white shadow-xs hover:bg-white hover:text-pink-600  sm:ml-3 sm:w-auto">Submit</button>
                  <button type="button" onClick={handleHealthReset} className="mt-3 inline-flex w-full justify-center rounded-md bg-amber-200 px-3 py-2 text-sm font-semibold text-black shadow-xs ring-1 ring-amber-300 ring-inset hover:bg-gray-50 hover:text-amber-500 hover:ring-amber-300 sm:mt-0 sm:w-auto">Reset</button>
                </div>
              </div>
            </div>
          </div>
        </div>}


    </>
  )
}

export default Dashboard