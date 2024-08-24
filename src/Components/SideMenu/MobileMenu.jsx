import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import { NavBarComponentStyle } from '../../PageStyle/pageStyleVariable';
import { useDispatch, useSelector } from 'react-redux';
import { getMenuItems } from './manuFunctions';
import BeforeLoadAPI from '../CommanCoponent/BeforeLoadAPI';
import { reduceMenuData } from '../../svgimagejsript';
import MobileNestedMenu from './MobileNestedMenu';
import DefalutImage from '../../asset/Menusvg/main/card-image.svg';
import { darkTheme, dayTheme } from '../../PageStyle/colorsdarkWhite';

export default function MobileMenu({ menuLoaded, setMenuLoaded }) {

  const selectState = useSelector((state) => state.selectMenu);
  const darkModeState = useSelector((state) => state.darkMode);
  console.log("darkModeState", darkModeState)

  const dispatch = useDispatch()

  const [open, setOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [svgImages, setSvgImages] = useState([]);
  const [filterMenuId, setFilterMenuId] = useState(1);

  useEffect(() => {
    getMenuItems(setMenuItems)
      .then(() => {
        setMenuLoaded(false);
      })
      .catch((error) => {
        console.error('Error loading menu items:', error);
      });
  }, []);

  useEffect(() => {
    reduceMenuData().then(data => setSvgImages(data));
  }, []);



  return (
    <div className='w-11/12' >



      <div>
        <style>
          {`
        .hover-button {
          border: none;
          color: white;
          cursor: pointer;
        }
  

        .hover-button:hover {
          background: ${darkModeState.checkvalue ? dayTheme.mobileMenuActiveColor : darkTheme.mobileMenuActiveColor};
          box-shadow: 4px 4px 0px 0px #dddddd;
        }

        .menuactivebutton {
          background: ${darkModeState.checkvalue ? dayTheme.mobileMenuActiveColor : darkTheme.mobileMenuActiveColor};
          box-shadow: 4px 4px 0px 0px #dddddd;
        }

        .boxShadowMobile {
          box-shadow: ${darkModeState.checkvalue ?  `0px 1px 2px 3px #dddddd` : `none`};
        }

        .mobilemenudarkbgColor{
        background: ${darkModeState.checkvalue ? dayTheme.mobilemenubgColor : darkTheme.mobilemenubgColor};
        }


      
        `}
        </style>

        <div className={`flex rounded flex-col justify-between items-center ${open ? 'h-[85vh] mobilemenudarkbgColor' : 'h-full'}`}>
          {open && <MobileNestedMenu menuItems={menuItems} filterMenuId={filterMenuId} svgImages={svgImages} setOpen={setOpen} />}

          <div className='w-10/12 h-[10vh] my-2 boxShadowMobile rounded flex justify-evenly items-center' style={{ background: darkModeState.checkvalue ? dayTheme.DmenuCcolor : darkTheme.mobileMainMenuColor }}>
            {menuItems.menu && menuItems.menu.sort((a, b) => a.sortorder - b.sortorder).filter(item => !item.isseparator).map((item,index) => (
              <button key={item.id} className={`p-1 rounded ${item.id === filterMenuId ? 'menuactivebutton' : ''} hover-button`} onClick={() => { setFilterMenuId(item.id); setOpen(true); }}>
                {svgImages.filter((imageItems) => imageItems.name === item.image).map((menu) => (
                  <img key={menu.name} src={menu.image || DefalutImage} alt={menu.name} style={{ width: '33px',height:'33px'}} />
                ))}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className='absalute top-0'>
        {menuLoaded && <BeforeLoadAPI />}
      </div>


    </div>
  );
}
