import React from 'react';
import { selectMenuFunction } from '../../Redux/Reducer/activateMenuSlice';
import { useDispatch, useSelector } from 'react-redux';
import './comman.css';
import ErrorImg from '../../asset/alert icons/error.png';
import SuccImg from '../../asset/alert icons/success.png';
import AccordionUsage from './AccordionUsage';
import { selectFliterFunction } from '../../Redux/Reducer/filterSlice';
import { darkTheme, dayTheme } from '../../PageStyle/colorsdarkWhite';

function AlertBoxSuccErr({ alertMessage, setdisplaySuccErrAlert }) {
    const selectState = useSelector((state) => state.selectMenu);
    const selectFilterName = useSelector((state) => state.Filternames)
    const dispatch = useDispatch();
    const darkModeState = useSelector((state) => state.darkMode)

    console.log("Alert message", alertMessage)

    const AlertBoxDatas = [
        {
            name: "Error",
            buttons: ["Okay", "Cancel"],
            message: alertMessage?.data?.error || alertMessage?.code,
            validMessage: alertMessage?.data?.validation_messages?.map((item) => (

                <p >{item?.message?.ml}</p>


            )),
            validMessageAbout: alertMessage?.data?.validation_messages?.map((item) => (

                <p>{item?.message?.en}</p>


            )),
            image: ErrorImg
        },
        {
            name: "Success",
            buttons: ["Okay"],
            message: alertMessage?.data?.message,
            image: SuccImg
        },
    ];

    const alertType = alertMessage?.data?.error ? "Error" : alertMessage?.data?.message ? "Success" : alertMessage?.code ? "Error" : null;

    return (
        <div className='absolute top-0 h-screen d-flex justify-center items-center xl:w-9/12 lg:w-9/12 sm:w-full'>
            {alertType && AlertBoxDatas.filter(item => item.name === alertType).map((item) => (
                <div key={item.name} className='relative rounded-[30px] bg-gray-100 shadow xl:w-5/12 lg:w-6/12 sm:w-12/12 h-fit z-50 d-flex flex-col justify-center items-center py-4' style={{ background: darkModeState.checkvalue ? dayTheme.masterListRowColor : darkTheme.masterListRowColor }}>
                    <div className='w-full d-flex justify-center'>
                        <div>
                            <h1 className='text-center font-bold mt-3'>{item.message}</h1>
                            {/* <h1 className='text-center py-2 font-black'>{item.message}</h1>
                            <p className='px-2'>{item?.validMessage}</p> */}

                            {item?.validMessage ? <AccordionUsage messageHeading={item?.validMessage} aboutMessage={item?.validMessageAbout} /> : null}
                            <div className='d-flex justify-center'>
                                {item.buttons.map((arrButt) => {
                                    let onClickHandler;
                                    if (arrButt === 'Okay') {
                                        onClickHandler = () => {
                                            dispatch(selectMenuFunction({ name: 'List', opid: selectState.opid }));
                                            // dispatch(selectFliterFunction({ filtername: selectFilterName.filtername }));
                                        };
                                    } else {
                                        onClickHandler = () => setdisplaySuccErrAlert(false);
                                    }



                                    return (
                                        <div className='d-flex justify-center'>
                                            <button
                                                key={arrButt}
                                                className='alertBGColor text-white hover:bg-[#362180] px-3 py-1 shadow m-2 rounded-full font-bold'
                                                onClick={onClickHandler}
                                            >
                                                {arrButt}
                                            </button>
                                        </div>

                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className='absolute top-[-20px]'>
                        <img src={item.image} alt="" width={50} />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AlertBoxSuccErr;
