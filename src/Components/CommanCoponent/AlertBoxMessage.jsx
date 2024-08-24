import React from 'react'
import { selectMenuFunction } from '../../Redux/Reducer/activateMenuSlice'
import { useDispatch, useSelector } from 'react-redux';
import './comman.css'
import UpdateImg from '../../asset/alert icons/update.png'
import SaveImg from '../../asset/alert icons/save.png'
import ErrorImg from '../../asset/alert icons/error.png'
import SuccImg from '../../asset/alert icons/success.png'
import DeleteImg from '../../asset/alert icons/delete.png'
import { darkTheme, dayTheme } from '../../PageStyle/colorsdarkWhite';

function AlertBoxMessage({handleSave, setdisplayCustomAlertBox, handeleDeleteFunction}) {

    const selectState = useSelector((state) => state.selectMenu);
    const dispatch = useDispatch();
    const darkModeState = useSelector((state) => state.darkMode)
   
    const AlertBoxDatas = [
        {
            name: "Insert",
            buttons: ["Save", "Dont Save"],
            message: "Do You Want to Save ?",
            image: SaveImg
        },
        {
            name: "Update",
            buttons: ["Update","Dont Update","Cancel"],
            message: "Do You Want to Update ?",
            image: UpdateImg
        },
        {
            name: "Delete",
            buttons: ["Delete", "Cancel"],
            message: "Do You Want to Delete ?",
            image: DeleteImg
        },
    ]

    return (
        <div className='absolute top-0 h-screen d-flex justify-center items-center xl:w-9/12 lg:w-9/12 sm:w-full'>
            {AlertBoxDatas.filter((filter) => filter.name === selectState.name).map((item) => (
                <div className='relative rounded-[30px] bg-gray-100 shadow xl:w-5/12 lg:w-6/12 sm:w-12/12 h-fit z-50 d-flex flex-col justify-center items-center py-3' style={{ background: darkModeState.checkvalue ? dayTheme.masterListRowColor : darkTheme.masterListRowColor }}>
                    <div className='w-full d-flex justify-center'>
                        <div>
                            <h1 className='text-center font-bold pt-3'>Alert</h1>
                            <h1 className='text-center py-2 font-black'>{item.message}</h1>
                            {item.buttons.map((arrButt) => {
                                let onClickHandler;
                                // Determine the onClick handler based on the button label
                                if (arrButt === 'Save' || arrButt === 'Update') {
                                    onClickHandler = handleSave;
                                } else if (arrButt === 'Dont Save' || arrButt === 'Dont Update' || arrButt === 'Okay') {
                                    onClickHandler = () => dispatch(selectMenuFunction({ name: 'List', opid: selectState.opid }));
                                } else if (arrButt === 'Cancel' || arrButt === 'Error') {
                                    onClickHandler = () => setdisplayCustomAlertBox(false);
                                }else if(arrButt ==='Delete'){
                                    onClickHandler = () => handeleDeleteFunction();
                                }

                                return (
                                    <button
                                        key={arrButt}
                                        className='alertBGColor text-white hover:bg-[#362180] px-3 py-1 shadow m-2 rounded-full font-bold'
                                        onClick={onClickHandler}
                                    >
                                        {arrButt}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    <div className='absolute top-[-20px]'>
                        <img src={item.image} alt="" srcset="" width={60} />
                    </div>
                </div>
            ))}

        </div>
    )
}

export default AlertBoxMessage