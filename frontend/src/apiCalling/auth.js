import axios from "axios"
import { toast } from "react-hot-toast"

const URL = process.env.REACT_APP_BACKEND_URL;

export const unAuthenticatedPostRequest = async (route, body, navigate, text, setToken, setUserData) => {
  const toastId = toast.loading("Loading...")
  try{
    const response = await axios.post(URL+route, body)
    console.log("Authentication Done!")
    toast.dismiss(toastId)
    if(text === "login"){
      // setToken(response.data.token);
      // localStorage.setItem("token", JSON.stringify(response.data.token))
      setUserData(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user))
      navigate('/home')
    }
    else{
      navigate('/login')
    }
    return response
  } catch(err){
    console.log(err)
    console.log("Error while Authentication!")
  }
  toast.dismiss(toastId)
}

export const sendOTP = async (route, body, navigate) => {
  const toastId = toast.loading("Loading...")
  try{
    const response = await axios.post(URL+route, body)
    toast.dismiss(toastId)
    navigate('/verify-email')
    return response
  } catch(err){
    console.log(err)
    console.log("Error while Sending OTP!")
  }
  toast.dismiss(toastId)
}

export const sendResetPasswordMail = async (route, body, navigate) => {
  const toastId = toast.loading("Loading...")
  try{
    const response = await axios.post(URL+route, body)
    toast.dismiss(toastId)
    navigate('/verify-email')
    return response
  } catch(err){
    console.log(err)
    console.log("Error while Sending Mail!")
  }
  toast.dismiss(toastId)
}

export const resetPasswordFinal = async (route, body, navigate) => {
  const toastId = toast.loading("Loading...")
  try{
    const response = await axios.post(URL+route, body)
    toast.dismiss(toastId)
    navigate('/login')
    return response
  } catch(err){
    console.log(err)
    console.log("Error while Resetting Password!")
  }
  toast.dismiss(toastId)
}

export const logout = (navigate, setUserData) => {
  const toastId = toast.loading("Loading...")
  try{
    setUserData(null);
    localStorage.removeItem("user");
    navigate('/login')
    toast.success("Logged Out");
  } catch(err){
    console.log(err)
    console.log("Error while Logging Out!")
  }
  toast.dismiss(toastId)
}

