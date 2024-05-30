import React from 'react';
import { useEffect,useState } from 'react';
import { useLocation } from 'react-router-dom';

const ShowHeader=({children})=> {

    const location=useLocation();

    const [showHeader,setShowHeader]=useState(false);
     
    useEffect(()=>{
        if(location.pathname === '/sign-in' ||
        location.pathname === '/sign-up'){
            setShowHeader(false);
        }else{
            setShowHeader(true);
        }
    },[location])   
  return (
    <div>{showHeader && children}</div>
  )
}

export default ShowHeader;