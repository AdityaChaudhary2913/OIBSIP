import { createContext } from "react";

const AuthContext = createContext({
  signupData:null,
  setSignupData:(createData) => {},
  userData: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  setUserData:(createUser) => {},
  token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null ,
  setToken:(createToken) => {}
})

export default AuthContext;