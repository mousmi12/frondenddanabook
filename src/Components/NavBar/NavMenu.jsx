import React from 'react'
import '../NavBar/NavMenu.css'
import SearchIcon from '@mui/icons-material/Search';
import { LoginPageStyle, NavBarComponentStyle } from '../../PageStyle/pageStyleVariable';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import loginLogo from '../../asset/zerobook.png'
import MenuIcon from '@mui/icons-material/Menu';
import MobileMenu from '../SideMenu/MobileMenu';
import LogOutBox from './LogOutBox';
import { useSelector } from 'react-redux';
import DarkModeLightModeSwitch from './DarkModeLightModeSwitch';

function NavMenu() {
    const arabicAlignMent = useSelector((state) => state.arabicAlignMent)
    return (
        <div className='NavMenuBgColor'>
            <div className={'flex justify-end items-center sm:justify-between md:justify-between md:px-2 sm:px-2'} style={{ height: NavBarComponentStyle.navBarHeight }}>
                <div className='flex justify-center items-center xl:hidden 2xl:hidden lg:hidden sm:my-5'><img src={loginLogo} width={LoginPageStyle.ZeroBookWidth} height={LoginPageStyle.zeroBookHeight} alt="" srcset="" /></div>
                <DarkModeLightModeSwitch />
                <div className='relative sm:hidden md:hidden'>
                    {/* <input type="text" className='rounded' style={{width:NavBarComponentStyle.navBarInputWidth,height:NavBarComponentStyle.navBarInputHight}}/>
                    <SearchIcon className='absolute left-0 shadow' style={{ color: NavBarComponentStyle.navBarSearchColor,width:NavBarComponentStyle.NavBarSearchIconSize,height:NavBarComponentStyle.NavBarSearchIconSize}} /> */}
                    <LogOutBox />

                </div>
            </div>
        </div>
    )
}

export default NavMenu