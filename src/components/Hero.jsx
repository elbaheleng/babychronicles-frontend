import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Hero() {
    const[ isLoggedIn, setIsloggedIn] = useState(false)
    useEffect(() => {
            if (sessionStorage.getItem("token")) {
                setIsloggedIn(true)
            }
        }, [])
    return (
        <>
            <div id='heromd' className='h-100 hidden md:block'>
                <div className='flex flex-col justify-center items-center py-25 text-center'>
                    <h1 className='text-4xl text-white italic mb-2'>Cherish Every Moment. Track Every Milestone.</h1>
                    <p className='text-white mb-10'>From feeding times to first steps, BabyChronicle helps you track, remember, and celebrate every little moment.
                    </p>
                    <div>
                        { !isLoggedIn && <Link  to={'/register'}><button className='btn bg-pink-600 text-white rounded px-3 py-2 me-10 text-2xl'>Register</button></Link>}
                        {!isLoggedIn && <Link to={'/login'}><button className='btn bg-pink-600 text-white rounded px-3 py-2 text-2xl'>Login</button></Link>}
                       {isLoggedIn && <Link to={'/dashboard'}><button className='btn bg-pink-600 text-white rounded px-3 py-2 text-2xl'>Dashboard</button></Link>}
                    </div>
                </div>
            </div>
            <div id='herosm' className='h-100 md:hidden'>
                <div className='flex flex-col justify-center items-center py-20 text-center'>
                    <h1 className='text-4xl text-white italic mb-2'>Cherish Every Moment. Track Every Milestone.</h1>
                    <p className='text-white mb-10'>From feeding times to first steps, BabyChronicle helps you track, remember, and celebrate every little moment.
                    </p>
                    <div>
                        { !isLoggedIn && <Link  to={'/register'}><button className='btn bg-pink-600 text-white rounded px-3 py-2 me-10 text-2xl'>Register</button></Link>}
                        {!isLoggedIn && <Link to={'/login'}><button className='btn bg-pink-600 text-white rounded px-3 py-2 text-2xl'>Login</button></Link>}
                       {isLoggedIn && <Link to={'/dashboard'}><button className='btn bg-pink-600 text-white rounded px-3 py-2 text-2xl'>Dashboard</button></Link>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero