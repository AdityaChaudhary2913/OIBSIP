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

export const fetchPizza = async (route) => {
  const toastId = toast.loading("Loading...")
  try{
    const response = await axios.get(URL+route)
    toast.dismiss(toastId)
    const body = response.data.data;
    return body
  } catch(err){
    console.log(err)
    console.log("Error while fetching!")
  }
  toast.dismiss(toastId)
}

export const fetchPrice = async (route, body, token) => {
  const toastId = toast.loading("Loading...")
  try{
    const response = await axios.post(URL+route, body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }})
    toast.dismiss(toastId)
    return response.data.price;
  } catch(err){
    console.log(err)
    console.log("Error while fetching price!")
  }
  toast.dismiss(toastId)
}

export const orderPizza = async (route, body, token) => {
  const toastId = toast.loading("Loading...")
  try{
    const response = await axios.post(URL+route, body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }})
    toast.dismiss(toastId)
    return response;
  } catch(err){
    console.log(err)
    console.log("Error while ordering pizza!")
  }
  toast.dismiss(toastId)
}

export const fetchOrders = async (route, token) => {
  const toastId = toast.loading("Loading...")
  try{
    const response = await axios.get(URL+route, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }})
    toast.dismiss(toastId)
    return response;
  } catch(err){
    console.log(err)
    console.log("Error while getting pizza orders!")
  }
  toast.dismiss(toastId)
}

export const deleteOrder = async (route, body) => {
  const toastId = toast.loading("Loading...")
  try{
    const response = await axios.post(URL+route, body)
    toast.dismiss(toastId)
    return response;
  } catch(err){
    console.log(err)
    console.log("Error while deleting pizza order!")
  }
  toast.dismiss(toastId)
}