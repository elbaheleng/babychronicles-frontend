import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { addProductApi, deleteProductApi, editProductDetailsApi, getAllProductsApi, getAllUsersApi } from '../services/allApis';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons'
import OutlinedInput from '@mui/material/OutlinedInput';
import { serverurl } from '../services/serverurl'
import InputAdornment from '@mui/material/InputAdornment';



function AdminHome() {
    const [activeTab, setActiveTab] = useState('users');
    const [token, setToken] = useState("")
    const [allUsers, setAllUsers] = useState([])
    const [allProducts, setAllProducts] = useState([])
    const [modalUploadProduct, setModalUploadProduct] = useState(false)
    const [uploadProductDetails, setUploadProductDetails] = useState({
        title: "",
        gender: "",
        description: "",
        photo: "",
        price: 0,
        stock: 0
    })
    const [currentProduct, setCurrentProduct] = useState({})
    const [updateProduct, setUpdateProduct] = useState({
        price: 0,
        stock: 0
    })
    const [modalEditProduct, setModalEditProduct] = useState(false)
    const [productAddDeleteStatus, setProductAddDeleteStatus] = useState({})

    const openEditModal = (item) => {
        setCurrentProduct(item)
        setModalEditProduct(true)
    }
    const getAllUsers = async (tok) => {
        const reqHeader = {
            "Authorization": `Bearer ${tok}`
        }
        const result = await getAllUsersApi(reqHeader)
        if (result.status == 200) {
            setAllUsers(result.data)
            //console.log(result.data);

        } else {
            toast.error("Something went wrong")
        }
    }

    const getAllProducts = async () => {

        const result = await getAllProductsApi()
        if (result.status == 200) {
            setAllProducts(result.data)
            //console.log(result.data);

        } else {
            toast.error("Something went wrong")
        }
    }
    const handleReset = () => {
        setUploadProductDetails({
            title: "",
            gender: "",
            description: "",
            photo: "",
            price: 0,
            stock: 0
        })
    }
    const handleResetEdit = () => {
        setUpdateProduct({
            price: 0,
            stock: 0
        })
    }
    const closeModalUploadProduct = () => {
        handleReset()
        setModalUploadProduct(false)
    }
    const closeModalEditProduct = () => {

        handleResetEdit()
        setModalEditProduct(false)

    }
    const handleFileUpload = (e) => {
        setUploadProductDetails({ ...uploadProductDetails, photo: e.target.files[0] })
        e.target.value = ''
    }
    //console.log(uploadProductDetails);

    //handle product upload
    const handleUpload = async () => {
        // console.log(uploadProductDetails);
        const { title, gender, description, price, stock, photo } = uploadProductDetails
        if (!title || !gender || !description || !price || !stock || !photo) {
            toast.warning("Please fill all the fields")
        }
        else {
            const reqBody = new FormData()
            for (let key in uploadProductDetails) {
                reqBody.append(key, uploadProductDetails[key])
            }
            const result = await addProductApi(reqBody)
            if (result.status == 200) {
                setProductAddDeleteStatus(result.data)
                closeModalUploadProduct()
            } else if (result.status == 401) {
                toast.info(result.response.data)
                handleReset()
            } else {
                toast.error("Something went wrong")
                closeModalUploadProduct()
            }
        }

    }

    const deleteProduct = async (id) => {
        const result = await deleteProductApi(id)

        if (result.status == 200) {
            toast.info("Product delete successful.")
            setProductAddDeleteStatus(result.data)
        } else {
            toast.error("Something went wrong")
        }
    }

    const handleUploadEdit = async () => {
        const { _id } = currentProduct
        const { price, stock } = updateProduct
        const result = await editProductDetailsApi({ _id, price, stock })
        if (result.status == 200) {
            toast.success("Product details updated.")
            setProductAddDeleteStatus(result.data)
            closeModalEditProduct()
        } else {
            toast.error("Something went wrong")
            closeModalEditProduct()
        }

    }

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            const tok = sessionStorage.getItem("token")
            setToken(tok)
            if (activeTab === 'users') {
                getAllUsers(tok)
            }
            if (activeTab === 'products') {
                getAllProducts()
            }
        }


    }, [productAddDeleteStatus, activeTab])
    return (
        <>
            <Header />
            <div className='mt-10'>
                <h1 className='m-5 text-3xl'>Hello, Admin!</h1>
                <div>
                    <div className="p-6">
                        <div className="flex border-b-2 border-pink-500 mb-4">
                            <button
                                className={`px-4 py-2 font-semibold ${activeTab === 'users'
                                    ? 'border-b-4 border-pink-500 text-pink-500'
                                    : 'text-gray-500'
                                    }`}
                                onClick={() => setActiveTab('users')}
                            >
                                Users
                            </button>
                            <button
                                className={`ml-4 px-4 py-2 font-semibold ${activeTab === 'products'
                                    ? 'border-b-4 border-pink-500 text-pink-500'
                                    : 'text-gray-500'
                                    }`}
                                onClick={() => setActiveTab('products')}
                            >
                                Products
                            </button>
                        </div>

                        <div className="bg-amber-100 p-4 rounded shadow">
                            {activeTab === 'users' && (
                                <div>
                                    <h2 className="text-xl font-bold mb-2 text-pink-500">Users</h2>
                                    {allUsers?.length > 0 ? (
                                        <div>
                                            <p className="mb-4 text-gray-700">Total Number of Users: <span className="font-semibold">{allUsers.length}</span></p>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                                {allUsers.map((item, index) => (
                                                    <div key={index} className="bg-white p-4 rounded shadow border border-pink-300">
                                                        <h5 className="text-lg font-semibold text-pink-700">{item?.fullname}</h5>
                                                        <p className="text-gray-600">{item?.email}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-gray-500">No users yet.</p>
                                    )}
                                </div>
                            )}

                            {activeTab === 'products' && (
                                <div>
                                    <h2 className="text-xl text-pink-500 font-bold mb-2">Products</h2>
                                    <div className='text-end'>
                                        <button type='button' onClick={() => setModalUploadProduct(true)} className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded shadow">
                                            Add Product
                                        </button>
                                    </div>

                                    {allProducts?.length > 0 ? <div className='md:grid grid-cols-5 gap-5 m-5' >
                                        {allProducts?.map((item, index) => (

                                            <div className="max-w-sm rounded bg-white overflow-hidden shadow-lg mb-5 md:mb-0" key={index}>
                                                <img className="w-full h-50"
                                                    src={`${serverurl}/uploads/${item?.photo}`}
                                                    alt="product photo" />
                                                <div className="p-4">
                                                    <div className={item?.stock>5?"font-bold mb-":"text-red-700 font-bold mb-2"}>{item?.title}</div>
                                                    <p className="text-gray-700 text-xs mb-1">Description: {item?.description}</p>
                                                    <p className="text-gray-700 text-xs mb-1">Gender: {item?.gender}</p>
                                                    <div className='flex justify-between'>
                                                        <p className="text-gray-700">Price: ${item?.price}</p>
                                                        <p className={item?.stock>5?"text-gray-700":"text-red-700 font-bold"}>Stock :{item?.stock}</p>
                                                    </div>
                                                    <div className='flex justify-between mt-3'>
                                                        <div>
                                                            <button onClick={() => deleteProduct(item?._id)} type='button' className=' text-sm text-white bg-red-600 px-1 py-0.5 md:px-2 md:py-1 rounded hover:bg-red-800'><FontAwesomeIcon icon={faTrashCan} /></button>
                                                        </div>
                                                        <div><button onClick={() => openEditModal(item)} type='button' className=' text-sm text-white bg-blue-600 px-1 py-0.5 md:px-2 md:py-1 rounded hover:bg-blue-800'><FontAwesomeIcon icon={faPen} /></button></div>
                                                    </div>
                                                </div>
                                            </div>))}
                                    </div> :
                                        <h3>No Products added yet.</h3>
                                    }


                                </div>

                            )}
                        </div>
                    </div>
                </div>
            </div >
            {modalUploadProduct &&
                <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

                    <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">

                                {/* title of modal */}
                                <div className=" p-4 flex justify-between items-center sm:px-6">
                                    <h1 className='text-pink-600 text-2xl me-10'>Add Product</h1>
                                    <FontAwesomeIcon onClick={closeModalUploadProduct} className='text-black bg-amber-300 fa-x px-3 py-2 rounded' icon={faXmark} />
                                </div>
                                {/* boby of modal */}
                                <div className=" px-4 pt-3 pb-4 sm:p-6 sm:pb-4">

                                    <div className='text-xl'>
                                        <span className='italic p-3'>Title</span>
                                        <OutlinedInput className='mt-2 w-56 md:w-80 ms-12'
                                            value={uploadProductDetails.title}
                                            onChange={(e) => setUploadProductDetails({ ...uploadProductDetails, title: e.target.value })}
                                        />
                                    </div>
                                    <div className='text-xl'>
                                        <span className='italic p-3'>Description</span>
                                        <OutlinedInput className='mt-2 w-56 md:w-80'
                                            value={uploadProductDetails.description}
                                            onChange={(e) => setUploadProductDetails({ ...uploadProductDetails, description: e.target.value })}
                                        />
                                    </div>
                                    <div className='text-xl my-3'>
                                        <span className='italic p-3'>Select Gender</span>
                                        <input checked={uploadProductDetails.gender === "Girl"} onChange={(e) => setUploadProductDetails({ ...uploadProductDetails, gender: e.target.value })} type="radio" id="girl" name="gender" value="Girl" className='me-2' />
                                        <label htmlFor="girl" className='me-5'>Girl</label>
                                        <input checked={uploadProductDetails.gender === "Boy"} onChange={(e) => setUploadProductDetails({ ...uploadProductDetails, gender: e.target.value })} type="radio" id="boy" name="gender" value="Boy" className='me-2' />
                                        <label htmlFor="boy" className='me-5'>Boy</label>
                                        <input checked={uploadProductDetails.gender === "Neutral"} onChange={(e) => setUploadProductDetails({ ...uploadProductDetails, gender: e.target.value })} type="radio" id="neutral" name="gender" value="Neutral" className='me-2' />
                                        <label htmlFor="neutral" className='me-5'>Neutral</label>

                                    </div>
                                    <div className='text-xl'>
                                        <span className='italic p-3'>Price</span>
                                        <OutlinedInput className='mt-2 w-56 md:w-80 ms-10'
                                            value={uploadProductDetails.price}
                                            onChange={(e) => setUploadProductDetails({ ...uploadProductDetails, price: e.target.value })}
                                            endAdornment={<InputAdornment position="start">$</InputAdornment>}

                                        />
                                    </div>
                                    <div className='text-xl'>
                                        <span className='italic p-3'>Stock</span>
                                        <OutlinedInput className='mt-2 w-56 md:w-80 ms-10'
                                            value={uploadProductDetails.stock}
                                            onChange={(e) => setUploadProductDetails({ ...uploadProductDetails, stock: e.target.value })}
                                        />
                                    </div>


                                    <div className='text-xl flex mb-4'>
                                        <div className='text-xl mt-5 ms-3'>
                                            <div className="flex items-center space-x-4 mb-2">
                                                <label htmlFor="photo" className="cursor-pointer inline-flex items-center px-3 py-1 bg-pink-600 text-white font-medium rounded-lg shadow hover:bg-pink-400 transition">
                                                    Upload Photo
                                                </label>
                                                <span className="text-gray-600 text-sm">{uploadProductDetails?.photo?.name || "No file selected"}</span>
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

            {modalEditProduct &&
                <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

                    <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">

                                {/* title of modal */}
                                <div className=" p-4 flex justify-between items-center sm:px-6">
                                    <h1 className='text-pink-600 text-2xl me-10'>Edit Product</h1>
                                    <FontAwesomeIcon onClick={closeModalEditProduct} className='text-black bg-amber-300 fa-x px-3 py-2 rounded' icon={faXmark} />
                                </div>
                                {/* boby of modal */}
                                <div className=" px-4 pt-3 pb-4 sm:p-6 sm:pb-4">


                                    <div className='text-xl'>
                                        <span className='italic p-3'>New Price</span>
                                        <OutlinedInput className='mt-2 w-56 md:w-80 ms-11'
                                            value={updateProduct.price}
                                            onChange={(e) => setUpdateProduct({ ...updateProduct, price: e.target.value })}
                                            endAdornment={<InputAdornment position="start">$</InputAdornment>}
                                        />
                                    </div>

                                    <div className='text-xl'>
                                        <span className='italic p-3'>New Stock</span>
                                        <OutlinedInput className='mt-2 w-56 md:w-80 ms-10'
                                            value={updateProduct.stock}
                                            onChange={(e) => setUpdateProduct({ ...updateProduct, stock: e.target.value })}
                                        />
                                    </div>

                                </div>
                                {/* footer of modal */}
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button type="button" onClick={handleUploadEdit} className="inline-flex w-full justify-center rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold ring-1  ring-pink-600 ring-inset text-white shadow-xs hover:bg-white hover:text-pink-600  sm:ml-3 sm:w-auto">Submit</button>
                                    <button type="button" onClick={handleResetEdit} className="mt-3 inline-flex w-full justify-center rounded-md bg-amber-200 px-3 py-2 text-sm font-semibold text-black shadow-xs ring-1 ring-amber-300 ring-inset hover:bg-gray-50 hover:text-amber-500 hover:ring-amber-300 sm:mt-0 sm:w-auto">Reset</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
        </>
    )
}

export default AdminHome