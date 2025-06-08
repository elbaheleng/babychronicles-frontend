import React from 'react'
import Hero from '../components/Hero'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBrain, faClock, faSeedling, faShieldHalved } from '@fortawesome/free-solid-svg-icons'
import Header from '../components/Header'
import Testimonials from '../components/Testimonials'

function Home() {
    return (
        <>
        <Header/>
            <Hero />
            {/* Why Baby Chronicles? */}
            <div>
                <h1 className='text-center text-3xl my-5'>Why Baby Chronicles?</h1>
                <div className='md:flex justify-evenly my-10 gap-10 md:mx-20 mx-10'>
                    <div className='text-center mb-3'>
                        <FontAwesomeIcon className='bg-amber-200 p-4 rounded-full text-5xl' icon={faClock} />
                        <h3 className='font-bold'>Track Daily Activities</h3>
                        <p>Feeding, sleep, diaper changes, baths — all in one place</p>
                    </div>
                    <div className='text-center mb-3'>
                        <FontAwesomeIcon className='bg-amber-200 p-4 rounded-full text-5xl' icon={faSeedling} />
                        <h3 className='font-bold'>Monitor Growth & Milestones</h3>
                        <p>Record height, weight, and precious achievements as they happen</p>
                    </div>
                    <div className='text-center mb-3'>
                        <FontAwesomeIcon className='bg-amber-200 p-4 rounded-full text-5xl' icon={faBrain} />
                        <h3 className='font-bold'>Stay Organized</h3>
                        <p>Get daily summary that help you stay on top of your baby’s routine without stress.</p>
                    </div>
                    <div className='text-center mb-3'>
                        <FontAwesomeIcon className='bg-amber-200 p-4 rounded-full text-5xl' icon={faShieldHalved} />
                        <h3 className='font-bold'>Your Data is Safe</h3>
                        <p>We respect your privacy and protect your baby’s memories with secure storage</p>
                    </div>

                </div>
            </div>
            {/* How it works? */}
            <div className='bg-amber-200 p-5'>
                <h1 className='text-center text-3xl my-5'>How it works?</h1>
                <div className='md:grid grid-cols-4 my-10 gap-10 md:mx-20 mx-10'>
                    <div className='text-center mb-3 bg-white rounded px-5 py-10 text-xl'>
                        <p>👶</p>
                        <p>Create your baby's profile</p>
                    </div>
                    <div className='text-center mb-3 bg-white rounded px-5 py-10 text-xl'>
                        <p>✍️</p>
                        <p>Start logging activities</p>
                    </div>
                    <div className='text-center mb-3 bg-white rounded px-5 py-10 text-xl'>
                        <p>📈</p>
                        <p>Download the report of logged activities</p>
                    </div>
                    <div className='text-center mb-3 bg-white rounded px-5 py-10 text-xl'>
                        <p>📤</p>
                        <p>Shop for your little ones</p>
                    </div>

                </div>

            </div>
            {/* Testimonials */}
            <div id='testimonials'>
                <h1 className='text-center text-3xl my-5'>Testimonials</h1>
                <Testimonials/>
            </div>
            {/* About Us */}
            <div id='about' className='bg-pink-600 text-white p-5'>
                <h1 className='text-center text-3xl my-5'>About Us</h1>
                <div className='md:px-20 px-10 text-justify my-8 '>
                    <p className='mb-3'>Hi, I'm Elba Helen George, the creator of BabyChronicles.</p>
                    <p className='mb-3'>This app is inspired by my own journey into motherhood. As a new mom, I found it incredibly challenging to keep track of my baby's needs — from feeding times and sleep schedules to diaper changes and medical details. Night feeds were especially exhausting, and without external help, remembering everything felt overwhelming.Recovering from a C-section while managing a newborn only added to the stress. I realized how much easier it would be if there was a simple, supportive tool to log all these daily activities in one place.</p>
                    <p className='mb-3'>That’s why I created BabyChronicles — to help parents and caregivers stay organized and feel more in control during those precious but demanding early months.Later, when I had to rejoin work, I felt even more strongly about the need for such a tool. If this app makes life even a little easier for another parent, I’ll consider it a success.</p>
                </div>

            </div>
            {/* Pricing */}
            <div>
                <h1 className='text-center text-3xl my-5'>Pricing</h1>
                <div className='md:grid grid-cols-3 gap-30 mx-10 text-center mb-5'>
                    <div className='bg-amber-200 rounded py-2 m-3'>
                        <p className='text-2xl my-3'>Little Steps - Free Plan</p>
                        <h6>Track feeding, sleep, diaper changes</h6>
                        <h6>Growth & milestone logging</h6>
                        <h6>1 baby profile</h6>
                        <p className='text-2xl my-3'>Price: ₹0 / forever</p>
                    </div>
                    <div className='bg-amber-200 rounded py-2 m-3'>
                        <p className='text-2xl my-3'>Growing Moments - Premium Plan</p>
                        <h6>Unlimited baby profiles (great for twins/siblings)</h6>
                        <h6>Full activity history </h6>
                        <h6>Download PDF reports</h6>
                        <p className='text-2xl my-3'>Price: ₹199/month or ₹1999/year</p>
                    </div>
                    <div className='bg-amber-200 rounded py-2 m-3'>
                        <p className='text-2xl my-3'>Forever Memories - Lifetime Plan</p>
                        <h6>One-time purchase</h6>
                        <h6> All Premium features for life</h6>
                        <p className='text-2xl my-3'>Price: ₹2999 one-time</p>
                    </div>
                </div>
                <h1 className='text-center font-bold text-3xl my-5 text-pink-800'>Introductory Offer: Lifetime Plan Free for all users</h1>


            </div>
        </>
    )
}

export default Home