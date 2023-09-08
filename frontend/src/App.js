import LoginPage from "./components/auth/LoginPage";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SignupPage from "./components/auth/SignupPage";
import HomePage from "./components/home/HomePage";
import { Toaster } from "react-hot-toast";
import VerifyEmail from "./components/auth/VerifyEmail";
import { useEffect, useState } from "react";
import AuthContext from './context/AuthContext'
import ForgotPassword from "./components/auth/ForgotPassword";
import UpdatePW from "./components/auth/UpdatePW";
import AdminPanel from "./components/adminDashboard/AdminPanel";
import CustomerPage from "./components/customer/CustomerPage";
import Cheese from "./components/adminDashboard/creation/Cheese";
import Pizza from "./components/adminDashboard/creation/Pizza";
import Veggies from "./components/adminDashboard/creation/Veggies";
import Base from "./components/adminDashboard/creation/Base";
import Sauce from "./components/adminDashboard/creation/Sauce";
import ProfilePage from "./components/common/ProfilePage";
import CustomizePizza from "./components/customer/CustomizePizza";
import MyOrders from "./components/customer/MyOrders";
import jwtDecode from 'jwt-decode';
import ProfilePageCustomer from "./components/common/ProfilePageCustomer";
import OrderReceived from "./components/adminDashboard/OrderReceived";

function App() {
  const [signupData, setSignupData] = useState(null);
  const [userData, setUserData] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null);
  const [token, setToken] = useState(localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null);
  const setData = async() => {
    if(token){
      const decodedToken = await jwtDecode(token)
      if(decodedToken){
        setUserData(decodedToken)
      }
    }
  }
  useEffect(()=> {
    setData()
  }, [])
  
  return (
    <div className="App">
      <Toaster />
      <BrowserRouter>
        <AuthContext.Provider value={{signupData, setSignupData, userData, setUserData, token, setToken}}>
          <Routes >
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:id" element={<UpdatePW/>} />
            {
              userData?.role === "Admin" && (
                <>
                  <Route path="/adminPanel" element={<AdminPanel />}>
                    <Route path="/adminPanel/profilePage" element={<ProfilePage />} />
                    <Route path="/adminPanel/Cheese" element={<Cheese />} />
                    <Route path="/adminPanel/Sauce" element={<Sauce />} />
                    <Route path="/adminPanel/Base" element={<Base />} />
                    <Route path="/adminPanel/Veggies" element={<Veggies />} />
                    <Route path="/adminPanel/Pizza" element={<Pizza />} />
                    <Route path="/adminPanel/orders" element={<OrderReceived />} />
                  </Route>
                  <Route path="/home" element={<CustomerPage />} />
                </>
              )
            }
            {
              userData?.role === "Customer" && (
                <>
                  <Route path="/home" element={<CustomerPage />} />
                  <Route path="/customizePizza" element={<CustomizePizza />} />
                  <Route path="/myOrders" element={<MyOrders />} />
                  <Route path="/profilePage" element={<ProfilePageCustomer />} />
                </>
              )
            }
            {/* <Route path="*" element={<HomePage />} /> */}
          </Routes>
        </AuthContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
