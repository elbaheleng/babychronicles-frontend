import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faLinkedin, faSquareFacebook, faSquareInstagram, faSquareXTwitter, faSquareYoutube } from '@fortawesome/free-brands-svg-icons'

function Footer() {
  return (
    <>
    <div className='md:grid grid-cols-3 gap-4 bg-amber-200 mb-0'>
        <div className='my-2 ms-2 md:ms-10'>
            <h1 className='text-3xl mb-2'>Baby Chronicles</h1>
            <p className='italic'>Cherish every moment. Track every milestone.</p>
        </div>
        <div className='my-2 ms-2'>
            <h3 className='text-xl mb-2'>QUICK LINKS</h3>
            <ul>
                <li>Home</li>
                <li>Features</li>
                <li>About Us</li>
                <li>Contact Us</li>
            </ul>
        </div>
        <div className='my-2 ms-2'>
            <h3 className='text-xl mb-2'>SUPPORT</h3>
            <ul>
                <li>FAQs</li>
                <li>Terms & Conditions</li>
                <li>Follow Us On</li>
                <li>
                    <FontAwesomeIcon className='me-2 text-xl' icon={faSquareFacebook} />
                    <FontAwesomeIcon className='me-2 text-xl' icon={faSquareInstagram} />
                    <FontAwesomeIcon className='me-2 text-xl' icon={faSquareYoutube} />
                    <FontAwesomeIcon className='me-2 text-xl' icon={faSquareXTwitter} />
                    <FontAwesomeIcon className='me-2 text-xl' icon={faLinkedin} />
                </li>
            </ul>
        </div>
    </div>
    <div className='bg-gray-900 text-center mt-0'>
        <p className='text-white py-1'>© 2025 BabyChronicles. Created with love by Elba Helen George. All rights reserved.</p>
    </div>
    </>
  )
}

export default Footer