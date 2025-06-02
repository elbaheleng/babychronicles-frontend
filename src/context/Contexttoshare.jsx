import React, { createContext, useState } from 'react'
export const addBabyStatusContext = createContext('')
export const babyContext = createContext('')



function Contexttoshare({ children }) {
      const [addBabyStatus, setAddBabyStatus] = useState({})
    const [baby, setBaby] = useState({})

     
    return (
       
                <babyContext.Provider value={{baby, setBaby}}>
                    <addBabyStatusContext.Provider value={{addBabyStatus, setAddBabyStatus}}>
                        {
                            children
                        }
                    </addBabyStatusContext.Provider>
                </babyContext.Provider>
            
    )
}

export default Contexttoshare