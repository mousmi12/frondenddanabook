import React, { useEffect, useState } from 'react';
import { sideMenuDesign } from '../../PageStyle/pageStyleVariable';
import cyberpayment from '../../asset/Nested Side Menu icons/chequepayment.png';
import DefalutImage from '../../asset/Menusvg/main/card-image.svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectMenuFunction } from '../../Redux/Reducer/activateMenuSlice';
import { svgImgPath } from '../../svgimagePath';
import { reduceMenuData, reduceNestedMenuData } from '../../svgimagejsript';
import { selectSubmenuLabelFunction } from '../../Redux/Reducer/subMenuLabelSlice';
import { darkTheme, dayTheme } from '../../PageStyle/colorsdarkWhite';


function NestedSideMenu({ menuItems, filterMenuId }) {
    const [activeSubmenu, setActiveSubmenu] = useState(null);
    const [svgImages, setSvgImages] = useState([])
    const selectState = useSelector((state) => state.selectMenu);
    const dispatch = useDispatch();
    // create useSelector for Arabic Alignmwnt
    const arabicAlignMent = useSelector((state) => state.arabicAlignMent)

    const darkModeState = useSelector((state) => state.darkMode)



    useEffect(() => {
        reduceMenuData().then(data => setSvgImages(data));
    }, [])

    console.log("imagepaths", svgImages)

    const handleSubmenuClick = (submenuId) => {
        if (activeSubmenu === submenuId) {
            setActiveSubmenu(null);
        } else {
            setActiveSubmenu(submenuId);
        }
    };

    return (
        <div className='shadow h-full'>
            <style>
                {
                    `
                    .buttonBgColorActiveMenuNest{
                     background:${darkModeState.checkvalue ? dayTheme.DmenuButnColor : darkTheme.DmenuButnColor};
                    }

                    .borderColorGradiant{
                    border:${darkModeState.checkvalue ? `solid 2px ${dayTheme.nestedMenuBorderColor}` : `${darkTheme.nestedMenuBorderColor}`};
                    }

    
                
                    `
                }
            </style>
            <div className='flex justify-center rounded-xl' style={{ background: darkModeState.checkvalue ? dayTheme.DmenuCcolor : darkTheme.DmenuCcolor }}>
                <div className='flex justify-center h-[80vh]'>
                    <div className='flex flex-col justify-start mt-3 overflow-y-auto h-[85vh]'>
                        {menuItems.menu && menuItems.menu
                            .filter((filter) => filter.id === filterMenuId)
                            .sort((a, b) => a.sortorder - b.sortorder)
                            .map((item) => (
                                <div key={item.id}>
                                    {item.submenus && item.submenus.length > 0 &&
                                        item.submenus
                                            .sort((a, b) => a.sortorder - b.sortorder)
                                            .map((submenu, index) => {
                                                const isSeparator = submenu.isseparator;
                                                const previousSubmenu = index > 0 ? item.submenus[index - 1] : null;
                                                const isPreviousSeparator = previousSubmenu && previousSubmenu.isseparator;
                                                const imgitem = svgImages.find(imgitem => imgitem.name === submenu.image);

                                                if (isSeparator) {
                                                    // If current submenu is a separator, render <hr> only if it's not consecutive
                                                    return !isPreviousSeparator ? (
                                                        <hr key={`separator-${index}`} className='my-1 w-full border border-black' />
                                                    ) : null;
                                                } else {
                                                    // Render regular submenu content
                                                    return (
                                                        <div className='flex flex-col items-center justify-center mt-2' key={submenu.id} onMouseLeave={() => handleSubmenuClick(null)}>
                                                            <button
                                                                className={`${selectState.opid === submenu.opid ? `buttonBgColorActiveMenuNest` : 'bg-white borderColorGradiant rounded-xl'} ${submenu.dockinbottom ? 'mt-auto' : 'mt-0'} hover:border-none rounded-xl px-2 py-1`}
                                                                onClick={() => dispatch(selectMenuFunction({ name: submenu.primaryaction.name, opid: submenu.opid }))}
                                                            >

                                                                <img src={imgitem?.image || DefalutImage} alt="" style={{ width: sideMenuDesign.firstColumnIconWidth, height: sideMenuDesign.firstColumnIconHeight }} onMouseOver={() => handleSubmenuClick(submenu.id)} />
                                                            </button>
                                                            {submenu?.label ? (
                                                               <label
                                                               className='font-bold text-center'
                                                               style={{
                                                                   fontSize: '9px',
                                                                   color: darkModeState.checkvalue ? dayTheme.menuLabelColor : darkTheme.menuLabelColor
                                                               }}>
                                                               {submenu.label ? submenu.label : submenu.label}
                                                           </label>
                                                           
                                                            ) : null}
                                                            {activeSubmenu === submenu.id && submenu.actions && submenu.actions.length > 1 && (
                                                                <div className='flex justify-evenly items-center w-full'>
                                                                    {submenu.actions.map((action, index) => (
                                                                        <div>
                                                                            {action.name === "Insert" ? (
                                                                                <button className={`${submenu.opid === selectState.opid && action.name === selectState.name ? 'buttonBgColorActiveMenuNest' : 'bg-white'}`} key={index} onClick={() => { dispatch(selectMenuFunction({ name: action.name, opid: submenu.opid })); dispatch(selectSubmenuLabelFunction({ submenulabel: submenu.label })) }}>
                                                                                    <svg width="17" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                        <path d="M7.76705 4.64631V10.7401H8.80114V4.64631H7.76705ZM5.23722 7.17614V8.21023H11.331V7.17614H5.23722Z" fill="black" />
                                                                                        <rect x="0.5" y="0.5" width="15" height="15" rx="1.5" stroke="black" />
                                                                                    </svg>
                                                                                </button>
                                                                            ) : (
                                                                                <button className={`${submenu.opid === selectState.opid && action.name === selectState.name ? 'buttonBgColorActiveMenuNest' : 'bg-white'}`} key={index} onClick={() => { dispatch(selectMenuFunction({ name: action.name, opid: submenu.opid })); dispatch(selectSubmenuLabelFunction({ submenulabel: submenu.label })) }}>
                                                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                        <rect x="0.5" y="0.5" width="15" height="15" rx="1.5" stroke="black" />
                                                                                        <path d="M7.92045 13V6.45455H8.92614V13H7.92045ZM8.43182 5.36364C8.2358 5.36364 8.06676 5.29688 7.92472 5.16335C7.78551 5.02983 7.71591 4.86932 7.71591 4.68182C7.71591 4.49432 7.78551 4.33381 7.92472 4.20028C8.06676 4.06676 8.2358 4 8.43182 4C8.62784 4 8.79545 4.06676 8.93466 4.20028C9.0767 4.33381 9.14773 4.49432 9.14773 4.68182C9.14773 4.86932 9.0767 5.02983 8.93466 5.16335C8.79545 5.29688 8.62784 5.36364 8.43182 5.36364Z" fill="black" />
                                                                                    </svg>
                                                                                </button>
                                                                            )}

                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                }
                                            })
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );


}

export default NestedSideMenu;
