import React, { useEffect, useState } from 'react'
import ZeroBookLogo from '../../asset/zerobook.png'
import { NavBarComponentStyle, sideMenuDesign } from '../../PageStyle/pageStyleVariable'
import star from '../../asset/sidebar First Menu icons/star (fev).png'
import circle from '../../asset/sidebar First Menu icons/trecircle.png'
import accounting from '../../asset/sidebar First Menu icons/accounting.png'
import inventory from '../../asset/sidebar First Menu icons/inventory.png'
import dashboard from '../../asset/sidebar First Menu icons/dashboard.png'
import setting from '../../asset/sidebar First Menu icons/setting.png';
import NestedSideMenu from './NestedSideMenu'
import { getMenuItems } from './manuFunctions'
import ReloadComponent from '../CommanCoponent/ReloadComponent'
import BeforeLoadAPI from '../CommanCoponent/BeforeLoadAPI'
import { svgImgPath } from '../../svgimagePath'
import DefalutImage from '../../asset/Menusvg/main/card-image.svg';
import './menusStyle.css'
import { useDispatch, useSelector } from 'react-redux'
import { selectMenuFunction } from '../../Redux/Reducer/activateMenuSlice'
import { selectLabelFunction } from '../../Redux/Reducer/labelModelSlice'
import { getMenuImageStracture, reduceMenuData } from '../../svgimagejsript'
import { darkTheme, dayTheme } from '../../PageStyle/colorsdarkWhite'
import { selectArabicAlignmentFunction } from '../../Redux/Reducer/arabicRightToLeftSlice'



// import'./style.css'

function MainSideMenu({ menuLoaded, setMenuLoaded }) {

    const loginresponse = JSON.parse(sessionStorage.getItem('responseobjerct'));

    const [menuItems, setMenuItems] = useState([])
    const [filterMenuId, setFilterMenuId] = useState(null)
    const [svgImages, setSvgImages] = useState([])
    const dispatch = useDispatch();
    const arabicAlignMent = useSelector((state) => state.arabicAlignMent)
    const darkModeState = useSelector((state) => state.darkMode)


    //svgImagepaths
    useEffect(() => {
        reduceMenuData().then(data => setSvgImages(data));
    }, [])



    // arabic direction
    useEffect(() => {
        dispatch(selectArabicAlignmentFunction({ rightToLeft: loginresponse?.user_textrtl === '0' ? 'ltr' : 'rtl' }))
    }, [])


    useEffect(() => {
        getMenuItems(setMenuItems, dispatch)
            .then(() => {
                setMenuLoaded(false);  //before Load API 
            })
            .catch((error) => {
                console.error('Error loading menu items:', error);
            });
    }, []);




    // useEffect(()=>{
    //     setIconClassName()
    // },[iconClassName])

    return (
        <div className='h-screen py-3 w-[97%]'>
            <style>
                {
                    `
                    .buttonBgColorActiveMenu{
                     background:${darkModeState.checkvalue ? dayTheme.DmenuButnColor : darkTheme.DmenuButnColor};
                    }

                    .buttonColor{
                    background:${darkModeState.checkvalue ? dayTheme.DmenuCcolor : darkTheme.DmenuCcolor};
                    }

                    .buttonColor:hover{
                    background:${darkModeState.checkvalue ? dayTheme.DmenuButnColor : darkTheme.DmenuButnColor};
                    }                      
                    `
                }
            </style>
            <div className='flex items-center justify-center'>
                <img src={ZeroBookLogo} alt="ZeroBook" width={NavBarComponentStyle.zeroBookImgWidth} height={NavBarComponentStyle.zeroBookImgHeight} />
            </div>
            <div className='flex rounded-xl h-[95%] my-3 shadow sm:hidden' style={{ background: darkModeState.checkvalue ? dayTheme.DmenuCcolor : darkTheme.DmenuCcolor }}>
                <div className={`mt-[30%] w-[50%]`}>
                    <div className='flex w-[95%] h-[100%] flex-col justify-start'>
                        {menuItems.menu && menuItems.menu.sort((a, b) => a.sortorder - b.sortorder).map((item, index, array) => {
                            if (index === 0 && filterMenuId === null) {
                                if (item.label !== 'Line') {
                                    setFilterMenuId(item.id);
                                } else if (array.length > 1) {
                                    // If the first item is "Line" and there is a second item, set its ID
                                    setFilterMenuId(array[1].id);
                                }
                            }

                            if (index === 0 && item.label === 'Line') {
                                return null
                            } 

                            // Find the corresponding SVG path for the current menu item
                            const imgitem = svgImages.find(imgitem => imgitem.name === item.image);
                            // Check if the current item is a separator
                            const currentItemIsSeparator = item.isseparator && !item.dockinbottom;
                            // Check if the previous item is a separator
                            const previousItemIsSeparator = index > 0 && array[index - 1].isseparator && !array[index - 1].dockinbottom;

                            const imageSource = imgitem?.image || DefalutImage


                            return (
                                <div className={`mt-3`} key={item.id}>


                                    {imageSource && !item.dockinbottom && !item.isseparator ? (
                                        <button
                                            className={`
                                                ${item.id === filterMenuId
                                                    ? 'buttonBgColorActiveMenu'
                                                    : 'buttonColor'
                                                } 
                                                hover:shadow 
                                                rounded-r-2xl 
                                                flex 
                                                flex-col 
                                                justify-center 
                                                items-center 
                                                w-[95%]
                                              `}

                                            style={{ height: sideMenuDesign.buttonHeight }}
                                            onClick={() => {
                                                setFilterMenuId(item.id);
                                                dispatch(selectLabelFunction({ label: item.label }))
                                            }}


                                        >
                                            <img
                                                src={imageSource}
                                                alt=""
                                                style={{
                                                    width: sideMenuDesign.firstColumnIconWidth,
                                                    filter: darkModeState.checkvalue ? dayTheme.svgImageColor : darkTheme.svgImageColor
                                                }}
                                            />
                                            <label className='font-bold' style={{ fontSize: '9px', color: (darkModeState.checkvalue ? dayTheme.menuLabelColor : darkTheme.menuLabelColor) }}>{item.label.toUpperCase()}</label>
                                        </button>
                                    ) : (
                                        // Check if it's a separator and the previous item is not a separator
                                        currentItemIsSeparator && !previousItemIsSeparator &&
                                        <hr className='my-1 w-full border border-black' />
                                    )}
                                </div>
                            );
                        })}

                        <div className='mt-auto menubottomStyle py-2'>
                            {menuItems.menu && menuItems.menu.some(item => item.isseparator) && menuItems.menu.map((item) => {
                                const imgitem = svgImages.find(imgitem => imgitem.name === item.image);

                                return (
                                    !item.isseparator && item.dockinbottom && (
                                        <div key={item.id} className='mt-2'>
                                            <button
                                                className={`${item.id === filterMenuId ? 'buttonBgColorActiveMenu' : 'buttonColor'}  hover:shadow rounded-r-2xl flex flex-col justify-center items-center w-[95%]`}
                                                style={{ height: sideMenuDesign.buttonHeight }}
                                                onClick={() => setFilterMenuId(item.id)}
                                            >
                                                <img
                                                    src={imgitem?.image || DefalutImage}
                                                    alt=""
                                                    style={{
                                                        width: sideMenuDesign.firstColumnIconWidth,
                                                        filter: darkModeState.checkvalue ? dayTheme.svgImageColor : darkTheme.svgImageColor

                                                    }}
                                                />
                                                <label className='font-bold' style={{ fontSize: '9px', color: (darkModeState.checkvalue ? dayTheme.menuLabelColor : darkTheme.menuLabelColor) }}>{item.label.toUpperCase()}</label>
                                            </button>
                                        </div>
                                    )
                                );
                            })}
                        </div>
                        {/* <div className='mt-3'>
                            <button
                                className={`hover:shadow hover:bg-[#a6a3c9] rounded-r-2xl flex flex-col justify-center items-center`}
                                style={{ width: sideMenuDesign.buttonWidth, height: sideMenuDesign.buttonHieght }}

                            >
                                <img src={setting} alt="" style={{ width: sideMenuDesign.firstColumnIconWidth }} />

                            </button>
                        </div> */}
                    </div>
                </div>
                <div className='w-[50%]'>
                    <NestedSideMenu menuItems={menuItems} filterMenuId={filterMenuId} />

                </div>
            </div>
            {menuLoaded && <BeforeLoadAPI />}
        </div>

    )
}

export default MainSideMenu