import React, { useState } from 'react'
import Header from '../components/Header'
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { GlobalStyles } from '@mui/material';
import { amber } from '@mui/material/colors';
import { toast } from 'react-toastify';
import { loginApi, registerApi } from '../services/allApis';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Auth({ register }) {
    const navigate = useNavigate()
    const [hiddenpasswd1, sethiddenpasswd1] = useState("password")
    const [hiddenpasswd2, sethiddenpasswd2] = useState("password")
    const [validEmail, setvalidEmail] = useState(true)
    const [registrationDetails, setRegistrationDetails] = useState({
        fullname: "",
        email: "",
        password: "",
        cpassword: "",
        dob: dayjs(),
        gender: "",
        babyname: "Your baby"
    })

    // console.log(registrationDetails);
// function to check validity of email
    const checkValidity = (e) => {
        setRegistrationDetails({ ...registrationDetails, email: e.target.value })
        if (!!e.target.value.match('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')) { // regex for email
            setvalidEmail(true)
        } else {
            setvalidEmail(false)
        }

    }
    //function to handle register
    const handleRegister = async () => {
        const { fullname, email, password, cpassword, dob, gender, babyname } = registrationDetails


        if (!fullname || !email || !password || !cpassword || !dob || !gender) {
            toast.warning("Please fill all fields.")
        } else {
            if (password != cpassword) {
                toast.warning("Passwords entered doesnot match.")
            } else {
                const dob1 = dob.format('YYYY-MM-DD')
                if (babyname == '') {
                    const babyname1 = "Your baby"
                    const result = await registerApi({ fullname, email, password, dob: dob1, gender, name: babyname1 }) // the keys should be same as that of backend, key value pair same, so only one
                    if (result.status == 200) {
                        toast.success("Registration Successful. Please Login")
                        setRegistrationDetails({
                            fullname: "",
                            email: "",
                            password: "",
                            cpassword: "",
                            dob: dayjs(),
                            gender: "",
                            babyname: "Your baby"
                        })
                        navigate('/login')
                    } else if (result.status == 409) {
                        toast.warning("User already exists. Please Login") // respose data is in backed as ""
                        setRegistrationDetails({
                            fullname: "",
                            email: "",
                            password: "",
                            cpassword: "",
                            dob: dayjs(),
                            gender: "",
                            babyname: "Your baby"
                        })
                    } else {
                        console.log(result.data);
                        
                        toast.error("Something went wrong!")
                        setRegistrationDetails({
                            fullname: "",
                            email: "",
                            password: "",
                            cpassword: "",
                            dob: dayjs(),
                            gender: "",
                            babyname: "Your baby"
                        })
                    }
                } else {
                    const result = await registerApi({ fullname, email, password, dob: dob1, gender, name: babyname }) // the keys should be same as that of backend, key value pair same, so only one
                    if (result.status == 200) {
                        toast.success("Registration Successful. Please Login")
                        setRegistrationDetails({
                            fullname: "",
                            email: "",
                            password: "",
                            cpassword: "",
                            dob: dayjs(),
                            gender: ""
                        })
                        navigate('/login')
                    } else if (result.status == 409) {
                        toast.warning("User already exists. Please Login") // respose data is in backed as ""
                        setRegistrationDetails({
                            fullname: "",
                            email: "",
                            password: "",
                            cpassword: "",
                            dob: dayjs(),
                            gender: "",
                            babyname: "Your baby"
                        })
                    } else {
                        toast.error("Something went wrong!")
                        setRegistrationDetails({
                            fullname: "",
                            email: "",
                            password: "",
                            cpassword: "",
                            dob: dayjs(),
                            gender: ""
                        })
                    }
                }

            }
        }
    }
    //function to handle login
    const handleLogin = async () => {
        const { email, password } = registrationDetails
        console.log(email, password);
        
        if (!email || !password) {
            toast.error("Pls fill all the fields.")
        } else {
            const result = await loginApi({ email, password })
            console.log(result);
            if (result.status == 200) {
                toast.success("Login Successful")
                sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
                sessionStorage.setItem("token", result.data.token)
                setTimeout(() => {
                    if (result.data.existingUser.email == 'admin@bc.com') {
                        navigate('/admin_home')
                    } else {
                        navigate('/dashboard')
                    }
                }, 2500)
            } else if (result.status == 404 || result.status == 401) {
                toast.warning(result.response.data) // respose data is in backed as ""
                setRegistrationDetails({
                    fullname: "",
                    email: "",
                    password: "",
                    cpassword: "",
                    dob: dayjs(),
                    gender: "",
                    babyname: "Your baby"
                })
            } else {
                toast.error("Something went wrong!")
                setRegistrationDetails({
                    fullname: "",
                    email: "",
                    password: "",
                    cpassword: "",
                    dob: dayjs(),
                    gender: "",
                    babyname: "Your baby"
                })
            }

        }

    }
    return (
        <>
            <Header />
            <div className='md:grid grid-cols-2'>
                <div className='mt-10'>
                    <div className='text-center'>
                        {register && <h1 className='text-3xl'>REGISTER</h1>}
                        {!register && <h1 className='text-3xl'>LOGIN</h1>}
                        {register && <p className='italic'>Create Your BabyChronicles Account. Start logging every giggle, nap, and diaper with ease.</p>}
                        {!register && <p className='italic'>Welcome Back to BabyChronicles. Log in to continue tracking your little one’s journey.</p>}
                    </div>
                    <div className='bg-amber-200 mx-10 mt-10 rounded'>
                        {register && <div className='px-8 py-5'>
                            <input type="text" value={registrationDetails.fullname} onChange={(e) => setRegistrationDetails({ ...registrationDetails, fullname: e.target.value })} placeholder='Full Name' className='bg-white rounded py-2 ps-2 w-full' />
                        </div>}
                        <div className={register ? 'px-8 pb-5' : 'px-8 py-5'}>
                            <input type="text" value={registrationDetails.email} onChange={(e) => checkValidity(e)} placeholder='Email Address' className='bg-white rounded py-2 ps-2 w-full' /> {!validEmail && <span className='text-red-600 ms-3'>*Invalid Input</span>}
                        </div>
                        <div className='px-8 pb-5'>
                            <input type={hiddenpasswd1} value={registrationDetails.password} onChange={(e) => setRegistrationDetails({ ...registrationDetails, password: e.target.value })} placeholder='Password' className='bg-white rounded py-2 ps-2 w-full' />{hiddenpasswd1 == "password" ? <FontAwesomeIcon onClick={() => sethiddenpasswd1("text")} icon={faEye} style={{ marginLeft: "-30px", color: "gray" }} /> : <FontAwesomeIcon onClick={() => sethiddenpasswd1("password")} icon={faEyeSlash} style={{ marginLeft: "-30px", color: "gray" }} />}
                        </div>
                        {register && <div className='px-8 pb-5'>
                            <input type={hiddenpasswd2} value={registrationDetails.cpassword} onChange={(e) => setRegistrationDetails({ ...registrationDetails, cpassword: e.target.value })} placeholder='Confirm Password' className='bg-white rounded py-2 ps-2 w-full' />{hiddenpasswd2 == "password" ? <FontAwesomeIcon onClick={() => sethiddenpasswd2("text")} icon={faEye} style={{ marginLeft: "-30px", color: "gray" }} /> : <FontAwesomeIcon onClick={() => sethiddenpasswd2("password")} icon={faEyeSlash} style={{ marginLeft: "-30px", color: "gray" }} />}
                        </div>}
                        {register && <div className='grid grid-cols-2 ms-8 gap-4 mb-5'>
                            <div>
                                <p className='italic'>Baby's Date of birth</p>
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
                                        format="DD/MM/YYYY"
                                        maxDate={dayjs()}
                                        value={registrationDetails.dob} onChange={(e) => setRegistrationDetails({ ...registrationDetails, dob: e })}
                                        slotProps={{
                                            textField: {
                                                size: 'small', // makes the input box shorter
                                                sx: {
                                                    backgroundColor: 'white',
                                                    fontSize: '0.5rem',        // reduce font size inside the input
                                                    height: '40px',            // smaller height
                                                    '& .MuiInputBase-input': {
                                                        fontSize: '0.5rem',      // reduce font size of the input text
                                                        padding: '8px',          // reduce padding
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        fontSize: '0.5rem',     // reduce label font size
                                                    },
                                                },
                                            }
                                        }} />
                                </LocalizationProvider>

                            </div>
                            <div>
                                <p className='italic'>Baby's Gender</p>
                                <input checked={registrationDetails.gender === "Girl"} onChange={(e) => setRegistrationDetails({ ...registrationDetails, gender: e.target.value })} type="radio" id="girl" name="gender" value="Girl" className='me-2' />
                                <label htmlFor="girl" className='me-5'>Girl</label>
                                <input checked={registrationDetails.gender === "Boy"} onChange={(e) => setRegistrationDetails({ ...registrationDetails, gender: e.target.value })} type="radio" id="boy" name="gender" value="Boy" className='me-2' />
                                <label htmlFor="boy">Boy</label>
                            </div>
                            <div >
                                <p className='italic'>Baby's Name</p>
                                <input type="text" value={registrationDetails.babyname} onChange={(e) => setRegistrationDetails({ ...registrationDetails, babyname: e.target.value })} placeholder='Your Baby' className='bg-white rounded py-2 ps-2 w-full' />
                            </div>

                        </div>}

                        {register && <div className='text-center'>
                            <button type='button' onClick={handleRegister} className='bg-rose-700 text-white px-3 py-1 rounded mb-5'>REGISTER</button>
                        </div>}
                        {!register && <div className='text-center'>
                            <button onClick={handleLogin} className='bg-rose-700 text-white px-3 py-1 rounded mb-5'>LOGIN</button>
                        </div>}
                    </div>
                    {register && <p className='text-center my-2'>Already a User? <Link to={'/login'} className='text-blue-600'>Login</Link>.</p>}
                    {!register && <p className='text-center my-2'>Are you a new User? <Link to={'/register'} className='text-blue-600'>Register</Link>.</p>}

                </div>
                <div className='mt-5 text-center'>
                    <img src="/register-baby.png" className='h-full mx-auto' alt="" />
                </div>

            </div >

        </>
    )
}

export default Auth