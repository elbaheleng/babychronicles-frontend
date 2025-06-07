import React, { useContext, useEffect, useState } from 'react'
import { babyContext } from '../context/Contexttoshare'
import Header from '../components/Header'
import { deletePumpingApi, getPumpingsApi } from '../services/allApis'
import { toast } from 'react-toastify'
import dayjs from 'dayjs';
import { Link } from 'react-router-dom'
import generatePDF, { Resolution, Margin } from 'react-to-pdf';


function Pumping() {
  const { baby, setBaby } = useContext(babyContext)
   //console.log(baby);
   const [allPumpingDetails, setAllPumpingDetails] = useState([])
   const [deletePumpingStatus, setDeletePumpingStatus] = useState({})
        const options = {
       // default is `save`
       method: 'open',
       // default is Resolution.MEDIUM = 3, which should be enough, higher values
       // increases the image quality but also the size of the PDF, so be careful
       // using values higher than 10 when having multiple pages generated, it
       // might cause the page to crash or hang.
       resolution: Resolution.HIGH,
       page: {
          // margin is in MM, default is Margin.NONE = 0
          margin: Margin.SMALL,
          orientation: 'landscape',
         
         
       },
       canvas: {
          // default is 'image/jpeg' for better size performance
          mimeType: 'image/png',
          qualityRatio: 1
       },
       // Customize any value passed to the jsPDF instance and html2canvas
       // function. You probably will not need this and things can break, 
       // so use with caution.
       overrides: {
          // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
          pdf: {
             compress: true
          },
          // see https://html2canvas.hertzen.com/configuration for more options
          canvas: {
             useCORS: true,
            scale : 7
          }
       },
    };
    
    // you can use a function to return the target element besides using React refs
    const getTargetElement = () => document.getElementById('content-id');

   const getAllPumpings = async (usermail) => {
     const result = await getPumpingsApi(usermail)
     //console.log(result);
     
     if (result.status == 200) {
       setAllPumpingDetails(result.data)
     } else {
       toast.error("Something went wrong")
     }
   }
   // console.log(allBreastfeedingDetails);
   const deletePumping = async (id) => {
     
     const result = await deletePumpingApi(id)
     if (result.status == 200) {
       setDeletePumpingStatus(result.data)
     } else {
       toast.error("Something went wrong")
     }
 
   }
 
   
   useEffect(() => {
     if (sessionStorage.getItem("token")) {
    const user = JSON.parse(sessionStorage.getItem("existingUser"))
     const baby1 = JSON.parse(localStorage.getItem("baby"))
     //console.log(baby1);
     setBaby(baby1)
     getAllPumpings(user.email)
 
   }}, [ deletePumpingStatus])
   return (
     <>
        <Header />
      <div className=' mt-5  me-5 md:me-20 flex justify-end'>
        <Link to={'/dashboard'}><button className='bg-pink-700 text-white px-3 py-2 rounded me-3'>Back To Dashboard</button></Link>
        <button type='button'onClick={() => generatePDF(getTargetElement, options)} className='bg-pink-700 text-white px-3 py-2 rounded'>Download</button>
        </div>
      <div id='content-id' >
        <h1 className='text-3xl mb-5 text-center'>Pumping Log</h1>
        <div className='flex justify-center my-5'>
         {allPumpingDetails?.length > 0 ?
           <div className="overflow-x-auto mx-2">
             <table className=" border text-center"  style={{borderColor: 'gray'}}>
               <thead style={{ backgroundColor: '#fde68a' }}>
                 <tr>
                   <th className="px-4 py-2 border">Sl.No.</th>
                   <th className="px-4 py-2 border">Date</th>
                   <th className="px-4 py-2 border">Start Time</th>
                   <th className="px-4 py-2 border">End Time</th>
                   <th className="px-4 py-2 border">Duration</th>
                   <th className="px-4 py-2 border">Side</th>
                   <th className="px-4 py-2 border">Quantity</th>
                   <th className="px-4 py-2 border">Actions</th>
                 </tr>
               </thead>
               <tbody>
                 {allPumpingDetails?.map((item, index) => (
                   <tr className="hover:bg-gray-50" key={index}>
                     <td className="px-4 py-2 border">{index + 1}</td>
                     <td className="px-4 py-2 border">{dayjs(item?.date).format('DD/MM/YYYY')}</td>
                     <td className="px-4 py-2 border">{dayjs(item?.starttime).format('hh:mm A')}</td>
                     <td className="px-4 py-2 border">{dayjs(item?.endtime).format('hh:mm A')}</td>
                     <td className="px-4 py-2 border">{item?.duration} mins</td>
                      <td className="px-4 py-2 border">{item?.quantity} ml</td>
                     <td className="px-4 py-2 border">{item?.side}</td>
                     <td className="px-4 py-2 border">
                       <button type='button' onClick={() => deletePumping(item?._id)} className=" px-2 py-1 rounded text-xs" style={{background:"red",color:"white"}}>Delete</button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
            :
           <p>No Pumpings added yet.</p>}
       </div>
       </div>
     </>
 
   )
 }
 

export default Pumping