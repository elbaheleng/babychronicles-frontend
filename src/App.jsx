
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import PageNotFound from './pages/PageNotFound'
import Breastfeedinglog from './pages/Breastfeedinglog'
import Bottlefeedlog from "./pages/Bottlefeedlog"
import { ToastContainer } from 'react-toastify'
import Milestonelog from './pages/Milestonelog'
import Bathlog from './pages/Bathlog'
import Diaperchangelog from './pages/Diaperchangelog'
import Sleeplog from './pages/Sleeplog'
import Healthlog from './pages/Healthlog'
import Pumping from './pages/Pumping'
import Playtimelog from './pages/Playtimelog'
import Pottytimelog from './pages/Pottytimelog'

function App() {


  return (
    <>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/breastfeeding_log' element={<Breastfeedinglog />} />
        <Route path='/bottlefeed_log' element={<Bottlefeedlog/>} />
        <Route path='/diaperchange_log' element={<Diaperchangelog/>}/>
        <Route path='/sleep_log' element={<Sleeplog/>}/>
        <Route path='/pumping' element={<Pumping/> }/>
        <Route path='/pottytime_log' element={<Pottytimelog/>}/>
        <Route path='/playtime_log' element={<Playtimelog/>}/>
        <Route path='/bath_log' element={<Bathlog/>}/>
        <Route path='/milestone_log' element={<Milestonelog/>}/>
        <Route path='/health_log' element={<Healthlog/>}/>


        <Route path='/*' element={<PageNotFound />} />
      </Routes>
      <ToastContainer theme='colored' position='top-center' autoClose={2000} />
      <Footer />

    </>
  )
}

export default App
