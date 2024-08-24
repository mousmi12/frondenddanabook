import React from 'react'
import './comman.css'
import { useSelector } from 'react-redux'

function BeforeLoadAPI() {
  const arabicAlignMent = useSelector((state) => state.arabicAlignMent)
  
  return (
    <div className={`w-full h-screen bg-white ${arabicAlignMent.rightToLeft === 'rtl' ? 'bgImageLoadArabic' : 'bgImageLoad' } absolute top-0 right-0`}>

    </div>
  )
}

export default BeforeLoadAPI