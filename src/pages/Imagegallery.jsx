import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import { babyContext } from '../context/Contexttoshare'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { GlobalStyles } from '@mui/material';
import { amber } from '@mui/material/colors';
import OutlinedInput from '@mui/material/OutlinedInput';
import { toast } from 'react-toastify'
import { addPhotoApi, deletePhotoApi, getAllPhotosApi } from '../services/allApis'
import { serverurl } from '../services/serverurl'


function Imagegallery() {
    const { baby, setBaby } = useContext(babyContext)
    const [modalOpenImage, setModalOpenImage] = useState(false)
    const [modalUploadImage, setModalUploadImage] = useState(false)
    const [uploadPhotoDetails, setUploadPhotoDetails] = useState({
        photo: "",
        title: "",
        description: "",
        date: dayjs()
    })
    const [photoAddDeleteStatus, setPhotoAddDeleteStatus] = useState({})
    const [allPhotos, setAllPhotos] = useState([])

    const handleReset = () => {
        setUploadPhotoDetails({
            photo: "",
            title: "",
            description: "",
            date: dayjs()
        })
    }
    const closeModalUploadImage = () => {
        handleReset()
        setModalUploadImage(false)
    }
    const handleFileUpload = (e) => {
        setUploadPhotoDetails({ ...uploadPhotoDetails, photo: e.target.files[0] })
        e.target.value = ''
    }
    const handleUpload = async () => {

        const { photo, title, description, date } = uploadPhotoDetails
        if (!photo || !title || !description || !date) {
            toast.warning("Please fill all the fields")
        }
        else {
            const babyid = JSON.parse(localStorage.getItem("baby"))._id
            const reqBody = new FormData()
            for (let key in uploadPhotoDetails) {
                reqBody.append(key, uploadPhotoDetails[key])
            }
            reqBody.append("babyid", babyid)
            const result = await addPhotoApi(reqBody)
            if (result.status == 200) {
                setPhotoAddDeleteStatus(result.data)
                closeModalUploadImage()
            } else if (result.status == 401) {
                toast.info(result.response.data)
                handleReset()
            } else {
                toast.error("Something went wrong")
                closeModalUploadImage()
            }
        }
    }

    const getPhotos = async (babyid) => {
        const result = await getAllPhotosApi(babyid)
        if (result.status == 200) {
            setAllPhotos(result.data)
            
        } else {
            toast.error("Something went wrong")
        }

    }
    const deletePhoto = async (id) => {
       // console.log(id);
        
       const result = await deletePhotoApi(id)
      //  console.log(result);
        
        if (result.status == 200) {
            toast.info("Photo delete successful.")
            setPhotoAddDeleteStatus(result.data)
        } else {
            toast.error("Something went wrong")
        }
    }
    useEffect(() => {
        const baby1 = JSON.parse(localStorage.getItem("baby"))
        // console.log(baby1);
        setBaby(baby1)
        getPhotos(baby1._id)
    }, [photoAddDeleteStatus])
    return (
        <>
            <Header />
            <div>
                <h1 className='text-3xl text-center mt-20'>{baby?.name}'s Image Gallery</h1>
                <div className='text-end  me-5 md:me-20 '>
                    <button onClick={() => setModalUploadImage(true)} className='bg-pink-700 text-white px-3 py-2 rounded me-3'>Upload New Image</button>
                    <Link to={'/dashboard'}><button className='bg-pink-700 text-white px-3 py-2 rounded'>Back Home</button></Link>
                </div>
                {allPhotos?.length > 0 ? <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 m-5'>
                    {allPhotos?.map((item, index) => (
                        <div className="max-w-sm rounded overflow-hidden shadow-lg" key={index}>
                            <img onClick={() => setModalOpenImage(true)} className="w-full transition-transform duration-300 ease-in-out transform hover:scale-110" src={`${serverurl}/uploads/${item?.photo}`} alt="baby photo" />
                            <div className="p-4">
                                <div className="font-bold mb-2">{item?.title}</div>
                                <p className="text-gray-700">
                                    {item?.description}
                                </p>
                                <div className='flex justify-between mt-3'>
                                    <p>Clicked on: {dayjs(item?.date).format('DD/MM/YYYY')}</p>
                                    <button type='button' onClick={() => deletePhoto(item?._id)} className=' text-sm text-white bg-red-600 px-1 py-0.5 md:px-2 md:py-1 rounded hover:bg-red-800'><FontAwesomeIcon icon={faTrashCan} /></button>
                                </div>
                            </div>
                        </div>
                    ))}

                </div> :
                    <p className='text-center'>No photos added yet.</p>
                }
            </div>
            {modalOpenImage &&
                <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

                    <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                {/* title of modal */}
                                <div className="bg-white p-4 flex justify-between items-center sm:px-6">
                                    <h1 className='text-pink-600 text-2xl me-10'>View Photo</h1>
                                    <FontAwesomeIcon onClick={() => setModalOpenImage(false)} className='text-black bg-amber-300 fa-x px-3 py-2 rounded' icon={faXmark} />
                                </div>
                                {/* boby of modal */}
                                <div className="bg-white px-4 pt-3 pb-4 sm:p-6 sm:pb-4">
                                    <img src="https://img.freepik.com/free-photo/shot-cute-baby-girl-looking-camera_329181-19580.jpg?semt=ais_hybrid&w=740" alt="no image" />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>}

            {modalUploadImage &&
                <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

                    <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">

                                {/* title of modal */}
                                <div className=" p-4 flex justify-between items-center sm:px-6">
                                    <h1 className='text-pink-600 text-2xl me-10'>Add Photo</h1>
                                    <FontAwesomeIcon onClick={closeModalUploadImage} className='text-black bg-amber-300 fa-x px-3 py-2 rounded' icon={faXmark} />
                                </div>
                                {/* boby of modal */}
                                <div className=" px-4 pt-3 pb-4 sm:p-6 sm:pb-4">
                                    <div className='text-xl flex mb-4'>
                                        {/* <span className='italic p-3 mt-2 me-11'>File Upload</span> */}
                                        <div className='text-xl mt-5 ms-3'>
                                            <div className="flex items-center space-x-4 mb-2">
                                                <label htmlFor="photo" className="cursor-pointer inline-flex items-center px-3 py-1 bg-pink-600 text-white font-medium rounded-lg shadow hover:bg-pink-400 transition">
                                                    Select File
                                                </label>
                                                <span className="text-gray-600 text-sm">{uploadPhotoDetails?.photo?.name || "No file selected"}</span>
                                                <input
                                                    onChange={(e) =>
                                                        handleFileUpload(e)
                                                    }
                                                    type="file"
                                                    id="photo"
                                                    className="hidden"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='mt-5 flex'>
                                        <span className='italic p-3 text-xl me-3'>Clicked on</span>
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
                                                    onChange={(e) => setUploadPhotoDetails({ ...uploadPhotoDetails, date: e })}
                                                    format="DD/MM/YYYY"
                                                    maxDate={dayjs()}
                                                    value={uploadPhotoDetails.date}
                                                    className='w-56 md:w-80 ms-7'
                                                />

                                            </LocalizationProvider>
                                        </div>
                                    </div>
                                    <div className='text-xl'>
                                        <span className='italic p-3'>Title</span>
                                        <OutlinedInput className='mt-2 w-56 md:w-80 ms-12'
                                            value={uploadPhotoDetails.title}
                                            onChange={(e) => setUploadPhotoDetails({ ...uploadPhotoDetails, title: e.target.value })}
                                        />
                                    </div>
                                    <div className='text-xl'>
                                        <span className='italic p-3'>Description</span>
                                        <OutlinedInput className='mt-2 w-56 md:w-80'
                                            value={uploadPhotoDetails.description}
                                            onChange={(e) => setUploadPhotoDetails({ ...uploadPhotoDetails, description: e.target.value })}
                                        />
                                    </div>
                                </div>
                                {/* footer of modal */}
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button type="button" onClick={handleUpload} className="inline-flex w-full justify-center rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold ring-1  ring-pink-600 ring-inset text-white shadow-xs hover:bg-white hover:text-pink-600  sm:ml-3 sm:w-auto">Submit</button>
                                    <button type="button" onClick={handleReset} className="mt-3 inline-flex w-full justify-center rounded-md bg-amber-200 px-3 py-2 text-sm font-semibold text-black shadow-xs ring-1 ring-amber-300 ring-inset hover:bg-gray-50 hover:text-amber-500 hover:ring-amber-300 sm:mt-0 sm:w-auto">Reset</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}

        </>
    )
}

export default Imagegallery