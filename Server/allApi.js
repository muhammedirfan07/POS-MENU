import commonapi from "./commonApi.js"
import SERVERURL from "./serverUrl.js"

export const addItem = async(reqbody)=>{
    return await commonapi("POST",`${SERVERURL}/add-item`,reqbody)
}

export const getItem = async(searchKey)=>{
    return await commonapi("GET",`${SERVERURL}/view-item?search=${searchKey}`,{})
}

export const removeItem =async(id)=>{
    return await commonapi("DELETE",`${SERVERURL}/remove-item/${id}`,{})
}
export const updateItem =async(id,reqbody)=>{
    return await commonapi ("PUT",`${SERVERURL}/update-item/${id}`,reqbody)
}