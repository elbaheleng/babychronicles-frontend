import React, { createContext, useState } from 'react'
export const addBabyStatusContext = createContext('')
export const babyContext = createContext('')
export const todaysActivitiesContext = createContext('')



function Contexttoshare({ children }) {
    const [addBabyStatus, setAddBabyStatus] = useState({})
    const [baby, setBaby] = useState({})
    const [todaysActivities, setTodaysActivities] = useState([])


    return (
        <babyContext.Provider value={{ baby, setBaby }}>
            <todaysActivitiesContext.Provider value={{ todaysActivities, setTodaysActivities }}>
                <addBabyStatusContext.Provider value={{ addBabyStatus, setAddBabyStatus }}>
                    {
                        children
                    }
                </addBabyStatusContext.Provider>
            </todaysActivitiesContext.Provider>
        </babyContext.Provider>

    )
}

export default Contexttoshare