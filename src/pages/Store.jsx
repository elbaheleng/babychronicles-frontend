import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { getAllProductsApi, makePaymentApi } from '../services/allApis'
import { serverurl } from '../services/serverurl'
import { loadStripe } from '@stripe/stripe-js'
import { Link } from 'react-router-dom'



function Store() {
    const [allProducts, setAllProducts] = useState([])
    const [girlProducts, setGirlProducts] = useState([])
    const [boyProducts, setBoyProducts] = useState([])
    const [neutalProducts, setNeutralProducts] = useState([])
    const [activeTab, setActiveTab] = useState('allproducts');



    const getAllProducts = async () => {

        const result = await getAllProductsApi()
        if (result.status == 200) {
            setAllProducts(result.data)
            //console.log(result.data);
            setGirlProducts(result.data?.filter((item) => item.gender == 'Girl'));
            setBoyProducts(result.data?.filter((item) => item.gender == 'Boy'))
            setNeutralProducts(result.data?.filter((item) => item.gender == 'Neutral'))
        } else {
            toast.error("Something went wrong")
        }
    }

     const makePayment = async (item) => {
    const stripe = await loadStripe('pk_test_51RSxyzBByBIEVjlsKUp0WGaiAhe5fl3V3io37VKDQNUn9Fq1B5FN52qMMnxFtaQ8kglH8Rj9YMIHQEr0JwrWiPCR00y40A47Kq');
    const reqBody = {
      productDetails: item
    }
    const result = await makePaymentApi(reqBody)
    const sessionId = result.data.sessionId
    const reponse = stripe.redirectToCheckout({
      sessionId: sessionId
    })
   
    if(reponse.error){
      toast.error("Something went wrong")
    }
  }
    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            getAllProducts()
        }
    }, [])
    return (
        <>
            <Header />
            
             <h1 className='m-20 text-3xl text-center'>Welcome to BabyChronicles Store!</h1>
                    <div className='flex justify-between'>
                        <h3 className='m-5'>Happy Shopping</h3>
                    
                    <Link to={'/dashboard'}><button className='bg-pink-700 text-white px-3 py-2 rounded me-5'>Back To Dashboard</button></Link>
                    </div>
        
           
            <div>
                <div className="p-6">
                    <div className="flex border-b-2 border-pink-500 mb-4">
                        <button
                            className={`px-4 py-2 font-semibold ${activeTab === 'allproducts'
                                ? 'border-b-4 border-pink-500 text-pink-500'
                                : 'text-gray-500'
                                }`}
                            onClick={() => setActiveTab('allproducts')}
                        >
                            All Products
                        </button>
                        <button
                            className={`ml-4 px-4 py-2 font-semibold ${activeTab === 'girlproducts'
                                ? 'border-b-4 border-pink-500 text-pink-500'
                                : 'text-gray-500'
                                }`}
                            onClick={() => setActiveTab('girlproducts')}
                        >
                            Girl Products
                        </button>
                        <button
                            className={`ml-4 px-4 py-2 font-semibold ${activeTab === 'boyproducts'
                                ? 'border-b-4 border-pink-500 text-pink-500'
                                : 'text-gray-500'
                                }`}
                            onClick={() => setActiveTab('boyproducts')}
                        >
                            Boy Products
                        </button>
                        <button
                            className={`ml-4 px-4 py-2 font-semibold ${activeTab === 'neutralproducts'
                                ? 'border-b-4 border-pink-500 text-pink-500'
                                : 'text-gray-500'
                                }`}
                            onClick={() => setActiveTab('neutralproducts')}
                        >
                            Neutral Products
                        </button>
                    </div>

                    <div className="bg-amber-100 p-4 rounded shadow">
                        {activeTab === 'allproducts' && (
                            <div>
                                <h2 className="text-xl font-bold mb-2 text-pink-500">All Products</h2>
                                {allProducts?.length > 0 ?
                                    <div className='md:grid grid-cols-5 gap-5 m-5' >
                                        {allProducts?.map((item, index) => (

                                            <div className="max-w-sm rounded bg-white overflow-hidden shadow-lg mb-5 md:mb-0" key={index}>
                                                <img className="w-full h-50"
                                                    src={`${serverurl}/uploads/${item?.photo}`}
                                                    alt="product photo" />
                                                <div className="p-4">
                                                    <div className="font-bold mb-2">{item?.title}</div>
                                                    <p className="text-gray-700 text-xs mb-1">Description: {item?.description}</p>
                                                    <p className="text-gray-700 text-xs mb-1">Gender: {item?.gender}</p>
                                                    <div className='flex justify-between'>
                                                        <p className="text-gray-700">Price: ${item?.price}</p>
                                                        <div><button onClick={() => makePayment(item)} type='button' className=' text-sm text-white bg-green-600 px-1 py-0.5 md:px-2 md:py-1 rounded hover:bg-green-800'>Buy</button></div>
                                                    </div>
                                                </div>

                                            </div>))}
                                    </div> :
                                    <h3>No Products added yet.</h3>
                                }
                            </div>
                        )}
                        {activeTab === 'girlproducts' && (
                            <div>
                                <h2 className="text-xl font-bold mb-2 text-pink-500">All Products</h2>
                                {girlProducts?.length > 0 ?
                                    <div className='md:grid grid-cols-5 gap-5 m-5' >
                                        {girlProducts?.map((item, index) => (

                                            <div className="max-w-sm rounded bg-white overflow-hidden shadow-lg mb-5 md:mb-0" key={index}>
                                                <img className="w-full h-50"
                                                    src={`${serverurl}/uploads/${item?.photo}`}
                                                    alt="product photo" />
                                                <div className="p-4">
                                                    <div className="font-bold mb-2">{item?.title}</div>
                                                    <p className="text-gray-700 text-xs mb-1">Description: {item?.description}</p>
                                                    <p className="text-gray-700 text-xs mb-1">Gender: {item?.gender}</p>
                                                    <div className='flex justify-between'>
                                                        <p className="text-gray-700">Price: ${item?.price}</p>
                                                        <div><button onClick={() => makePayment(item)} type='button' className=' text-sm text-white bg-green-600 px-1 py-0.5 md:px-2 md:py-1 rounded hover:bg-green-800'>Buy</button></div>
                                                    </div>
                                                </div>

                                            </div>))}
                                    </div> :
                                    <h3>No Girl Products added yet.</h3>
                                }
                            </div>
                        )}

{activeTab === 'boyproducts' && (
                            <div>
                                <h2 className="text-xl font-bold mb-2 text-pink-500">All Products</h2>
                                {boyProducts?.length > 0 ?
                                    <div className='md:grid grid-cols-5 gap-5 m-5' >
                                        {boyProducts?.map((item, index) => (

                                            <div className="max-w-sm rounded bg-white overflow-hidden shadow-lg mb-5 md:mb-0" key={index}>
                                                <img className="w-full h-50"
                                                    src={`${serverurl}/uploads/${item?.photo}`}
                                                    alt="product photo" />
                                                <div className="p-4">
                                                    <div className="font-bold mb-2">{item?.title}</div>
                                                    <p className="text-gray-700 text-xs mb-1">Description: {item?.description}</p>
                                                    <p className="text-gray-700 text-xs mb-1">Gender: {item?.gender}</p>
                                                    <div className='flex justify-between'>
                                                        <p className="text-gray-700">Price: ${item?.price}</p>
                                                        <div><button onClick={() => makePayment(item)} type='button' className=' text-sm text-white bg-green-600 px-1 py-0.5 md:px-2 md:py-1 rounded hover:bg-green-800'>Buy</button></div>
                                                    </div>
                                                </div>

                                            </div>))}
                                    </div> :
                                    <h3>No Boy Products added yet.</h3>
                                }
                            </div>
                        )}

{activeTab === 'neutralproducts' && (
                            <div>
                                <h2 className="text-xl font-bold mb-2 text-pink-500">All Products</h2>
                                {neutalProducts?.length > 0 ?
                                    <div className='md:grid grid-cols-5 gap-5 m-5' >
                                        {neutalProducts?.map((item, index) => (

                                            <div className="max-w-sm rounded bg-white overflow-hidden shadow-lg mb-5 md:mb-0" key={index}>
                                                <img className="w-full h-50"
                                                    src={`${serverurl}/uploads/${item?.photo}`}
                                                    alt="product photo" />
                                                <div className="p-4">
                                                    <div className="font-bold mb-2">{item?.title}</div>
                                                    <p className="text-gray-700 text-xs mb-1">Description: {item?.description}</p>
                                                    <p className="text-gray-700 text-xs mb-1">Gender: {item?.gender}</p>
                                                    <div className='flex justify-between'>
                                                        <p className="text-gray-700">Price: ${item?.price}</p>
                                                        <div><button onClick={() => makePayment(item)} type='button' className=' text-sm text-white bg-green-600 px-1 py-0.5 md:px-2 md:py-1 rounded hover:bg-green-800'>Buy</button></div>
                                                    </div>
                                                </div>

                                            </div>))}
                                    </div> :
                                    <h3>No Neutral Products added yet.</h3>
                                }
                            </div>
                        )}


                       
                    </div>
                </div>
            </div>
        </>
    )
}

export default Store