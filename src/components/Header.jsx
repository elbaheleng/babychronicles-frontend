import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'

function Header() {
    const [toggle, setToggle] = useState(false)
    const [token, settoken] = useState("")
    const [user, setUser] = useState({})

    const navigate = useNavigate()
    const logout = () => {
        sessionStorage.removeItem("existingUser")
        sessionStorage.removeItem("token")
        localStorage.removeItem("baby")
        if (sessionStorage.getItem("stockUpdated")) {
            sessionStorage.removeItem("stockUpdated")
        }
        navigate("/")
        settoken("")
    }
    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            const token = sessionStorage.getItem("token")
            const user = JSON.parse(sessionStorage.getItem("existingUser"))
            settoken(token)
            setUser(user)
        }
    }, [])
    return (
        <>
            <div className='fixed top-0 left-0 w-full bg-amber-200 flex justify-between z-50'>
                <div className='flex justify-start items-center ms-3'>
                    <Link to={'/'} className='flex justify-start items-center'>
                        <img src="/favicon.png" alt="" style={{ height: "50px" }} />
                        <h1 className='ms-2 text-3xl'>Baby Chronicles</h1>
                    </Link>
                </div>
                {!token && <div className='hidden md:flex justify-center items-center'>
                    <ul className='flex justify-center items-center gap-4'>
                        <Link to={'/'}><li>Home</li></Link>
                        <a href="#about" onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("about").scrollIntoView({ behavior: "smooth" });
                        }}><li>About</li></a>
                        <a href='#testimonials' onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("testimonials").scrollIntoView({ behavior: "smooth" });
                        }}><li>Testimonials</li></a>
                    </ul>
                </div>}
                <div className='hidden md:flex justify-start items-center gap-3'>
                    {token && <button type='button' onClick={logout} className='btn border rounded px-3 py-1 me-3'>Logout</button>}
                    {!token && <Link to={'/login'}><button className='btn border rounded px-3 py-1'>Login</button></Link>}
                    {!token && <Link to={'/register'}><button className='btn border rounded px-3 py-1 me-3'>Register</button></Link>}
                </div>
                <div className='flex justify-end items-center md:hidden'>
                    {!toggle && <FontAwesomeIcon onClick={() => setToggle(true)} className='text-2xl me-3' icon={faBars} />}
                    {toggle && <FontAwesomeIcon onClick={() => setToggle(false)} className='text-2xl me-3' icon={faXmark} />}
                </div>
            </div>
            {toggle && <div className='fixed top-0 left-0 w-full bg-amber-200 flex flex-col py-2'>
                {!token && <div className='md:hidden flex justify-center items-center'>
                    <ul className='flex flex-col justify-center items-center gap-4'>
                        <Link to={'/'}><li>Home</li></Link>
                        <a href="#about" onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("about").scrollIntoView({ behavior: "smooth" });
                        }}><li>About</li></a>
                        <a href='#testimonials' onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("testimonials").scrollIntoView({ behavior: "smooth" });
                        }}><li>Testimonials</li></a>
                    </ul>
                </div>}
                <div className='md:hidden flex justify-center items-center gap-3 py-2'>
                    {token && <button type='button' onClick={logout} className='btn border rounded px-3 py-1'>Logout</button>}
                    {!token && <Link to={'/login'}><button className='btn border rounded px-3 py-1'>Login</button></Link>}
                    {!token && <Link to={'/register'}><button className='btn border rounded px-3 py-1 me-3'>Register</button></Link>}
                </div>
            </div>}

        </>
    )
}

export default Header