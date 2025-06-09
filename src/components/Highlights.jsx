import React, { useEffect, useState } from 'react'
import { getAllBottlefeedsApi, getAllBreastfeedingsApi, getAllDiaperchangesApi, getBathsApi, getHealthsApi, getMilestonesApi, getPlaytimesApi, getPottytimesApi, getSleepsApi } from '../services/allApis'
import dayjs from 'dayjs';
import { faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons';



function Highlights({ id ,log}) {
    const [breastfeedingsToday, setbreastfeedingsToday] = useState([])
    const [bottlefeedsToday, setbottlefeedsToday] = useState([])
    const [diaperchangesToday, setdiaperchangesToday] = useState([])
    const [sleepsToday, setsleepssToday] = useState([])
    const [pottytimesToday, setpottytimesToday] = useState([])
    const [playtimesToday, setplaytimesToday] = useState([])
    const [bathsToday, setbathsToday] = useState([])
    const [milestonesToday, setmilestonesToday] = useState([])
    const [healthsToday, sethealthsToday] = useState([])

    const getData = async (id) => {
        let breastfeedingsArray = []
        const breastfeedings = await getAllBreastfeedingsApi(id)
        if (breastfeedings.status == 200) {

            breastfeedingsArray.push(breastfeedings.data.filter((item) => dayjs(item.date).isSame(dayjs(), 'day')))
            breastfeedingsArray = breastfeedingsArray[0].sort((a, b) => dayjs(b.date) - dayjs(a.date))
            setbreastfeedingsToday(breastfeedingsArray)

        }
        let bottlefeedsArray = []
        const bottlefeeds = await getAllBottlefeedsApi(id)
        if (bottlefeeds.status == 200) {
            bottlefeedsArray.push(bottlefeeds.data.filter((item) => dayjs(item.date).isSame(dayjs(), 'day')))
            bottlefeedsArray = bottlefeedsArray[0].sort((a, b) => dayjs(b.date) - dayjs(a.date))
            setbottlefeedsToday(bottlefeedsArray)
        }
        let diaperchangesArray = []
        const diaperchanges = await getAllDiaperchangesApi(id)
        if (diaperchanges.status == 200) {
            diaperchangesArray.push(diaperchanges.data.filter((item) => dayjs(item.date).isSame(dayjs(), 'day')))
            diaperchangesArray = diaperchangesArray[0].sort((a, b) => dayjs(b.date) - dayjs(a.date))
            setdiaperchangesToday(diaperchangesArray)
        }
        let sleepsArray = []
        const sleeps = await getSleepsApi(id)
        if (sleeps.status == 200) {
            sleepsArray.push(sleeps.data.filter((item) => dayjs(item.date).isSame(dayjs(), 'day')))
            sleepsArray = sleepsArray[0].sort((a, b) => dayjs(b.date) - dayjs(a.date))
            setsleepssToday(sleepsArray)
        }
        let pottytimesArray = []

        const pottytimes = await getPottytimesApi(id)
        if (pottytimes.status == 200) {
            pottytimesArray.push(pottytimes.data.filter((item) => dayjs(item.date).isSame(dayjs(), 'day')))
            pottytimesArray = pottytimesArray[0].sort((a, b) => dayjs(b.date) - dayjs(a.date))
            setpottytimesToday(pottytimesArray)
        }
        let playtimesArray = []

        const playtimes = await getPlaytimesApi(id)
        if (playtimes.status == 200) {
            playtimesArray.push(playtimes.data.filter((item) => dayjs(item.date).isSame(dayjs(), 'day')))
            playtimesArray = playtimesArray[0].sort((a, b) => dayjs(b.date) - dayjs(a.date))
            setplaytimesToday(playtimesArray)
        }
        let bathsArray = []
        const baths = await getBathsApi(id)
        if (baths.status == 200) {
            bathsArray.push(baths.data.filter((item) => dayjs(item.date).isSame(dayjs(), 'day')))
            bathsArray = bathsArray[0].sort((a, b) => dayjs(b.date) - dayjs(a.date))
            setbathsToday(bathsArray)
        }
        let milestonesArray = []
        const milestones = await getMilestonesApi(id)
        if (milestones.status == 200) {
            milestonesArray.push(milestones.data.filter((item) => dayjs(item.date).isSame(dayjs(), 'day')))
            milestonesArray = milestonesArray[0].sort((a, b) => dayjs(b.date) - dayjs(a.date))
            setmilestonesToday(milestonesArray)
        }
        let healthArray = []
        const healths = await getHealthsApi(id)
        if (healths.status == 200) {
            healthArray.push(healths.data.filter((item) => dayjs(item.date).isSame(dayjs(), 'day')))
            healthArray = healthArray[0].sort((a, b) => dayjs(b.date) - dayjs(a.date))
            sethealthsToday(healthArray)
        }
    }


    useEffect(() => {

        getData(id)


    }, [log])
    return (
        <div className='bg-amber-100 m-3 p-3 rounded'>
            <h3 className='text-center mb-2 font-bold text-xl'>Today's Highlights</h3>
            {breastfeedingsToday.length > 0 ? (
                <div className='mb-2'>
                    <p className='font-bold text-pink-800'>Breastfeeding</p>
                    <p>Previous feed was at {dayjs(breastfeedingsToday[0]?.starttime).format('hh:mm A')} for {breastfeedingsToday[0]?.duration} mins</p>
                </div>
            ) : (
                <p>No breastfeeding logged today</p>
            )}
            {bottlefeedsToday.length > 0 ? (
                <div className='mb-2'>
                    <p className='font-bold text-pink-800'>Bottle feed</p>
                    <p>Previous feed was {bottlefeedsToday[0].quantity}ml {bottlefeedsToday[0].type} at {dayjs(bottlefeedsToday[0]?.starttime).format('hh:mm A')}</p>
                </div>
            ) : (
                <p>No bottle feed logged today</p>
            )}
            {diaperchangesToday.length > 0 ? (
                <div className='mb-2'>
                    <p className='font-bold text-pink-800'>Diaper change</p>
                    <p>{diaperchangesToday[0].type} at {dayjs(diaperchangesToday[0]?.starttime).format('hh:mm A')}</p>
                </div>
            ) : (
                <p>No diaper change logged today</p>
            )}
            {sleepsToday.length > 0 ? (
                <div className='mb-2'>
                    <p className='font-bold text-pink-800'>Sleep</p>
                    <p>Woke up at {dayjs(sleepsToday[0]?.endtime).format('hh:mm A')} after {sleepsToday[0].duration} min of sleep</p>
                </div>
            ) : (
                <p>No sleep logged today</p>
            )}
            {pottytimesToday.length > 0 ? (
                <div className='mb-2'>
                    <p className='font-bold text-pink-800'>Potty Time</p>
                    <p>{pottytimesToday[0].type} at {dayjs(pottytimesToday[0]?.time).format('hh:mm A')} </p>
                </div>
            ) : (
                <p>No potty time logged today</p>
            )}
            {playtimesToday.length > 0 ? (
                <div className='mb-2'>
                    <p className='font-bold text-pink-800'>Play Time</p>
                    <p>Played at {dayjs(playtimesToday[0]?.starttime).format('hh:mm A')} for {playtimesToday[0].duration} minutes</p>
                </div>
            ) : (
                <p>No play time logged today</p>
            )}
            {bathsToday.length > 0 ? (
                <div className='mb-2'>
                    <p className='font-bold text-pink-800'>Bath</p>
                    <p>Took bath at {dayjs(bathsToday[0]?.starttime).format('hh:mm A')}</p>
                </div>
            ) : (
                <p>No bath logged today</p>
            )}

        </div>
    )
}

export default Highlights