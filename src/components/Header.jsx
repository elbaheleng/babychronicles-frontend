import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'

function Header() {
    const [toggle,setToggle] = useState(false)
    const [token, settoken] = useState("")

    const navigate = useNavigate()
      const logout = () => {
        sessionStorage.removeItem("existingUser")
        sessionStorage.removeItem("token")
        navigate("/")
        settoken("")
      }
    useEffect(() => { 
        if (sessionStorage.getItem("token")) {
            const token = sessionStorage.getItem("token")
            settoken(token)
        }
    },[])
    return (
        <>
            <div className='bg-amber-200 flex justify-between'>
                <div className='flex justify-start items-center ms-3'>
                    <img src="/favicon.png" alt="" style={{ height: "50px" }} />
                    <h1 className='ms-2 text-3xl'>Baby Chronicles</h1>
                </div>
                <div className='hidden md:flex justify-center items-center'>
                    <ul className='flex justify-center items-center gap-4'>
                        <li>Home</li>
                        <li>About</li>
                        <li>Testimonials</li>
                    </ul>
                </div>
                <div className='hidden md:flex justify-start items-center gap-3'>
                    {token && <button type='button' onClick={logout} className='btn border rounded px-3 py-1 me-3'>Logout</button>}
                    { !token && <Link to={'/login'}><button className='btn border rounded px-3 py-1'>Login</button></Link>}
                    { !token && <Link to={'/register'}><button className='btn border rounded px-3 py-1 me-3'>Register</button></Link>}
                </div>
                <div className='flex justify-end items-center md:hidden'>
                    { !toggle && <FontAwesomeIcon onClick={()=>setToggle(true)} className='text-2xl me-3' icon={faBars} />}
                    { toggle && <FontAwesomeIcon  onClick={()=>setToggle(false)}  className='text-2xl me-3' icon={faXmark} />}
                </div>
            </div>
            { toggle && <div className='bg-amber-200 flex flex-col py-2'>
                <div className='md:hidden flex justify-center items-center'>
                    <ul className='flex flex-col justify-center items-center gap-4'>
                        <li>Home</li>
                        <li>About</li>
                        <li>Testimonials</li>
                    </ul>
                </div>
                <div className='md:hidden flex justify-center items-center gap-3 py-2'>
                    { token && <button  type='button' onClick={logout}  className='btn border rounded px-3 py-1'>Logout</button>}
                    {!token && <Link to={'/login'}><button className='btn border rounded px-3 py-1'>Login</button></Link>}
                    {!token && <Link to={'/register'}><button className='btn border rounded px-3 py-1 me-3'>Register</button></Link>}
                </div>
            </div>}

        </>
    )
}

export default Header