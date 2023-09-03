import axios from "axios"
import { toast } from "react-hot-toast"

const URL = process.env.REACT_APP_BACKEND_URL + '/pizza';

export const create = async (route, body, token) => {
  const toastId = toast.loading("Loading...")
  try{
    const response = await axios.post(URL+route, body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    toast.dismiss(toastId)
    return response
  } catch(err){
    console.log(err)
    console.log("Error while creating!")
  }
  toast.dismiss(toastId)
}