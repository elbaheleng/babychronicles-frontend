import { commonApi } from "./commonApi"
import { serverurl } from "./serverurl"

//register api - content type -application/json
export const registerApi = async (reqBody) => {
    return await commonApi('POST', `${serverurl}/register`,reqBody)
}

// login
export const loginApi = async (reqBody) =>{
    return await commonApi('POST', `${serverurl}/login`,reqBody)
}

//get all babies added by user
// login
export const getAllBabiesByUserApi = async (reqHeader) =>{
    return await commonApi('GET', `${serverurl}/get-all-babies`,'',reqHeader)
}
//add a new baby
export const addANewBabyApi = async(reqBody)=>{
    return await commonApi('POST', `${serverurl}/add-a-new-baby`,reqBody)
}
//edit baby details
export const editBabyDetailsApi = async (reqBody) =>{
    return await commonApi('PUT', `${serverurl}/edit-baby-details`,reqBody)
}
//add breastfeeding
export const addBreastfeedingApi = async(reqBody)=>{
    return await commonApi('POST', `${serverurl}/add-breastfeeding`,reqBody)
}