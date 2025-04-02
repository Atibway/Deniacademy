"use client"

import React, { useEffect, useState } from 'react'
import { LoginModal } from '../modals/loginModal';


export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
setIsMounted(true)
    }, [])

    if(!isMounted){
return null;
    }
  return (
    <div>
       <LoginModal/>
    </div>
  )
}
