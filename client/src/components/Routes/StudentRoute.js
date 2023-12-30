import { useState,useEffect } from "react";
import axios from "axios";
import Spinner from "../Spinner";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";


export default function StudentRoute(){
  const [ok,setOk] = useState(false);
  const [auth] = useAuth()

    useEffect(() =>{
        const authCheck = async() =>{
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/student-auth`)

            if(res.data.ok){
                setOk(true)
            }else{
                setOk(false)
            }
        }
        if(auth?.token) authCheck()
    },[auth?.token]);

    return ok? <Outlet /> : <Spinner />
}