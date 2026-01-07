
 const commonApi =async(httpMethod,url,reqBody)=>{
   try {
    const res =await axios({
        method: httpMethod,
      url,
      data: reqBody
    })
     return res
   } catch (error) {
    return error
   }
 }
 export default commonApi