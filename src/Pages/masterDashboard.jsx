import React, { useState } from 'react'
import NavMenu from '../Components/NavBar/NavMenu'
import MainSideMenu from '../Components/SideMenu/MainSideMenu'
import { bgColor } from '../PageStyle/pageStyleVariable'
import MasterForm from '../Components/Masters/MasterForm'
import { useSelector } from 'react-redux'
import { darkTheme, dayTheme } from '../PageStyle/colorsdarkWhite'
import MobileMenu from '../Components/SideMenu/MobileMenu'

function MasterDashboard() {
  const [menuLoaded, setMenuLoaded] = useState(true);
  const arabicAlignMent = useSelector((state) => state.arabicAlignMent)
  const darkModeState = useSelector((state) => state.darkMode)

  console.log('Arabic', arabicAlignMent)
  return (
    <div className='h-scree n relative' style={{ backgroundColor: darkModeState.checkvalue ? dayTheme.Dbgcolor : darkTheme.Dbgcolor, direction: arabicAlignMent.rightToLeft }}>
      <div className='flex'>
        <div className='sm:hidden md:hidden z-50 w-[17%]'><MainSideMenu menuLoaded={menuLoaded} setMenuLoaded={setMenuLoaded} /></div>
        <div className='xl:w-[83%] lg:w-[83%] sm:w-full'><MasterForm /></div>
      </div>
      <div className='absolute top-0 w-full'><NavMenu /></div>
      <div className={`absolute ${menuLoaded ? 'top-0' : 'bottom-1'} w-full z-50 flex justify-center xl:hidden lg:hidden`}>
        <MobileMenu menuLoaded={menuLoaded} setMenuLoaded={setMenuLoaded} />
      </div>

    </div>
  )
}

export default MasterDashboard