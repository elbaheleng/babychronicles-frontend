import React, { useContext, useEffect, useState } from 'react'
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { GlobalStyles } from '@mui/material';
import { amber } from '@mui/material/colors';
import { addANewBabyApi, editBabyDetailsApi } from '../services/allApis';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import OutlinedInput from '@mui/material/OutlinedInput';
import { toast } from 'react-toastify';
import { addBabyStatusContext, babyContext } from '../context/Contexttoshare';
import { Link } from 'react-router-dom';


function Buttonstackdashboard() {
    const { setAddBabyStatus } = useContext(addBabyStatusContext)
    const { baby, setBaby } = useContext(babyContext)

    const [modalAddBaby, setModalAddBaby] = useState(false)
    const [modalEditBaby, setModalEditBaby] = useState(false)
    const [token, settoken] = useState("")

    const [addBabyDetails, setAddBabyDetails] = useState({
        dob: dayjs(),
        gender: "",
        name: ""
    })
    const [editBabyDetails, setEditBabyDetails] = useState(baby)
    const [userDetails, setUserDetails] = useState({})


    const closeAddBabyModal = () => {
        setModalAddBaby(false)
        handleAddBabyReset()
    }
    const closeEditBabyModal = () => {
        setModalEditBaby(false)
        handleEditBabyReset()
    }
    const handleAddBabyReset = () => {
        setAddBabyDetails({
            dob: dayjs(),
            gender: "",
            name: ""
        })
    }
    const handleEditBabyReset = () => {
        setEditBabyDetails(baby)
    }
    //function to add a new baby
    const handleAddBaby = async () => {
        const { dob, gender, name } = addBabyDetails
        const dob1 = dob.format('YYYY-MM-DD')
        const usermail = userDetails.email
        //console.log(dob, gender, name,usermail);
        const result = await addANewBabyApi({ dob: dob1, gender, name, usermail })
        if (result.status == 200) {
            setAddBabyStatus(result.data)
            toast.success("New baby added. Babies can be selected using the dropdown on this page")
            closeAddBabyModal()
        }
        else if (result.status == 400) {
            toast.error("Baby already added.")
            closeAddBabyModal()
        }
        else {
            toast.error("Something went wrong")
            closeAddBabyModal()
        }

    }
    //console.log(editBabyDetails);

    //function to handle edit baby
    const handleEditBaby = async () => {
        const { _id, dob, gender, name, userMail } = editBabyDetails
        if (dob == baby.dob) {
            const result = await editBabyDetailsApi({ _id, dob, gender, name, userMail })
            if (result.status == 200) {
                setBaby(result.data)
                localStorage.setItem("baby", JSON.stringify(result.data))
                toast.success("Baby details updated.")
                closeEditBabyModal()
            }
            else {
                toast.error("Something went wrong")
                closeEditBabyModal()
            }
        } else {
            const dob1 = dob.format('YYYY-MM-DD')
            const result = await editBabyDetailsApi({ _id, dob: dob1, gender, name, userMail })
            if (result.status == 200) {
                setBaby(result.data)
                localStorage.setItem("baby", JSON.stringify(result.data))
                toast.success("Baby details updated.")
                closeEditBabyModal()
            }
            else {
                toast.error("Something went wrong")
                closeEditBabyModal()
            }
        }



    }
    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            const user = JSON.parse(sessionStorage.getItem("existingUser"))
            const tok = sessionStorage.getItem("token")
            const storedBaby = sessionStorage.getItem("baby");
            const baby1 = storedBaby ? JSON.parse(storedBaby) : {
                name: "",
                gender: "",
                dob: dayjs(),
                _id: "",
                userMail: ""
            };

            setUserDetails(user)
            setEditBabyDetails(baby1)
            settoken(tok)



        }
    }, [baby])
    return (
        <div className='m-3 flex justify-center items-center'>
            <div className='m-2'>
                <Link to={'/imagegallery'}> <button className='bg-amber-200 px-3 py-0.5 rounded'>Image Gallery</button></Link>
            </div>
            <div className='m-2'>
                <button type='button' onClick={() => setModalEditBaby(true)} className='bg-amber-200 px-3 py-0.5 rounded'>Edit Baby</button>
            </div>
            <div className='m-2'>
                <button type='button' onClick={() => setModalAddBaby(true)} className='bg-amber-200 px-3 py-0.5 rounded'>Add Baby </button>
            </div>
            <div className='m-2'>
                <Link to={'/store'}><button className='bg-amber-200 px-3 py-0.5 rounded'>Store</button></Link>
            </div>
            {modalAddBaby &&
                <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

                    <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">

                                {/* title of modal */}
                                <div className="bg-white p-4 flex justify-between items-center sm:px-6">
                                    <h1 className='text-pink-600 text-2xl me-10'>Add Baby</h1>
                                    <FontAwesomeIcon onClick={closeAddBabyModal} className='text-black bg-amber-300 fa-x px-3 py-2 rounded' icon={faXmark} />
                                </div>
                                {/* boby of modal */}
                                <div className="bg-white px-4 pt-3 pb-4 sm:p-6 sm:pb-4">
                                    <div className='text-xl flex mb-4'>
                                        <span className='italic p-3 mt-2 me-11'>Gender</span>
                                        <div>
                                            <div className='text-xl mt-5'>
                                                <input checked={addBabyDetails.gender === "Girl"} onChange={(e) => setAddBabyDetails({ ...addBabyDetails, gender: e.target.value })} type="radio" id="girl" name="gender" value="Girl" className='me-2' />
                                                <label htmlFor="girl" className='me-5'>Girl</label>
                                                <input checked={addBabyDetails.gender === "Boy"} onChange={(e) => setAddBabyDetails({ ...addBabyDetails, gender: e.target.value })} type="radio" id="boy" name="gender" value="Boy" className='me-2' />
                                                <label htmlFor="boy" className='me-5'>Boy</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='mt-5 flex'>
                                        <span className='italic p-3 text-xl me-3'>Date of birth</span>
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
                                                    onChange={(e) => setAddBabyDetails({ ...addBabyDetails, dob: e })}
                                                    format="DD/MM/YYYY"
                                                    maxDate={dayjs()}
                                                    value={addBabyDetails.dob}
                                                    className='w-56 md:w-80 ms-7'
                                                />

                                            </LocalizationProvider>
                                        </div>
                                    </div>
                                    <div className='text-xl'>
                                        <span className='italic p-3'>Baby Name</span>
                                        <OutlinedInput className='mt-2 w-56 md:w-80 ms-5'
                                            value={addBabyDetails.name}
                                            onChange={(e) => setAddBabyDetails({ ...addBabyDetails, name: e.target.value })}
                                        />
                                    </div>
                                </div>
                                {/* footer of modal */}
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button type="button" onClick={handleAddBaby} className="inline-flex w-full justify-center rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold ring-1  ring-pink-600 ring-inset text-white shadow-xs hover:bg-white hover:text-pink-600  sm:ml-3 sm:w-auto">Submit</button>
                                    <button type="button" onClick={handleAddBabyReset} className="mt-3 inline-flex w-full justify-center rounded-md bg-amber-200 px-3 py-2 text-sm font-semibold text-black shadow-xs ring-1 ring-amber-300 ring-inset hover:bg-gray-50 hover:text-amber-500 hover:ring-amber-300 sm:mt-0 sm:w-auto">Reset</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
            {modalEditBaby &&
                <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

                    <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">

                                {/* title of modal */}
                                <div className="bg-white p-4 flex justify-between items-center sm:px-6">
                                    <h1 className='text-pink-600 text-2xl me-10'>Edit Baby</h1>
                                    <FontAwesomeIcon onClick={closeEditBabyModal} className='text-black bg-amber-300 fa-x px-3 py-2 rounded' icon={faXmark} />
                                </div>
                                {/* boby of modal */}
                                <div className="bg-white px-4 pt-3 pb-4 sm:p-6 sm:pb-4">
                                    <div className='text-xl flex mb-4'>
                                        <span className='italic p-3 mt-2 me-11'>Gender</span>
                                        <div>
                                            <div className='text-xl mt-5'>
                                                <input checked={editBabyDetails.gender === "Girl"} onChange={(e) => setEditBabyDetails({ ...editBabyDetails, gender: e.target.value })} type="radio" id="girl" name="gender" value="Girl" className='me-2' />
                                                <label htmlFor="girl" className='me-5'>Girl</label>
                                                <input checked={editBabyDetails.gender === "Boy"} onChange={(e) => setEditBabyDetails({ ...editBabyDetails, gender: e.target.value })} type="radio" id="boy" name="gender" value="Boy" className='me-2' />
                                                <label htmlFor="boy" className='me-5'>Boy</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='mt-5 flex'>
                                        <span className='italic p-3 text-xl me-3'>Date of birth</span>
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
                                                <DatePicker defaultValue={dayjs(editBabyDetails.dob)}
                                                    onChange={(e) => setEditBabyDetails({ ...editBabyDetails, dob: e })}
                                                    format="DD/MM/YYYY"
                                                    maxDate={dayjs()}
                                                    value={dayjs(editBabyDetails.dob)}
                                                    className='w-56 md:w-80 ms-7'
                                                />
                                            </LocalizationProvider>
                                        </div>
                                    </div>
                                    <div className='text-xl'>
                                        <span className='italic p-3'>Baby Name</span>
                                        <OutlinedInput className='mt-2 w-56 md:w-80 ms-5'
                                            value={editBabyDetails.name}
                                            onChange={(e) => setEditBabyDetails({ ...editBabyDetails, name: e.target.value })}
                                        />
                                    </div>
                                </div>
                                {/* footer of modal */}
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button type="button" onClick={handleEditBaby} className="inline-flex w-full justify-center rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold ring-1  ring-pink-600 ring-inset text-white shadow-xs hover:bg-white hover:text-pink-600  sm:ml-3 sm:w-auto">Submit</button>
                                    <button type="button" onClick={handleEditBabyReset} className="mt-3 inline-flex w-full justify-center rounded-md bg-amber-200 px-3 py-2 text-sm font-semibold text-black shadow-xs ring-1 ring-amber-300 ring-inset hover:bg-gray-50 hover:text-amber-500 hover:ring-amber-300 sm:mt-0 sm:w-auto">Reset</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
        </div>
    )
}

export default Buttonstackdashboard