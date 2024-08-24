import React, { useRef } from 'react';
import DefaultImage from '../../asset/Menusvg/main/card-image.svg';
import './mobile.css'; // Make sure to import your CSS file
import { selectMenuFunction } from '../../Redux/Reducer/activateMenuSlice';
import { useDispatch, useSelector } from 'react-redux';
import { darkTheme, dayTheme } from '../../PageStyle/colorsdarkWhite';
import { selectSubmenuLabelFunction } from '../../Redux/Reducer/subMenuLabelSlice';

function MobileNestedMenu({ menuItems, filterMenuId, svgImages, setOpen }) {
    const selectState = useSelector((state) => state.selectMenu);
    const darkModeState = useSelector((state) => state.darkMode);
    const dispatch = useDispatch();

    const handlecloseMobileMenu = () => {
        setOpen(false)
    }

    const handleTouchStart = (e) => {
        e.target.dataset.touchStartX = e.touches[0].clientX;
        const touchStartR = e.target.dataset;
        console.log("ddddddd", e.touches);
    };

    const handleTouchMove = (e) => {
        const touchStartX = e.target.dataset.touchStartX;
        if (touchStartX) {
            const touchEndX = e.touches[0].clientX;
            if (touchStartX > touchEndX) {
                e.target.closest('.sideSlice').classList.add('shrink');
            } else {
                e.target.closest('.sideSlice').classList.remove('show-text', 'shrink');
            }
        }
    };

    const handleTouchEnd = (e) => {
        const touchStartX = e.target.dataset.touchStartX;

        if (touchStartX) {
            const touchEndX = e.changedTouches[0].clientX;
            if (touchStartX > touchEndX) {
                e.target.closest('.sideSlice').classList.add('show-text', 'shrink');


            } else {
                e.target.closest('.sideSlice').classList.remove('shrink');
            }
        }
        delete e.target.dataset.touchStartX;
    };

    return (
        <div className='w-full z-50 overflow-y-auto' >
            <style>
                {
                    `.buttonbackground{
                    background: linear-gradient(to right, #373195, #5fa1d6);
                    }

                    .buttonColor{
                    background:${darkModeState.checkvalue ? dayTheme.mobileNestedMenuButtonColor : darkTheme.mobileNestedMenuButtonColor};
                    }

                    .buttonColor:hover{
                    background:${darkModeState.checkvalue ? dayTheme.mobileMenuActiveColor : darkTheme.mobileMenuActiveColor};
                    }

                    .shadowmenu{
                      box-shadow: 0 0.5rem 1rem 10px rgba(0, 0, 0, 0.15) !important;
                    }
        
                      .buttonSvgBagroundColor{
                      background:${darkModeState.checkvalue ? dayTheme.mobileMainMenuColor : darkTheme.mobileMainMenuColor};
            
                      }

                      .topsradious{
                      border-radius:10px 10px 0px 0px;
                      }

                      
                    `
                }
            </style>
            {menuItems.menu && menuItems.menu
                .sort((a, b) => a.sortorder - b.sortorder)
                .filter(filter => filter?.id === filterMenuId)
                .map((item) => (
                    <div key={item.id} className='flex flex-col items-center'>
                        {item?.submenus?.filter((filter) => filter.label !== 'Line').sort((a, b) => a.sortorder - b.sortorder)?.map((subitem,index) => (
                            <div
                                key={subitem.id}
                                className={`w-full h-[10vh] ${index == 0 ? 'topsradious' : ''} shadow flex items-center sideSlice relative shadowmenu`}
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}
                            >

                                {/* <div className="hi-text flex">
                                    {subitem.actions.map((item) => (
                                        <div key={item.id}>
                                            {svgImages.filter((imageItem) => imageItem.name === item.image).map((menu) => (
                                                <button className='flex items-center' key={menu.id}>
                                                    <img src={menu?.image || DefaultImage} alt="" style={{ width: '10px' }} />  <span>{item.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    ))}
                                </div> */}

                                {svgImages.filter((imageItem) => imageItem.name === subitem.image)?.map((menu) => (
                                    <div className='w-full buttonbackground h-[100%] relative'>
                                        <button className={`p-1 buttonColor ${index == 0 ? 'topsradious' : ''} relative w-full h-full flex items-center sideSl`} onClick={() => { dispatch(selectMenuFunction({ name: subitem.primaryaction.name, opid: subitem.opid })); handlecloseMobileMenu(); }}>
                                            <img key={menu.id} src={menu?.image || DefaultImage} alt="" className='rounded p-1 buttonSvgBagroundColor' style={{ width: '40px', height:'40px' }} />
                                            <span className='text-black font-bold pl-3'>{subitem?.label}</span>
                                        </button>
                                    </div>
                                ))}

                                <div className="hi-text flex w-full">
                                    {subitem.actions?.map((item) => (
                                        <div key={item.id}>
                                            {svgImages.filter((imageItem) => imageItem.name === item.image)?.map((menu) => (

                                                <button
                                                    className='flex items-center'
                                                    key={menu.id}
                                                    onClick={() => {
                                                        dispatch(selectMenuFunction({ name: item.name, opid: subitem.opid }));
                                                        handlecloseMobileMenu();
                                                        dispatch(selectSubmenuLabelFunction({ submenulabel: subitem.label }));
                                                    }}


                                                >
                                                    <img src={menu?.image || DefaultImage} alt="" style={{ width: '10px' }} />  <span>{item?.label}</span>
                                                </button>

                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
        </div>
    );
}

export default MobileNestedMenu;
