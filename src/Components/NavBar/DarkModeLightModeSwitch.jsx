import React, { useState } from 'react';
import Switch from "react-switch";
import darkmode from '../../asset/dark Mode Icon/night-icon.svg';
import lightmode from '../../asset/dark Mode Icon/day-sunny-icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectDarkModeFunction } from '../../Redux/Reducer/darkLightModeSlice';

export const uncheckedHandleIcon = (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        color: 'white'
    }}>
        <img src={darkmode} style={{ padding: '4px' }} />
    </div>
);

export const checkedHandleIcon = (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        color: 'white',
    }}>
        <img src={lightmode} alt="" style={{ padding: '3px' }} />
    </div>
);

export const uncheckedIcon = (
    <span className='pr-1' style={{ fontSize: '5px', color: 'white', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>DarkMode</span>
);

export const checkedIcon = (
    <span className='pl-1' style={{ fontSize: '5px', color: 'black', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>Day Mode</span>
);

function DarkModeLightModeSwitch() {
    const [checkedValue, setCheckedValue] = useState(false);
    const darkModeState = useSelector((state) => state.darkMode)
    const dispatch = useDispatch();

    const handleChange = (checked) => {
        setCheckedValue(checked);
        console.log("checkedValue", checked);
        dispatch(selectDarkModeFunction({ checkvalue: checkedValue }))
    };




    console.log("dark mode Redux", darkModeState.checkvalue)

    return (
        <div>
            <Switch
                uncheckedHandleIcon={uncheckedHandleIcon}
                checkedHandleIcon={checkedHandleIcon}
                uncheckedIcon={uncheckedIcon}
                checkedIcon={checkedIcon}
                width={60}
                height={20}
                onColor='#e6e7e9'
                offColor='#000'
                className='shadow'
                checked={checkedValue}
                onChange={handleChange}
            />
        </div>
    );
}

export default DarkModeLightModeSwitch;
