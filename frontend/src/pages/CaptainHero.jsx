import React, { useContext, useEffect } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainHero = () => {
    const {captain} =useContext(CaptainDataContext);
    useEffect(()=>{
        console.log(captain);
    })
  return (
    <div>captain hero</div>
  )
}

export default CaptainHero