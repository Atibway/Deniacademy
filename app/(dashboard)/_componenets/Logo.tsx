
import Image from 'next/image'
import React from 'react'

export const Logo = () => {
  return (
    <div className='flex'>
        
        <Image
        height={30}
        width={30}
        alt='logo'
        src={"/logo.svg"}
        className=''
        />
        <span className='font-semibold mt-[4px] text-primary/80 font-sans  '>DeniAcademy</span>
    </div>
  )
}