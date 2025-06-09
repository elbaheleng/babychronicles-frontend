import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward } from '@fortawesome/free-solid-svg-icons'
import { updateStockApi } from '../services/allApis';


function PaymentSuccess() {
    const productId = useParams();

    const updateStock = async (productId) => {
        console.log(productId);
        
        const result = await updateStockApi(productId)
        console.log(result);
        
    }
    useEffect(() => {
        if (!sessionStorage.getItem("stockUpdated")) {
        updateStock(productId.id)
        sessionStorage.setItem("stockUpdated", "true");
        }
        //console.log(productId.id);
        
    }, []);
    return (
        <>
            <Header />
            <div className='container my-28'>
                <div className='md:grid grid-cols-2 px-20 '>
                    <div className='flex justify-center items-start flex-col'>
                        <h1 className='text-4xl text-pink-600'>Congratulations!</h1>
                        <p className='text-2xl my-2'>Thankyou for shopping with BabyChronicles. Hope you had a good time shopping.</p>
                        <Link to={'/store'}><button className='bg-pink-600 text-white px-5 py-2 border border-pink-600 hover:bg-white hover:text-pink-800 p-3 rounded  mt-5 mb-3'>Back To Store <FontAwesomeIcon icon={faBackward} /></button></Link>
                    </div>
                    <div className='flex justify-center items-center'>
                        <img src="https://media1.giphy.com/media/sUlvyfTPYqnHl7tHoW/200w.gif?cid=6c09b952p6zaly2tvkrevni8uwbbc2rbdrcfassr3sxqc2if&ep=v1_stickers_search&rid=200w.gif&ct=s" className='h-75' alt="no image" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentSuccess