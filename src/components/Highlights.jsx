import React, { useContext, useEffect } from 'react'
import { getAllBottlefeedsApi, getAllBreastfeedingsApi, getAllDiaperchangesApi, getBathsApi, getHealthsApi, getMilestonesApi, getPlaytimesApi, getPottytimesApi, getSleepsApi } from '../services/allApis'
import { todaysActivitiesContext } from '../context/Contexttoshare'
import dayjs from 'dayjs';



function Highlights({id}) {
  const {todaysActivities, setTodaysActivities} = useContext(todaysActivitiesContext)

const getData = async (id) =>{
    let newArray = []
    const breastfeedings = await getAllBreastfeedingsApi(id)
    if (breastfeedings.status == 200){
        newArray.push(breastfeedings.data.filter((item)=>dayjs(item.date).isSame(dayjs(), 'day')))
    }
    const bottlefeeds = await getAllBottlefeedsApi(id)
    if (bottlefeeds.status == 200){
        newArray.push(bottlefeeds.data.filter((item)=>dayjs(item.date).isSame(dayjs(), 'day')))
    }
    const diaperchanges = await getAllDiaperchangesApi(id)
    if (diaperchanges.status == 200){
        newArray.push(diaperchanges.data.filter((item)=>dayjs(item.date).isSame(dayjs(), 'day')))
    }
    const sleeps = await getSleepsApi(id)
    if (sleeps.status == 200){
        newArray.push(sleeps.data.filter((item)=>dayjs(item.date).isSame(dayjs(), 'day')))
    }
    const pottytimes = await getPottytimesApi(id)
    if (pottytimes.status == 200){
        newArray.push(pottytimes.data.filter((item)=>dayjs(item.date).isSame(dayjs(), 'day')))
    }
    const playtimes = await getPlaytimesApi(id)
    if (playtimes.status == 200){
        newArray.push(playtimes.data.filter((item)=>dayjs(item.date).isSame(dayjs(), 'day')))
    }
    const baths = await getBathsApi(id)
    if (baths.status == 200){
        newArray.push(baths.data.filter((item)=>dayjs(item.date).isSame(dayjs(), 'day')))
    }
    const milestones = await getMilestonesApi(id)
    if (milestones.status == 200){
        newArray.push(milestones.data.filter((item)=>dayjs(item.date).isSame(dayjs(), 'day')))
    }
    const healths = await getHealthsApi(id)
    if (healths.status == 200){
        newArray.push(healths.data.filter((item)=>dayjs(item.date).isSame(dayjs(), 'day')))
    }
    console.log(newArray.flat());
    
}
    useEffect(()=>{
getData(id)
    },[])
  return (
    <div className='bg-amber-100 m-3 p-3 rounded'>
            <h3>Today's Highlights</h3>
            <p>Nothing logged today</p>
            <p>{id}</p>

          </div>
  )
}

export default Highlights