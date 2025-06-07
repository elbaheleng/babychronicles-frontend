import React, { useContext, useEffect, useState } from 'react'
import { babyContext } from '../context/Contexttoshare'
import Header from '../components/Header'
import { deleteBottlefeedApi, getAllBottlefeedsApi } from '../services/allApis'
import { toast } from 'react-toastify'
import dayjs from 'dayjs';
import { Link } from 'react-router-dom'
import generatePDF, { Resolution, Margin } from 'react-to-pdf';


function Bottlefeedlog() {
 const { baby, setBaby } = useContext(babyContext)
  //console.log(baby);
  const [allBottlefeedDetails, setAllBottlefeedDetails] = useState([])
  const [deleteBottlefeedStatus, setDeleteBottlefeedStatus] = useState({})
  
   
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

  const getAllBottlefeeds = async (id) => {
 
    const result = await getAllBottlefeedsApi(id)
    if (result.status == 200) {
      setAllBottlefeedDetails(result.data)
    } else {
      toast.error("Something went wrong")
    }
  }
  // console.log(allBreastfeedingDetails);
  const deleteBottlefeed = async (id) => {
    
    const result = await deleteBottlefeedApi(id)
    if (result.status == 200) {
      setDeleteBottlefeedStatus(result.data)
    } else {
      toast.error("Something went wrong")
    }
  }
  useEffect(() => {
    const baby1 = JSON.parse(localStorage.getItem("baby"))
   // console.log(baby1);
    setBaby(baby1)
    getAllBottlefeeds(baby1._id)

  }, [ deleteBottlefeedStatus])
  return (
    <>
      <Header />
      <div className=' mt-5  me-5 md:me-20 flex justify-end'>
        <Link to={'/dashboard'}><button className='bg-pink-700 text-white px-3 py-2 rounded me-3'>Back To Dashboard</button></Link>
        <button type='button'onClick={() => generatePDF(getTargetElement, options)} className='bg-pink-700 text-white px-3 py-2 rounded'>Download</button>
        </div>
      <div id='content-id' >
        <h1 className='text-3xl mb-5 text-center'>{baby?.name}'s Bottle feed Log</h1>
        <div className='flex justify-center my-5'>
        {allBottlefeedDetails?.length > 0 ?
          <div className="overflow-x-auto mx-2">
            <table className=" border text-center"  style={{borderColor: 'gray'}}>
              <thead style={{ backgroundColor: '#fde68a' }}>
                <tr>
                  <th className="px-4 py-2 border">Sl.No.</th>
                  <th className="px-4 py-2 border">Date</th>
                  <th className="px-4 py-2 border">Time</th>
                  <th className="px-4 py-2 border">Type</th>
                  <th className="px-4 py-2 border">Quantity</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allBottlefeedDetails?.map((item, index) => (
                  <tr className="hover:bg-gray-50" key={index}>
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-4 py-2 border">{dayjs(item?.date).format('DD/MM/YYYY')}</td>
                    <td className="px-4 py-2 border">{dayjs(item?.time).format('hh:mm A')}</td>
                    <td className="px-4 py-2 border">{item?.type}</td>
                    <td className="px-4 py-2 border">{item?.quantity} ml</td>
                    <td className="px-4 py-2 border">
                      <button type='button' onClick={() => deleteBottlefeed(item?._id)} className="px-2 py-1 rounded text-xs" style={{background:"red",color:"white"}}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> :
          <p>No Bottle feeds added yet.</p>}
      </div>
      </div>
    </>

  )
}

export default Bottlefeedlog