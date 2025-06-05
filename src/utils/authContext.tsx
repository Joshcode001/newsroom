import React,{createContext,useState, PropsWithChildren} from "react";
import { useRouter } from "expo-router";


type Auth = {
  isLoggedIn: boolean,
  LogIn: () => void,
  LogOut: () => void
}


export const AuthContext = createContext({
  isLoggedIn: false,
  LogIn: () => {},
  LogOut: () => {}
})



export function AuthProvider ({children}:PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

const LogIn = () => {
  setIsLoggedIn(true)
  router.replace('/')
}


const LogOut = () => {
  setIsLoggedIn(false)
}


  return (
    <AuthContext.Provider value={{isLoggedIn, LogIn, LogOut}}>
          {children}
    </AuthContext.Provider>
  )
}