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
//get all breastfeedings
export const getAllBreastfeedingsApi = async(id)=>{
    return await commonApi('GET', `${serverurl}/get-breastfeedings/${id}`)
}
//delete breastfeeding
export const deleteBreastfeedingApi = async(id)=>{
    return await commonApi('DELETE', `${serverurl}/delete-breastfeeding/${id}`)
}
//add bottlefeed
export const addBottlefeedApi = async(reqBody)=>{
    return await commonApi('POST', `${serverurl}/add-bottlefeed`,reqBody)
}
//get all bottlefeeds
export const getAllBottlefeedsApi = async(id)=>{
    return await commonApi('GET', `${serverurl}/get-bottlefeeds/${id}`)
}
//delete bottlefeed
export const deleteBottlefeedApi = async(id)=>{
    return await commonApi('DELETE', `${serverurl}/delete-bottlefeed/${id}`)
}
//add diaperchange
export const addDiaperchangeApi = async(reqBody)=>{
    return await commonApi('POST', `${serverurl}/add-diaperchange`,reqBody)
}
//get all Diaperchanges
export const getAllDiaperchangesApi = async(id)=>{
    return await commonApi('GET', `${serverurl}/get-diaperchanges/${id}`)
}
//delete Diaperchange
export const deleteDiaperchangeApi = async(id)=>{
    return await commonApi('DELETE', `${serverurl}/delete-diaperchange/${id}`)
}
//add sleep
export const addSleepApi = async(reqBody)=>{
    return await commonApi('POST', `${serverurl}/add-sleep`,reqBody)
}
//get all sleeps
export const getSleepsApi = async(id)=>{
    return await commonApi('GET', `${serverurl}/get-sleeps/${id}`)
}
//delete sleep
export const deleteSleepApi = async(id)=>{
    return await commonApi('DELETE', `${serverurl}/delete-sleep/${id}`)
}
//add pottytime
export const addPottytimeApi = async(reqBody)=>{
    return await commonApi('POST', `${serverurl}/add-pottytime`,reqBody)
}
//get all Pottytimes
export const getPottytimesApi = async(id)=>{
    return await commonApi('GET', `${serverurl}/get-pottytimes/${id}`)
}
//delete Pottytime
export const deletePottytimeApi = async(id)=>{
    return await commonApi('DELETE', `${serverurl}/delete-pottytime/${id}`)
}
//add Playtime
export const addPlaytimeApi = async(reqBody)=>{
    return await commonApi('POST', `${serverurl}/add-playtime`,reqBody)
}
//get all playtimes
export const getPlaytimesApi = async(id)=>{
    return await commonApi('GET', `${serverurl}/get-playtimes/${id}`)
}
//delete playtime
export const deletePlaytimeApi = async(id)=>{
    return await commonApi('DELETE', `${serverurl}/delete-playtime/${id}`)
}
//add bath
export const addBathApi = async(reqBody)=>{
    return await commonApi('POST', `${serverurl}/add-bath`,reqBody)
}
//get all baths
export const getBathsApi = async(id)=>{
    return await commonApi('GET', `${serverurl}/get-baths/${id}`)
}
//delete bath
export const deleteBathApi = async(id)=>{
    return await commonApi('DELETE', `${serverurl}/delete-bath/${id}`)
}
//add milestone
export const addMilestoneApi = async(reqBody)=>{
    return await commonApi('POST', `${serverurl}/add-milestone`,reqBody)
}
//get all milestones
export const getMilestonesApi = async(id)=>{
    return await commonApi('GET', `${serverurl}/get-milestones/${id}`)
}
//delete milestone
export const deleteMilestoneApi = async(id)=>{
    return await commonApi('DELETE', `${serverurl}/delete-milestone/${id}`)
}
//add health
export const addHealthApi = async(reqBody)=>{
    return await commonApi('POST', `${serverurl}/add-health`,reqBody)
}
//get all healths
export const getHealthsApi = async(id)=>{
    return await commonApi('GET', `${serverurl}/get-healths/${id}`)
}
//delete health
export const deleteHealthApi = async(id)=>{
    return await commonApi('DELETE', `${serverurl}/delete-health/${id}`)
}
//add pumping
export const addPumpingApi = async(reqBody)=>{
    return await commonApi('POST', `${serverurl}/add-pumping`,reqBody)
}
//get all pumpings
export const getPumpingsApi = async(usermail)=>{
    return await commonApi('GET', `${serverurl}/get-pumpings/${usermail}`)
}
//delete pumping
export const deletePumpingApi = async(id)=>{
    return await commonApi('DELETE', `${serverurl}/delete-pumping/${id}`)
}
//add photo
export const addPhotoApi = async(reqBody)=>{
    return await commonApi('POST', `${serverurl}/add-photo`,reqBody)
}
//get all photos
export const getAllPhotosApi = async(babyid)=>{
    return await commonApi('GET', `${serverurl}/get-photos/${babyid}`)
}
//delete pumping
export const deletePhotoApi = async(id)=>{
    return await commonApi('DELETE', `${serverurl}/delete-photo/${id}`)
}

//make payment
export const makePaymentApi = async(reqBody) =>{
    return await commonApi('PUT',`${serverurl}/make-payment`,reqBody)
}
//update stock
export const updateStockApi = async(id) =>{
    return await commonApi('PUT',`${serverurl}/update-stock/${id}`)
}

////////////////////////////////admin
//get all users
export const getAllUsersApi = async (reqHeader) =>{
    return await commonApi('GET', `${serverurl}/get-all-users`,'',reqHeader)
}
//add product
export const addProductApi = async(reqBody)=>{
    return await commonApi('POST', `${serverurl}/add-product`,reqBody)
}
//get all products
export const getAllProductsApi = async () =>{
    return await commonApi('GET', `${serverurl}/get-all-products`)
}
//delete product
export const deleteProductApi = async(id)=>{
    return await commonApi('DELETE', `${serverurl}/delete-product/${id}`)
}
//edit product
export const editProductDetailsApi = async (reqBody) =>{
    return await commonApi('PUT', `${serverurl}/edit-product-details`,reqBody)
}
