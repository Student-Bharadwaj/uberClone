import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const CaptainProtectPage = ({children}) => {
    const navigate=useNavigate();


   const token= localStorage.getItem("token");

    useEffect(() => {
        if(!token){
            navigate("/captain-login");

        }

    }, [token])
    

  return (
    <div>
        {children}
    </div>
  )
}

export default CaptainProtectPage
