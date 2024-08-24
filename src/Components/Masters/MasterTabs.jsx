import React, { useEffect, useRef, useState } from 'react';
import { masterFormDesign } from '../../PageStyle/pageStyleVariable';
import { BaseURL, commanAPI, getRegion, handleEnterKeyPress } from './masterPagefunctions';
import { useSelector } from 'react-redux';
import { useInputBoxValidation } from '../../Hook/useInputBoxValidation';
import { darkTheme, dayTheme } from '../../PageStyle/colorsdarkWhite';
import MasterGrid from './MasterGrid';
function MasterTabs({ formDetails, formData, handleInputChange, getAccDataUpdate, setgetAccDataUpdate, setCurrentValue, setIsValidateRequired }) {

    //  Create State for 
    // const [filterTextid, setFilterTextId] = useState(1);
    const [filterTextid, setFilterTextId] = useState(null);


    // crate stae for List Regions
    const [regionList, setRegionList] = useState([])

    // create state for (setSelect Box Id)
    const [selectboxID, setSelectboxID] = useState(null)

    // create selectore foe Arabic Alignment
    const arabicAlignMent = useSelector((state) => state.arabicAlignMent)

    // crete useSelector for Menu
    const selectState = useSelector((state) => state.selectMenu);
    const windowWidth = useRef(window.innerWidth);
   
    // validate function
    const validate = useInputBoxValidation();

    // darkmode redux state
    const darkModeState = useSelector((state) => state.darkMode)



    // const sdfrd = getAccDataUpdate.data[0]?.profile?.billingaddress.replace(/\\"/g, '"')
    // const abcd = JSON.parse(sdfrd);
    // console.log("get data Object",getAccDataUpdate);

    // create veriable for get Regions(state)
    const filterAPI = (formDetails.form_fields || [])
        .filter((field) => field.apiendpoint != null && field.id === selectboxID)
        .reduce((result, item) => {
            result.apiendpoint = item.apiendpoint;
            result.apiservicename = item.apiservicename;
            return result;
        }, { apiendpoint: null, apiservicename: null });

    var APIPoint = filterAPI.apiendpoint;
    var APIservicename = filterAPI.apiservicename;


    //   console.log("hlo API", filterAPI);


    // create veriable for 
    var APIStateRegion = `https://${APIservicename}.${BaseURL}${APIPoint}`

    console.log("API State Link", APIStateRegion);



    //  Create useState for region get regionList(state) 
    useEffect(() => {
        getRegion(APIStateRegion, setRegionList)
    }, [APIStateRegion])

    useEffect(()=> {
        const initaltab = formDetails.form_tabs?.[0];
        if(initaltab){
            setFilterTextId(initaltab.id)
        }

    },[formDetails])

    const gridfield = formDetails.form_grids?.filter(griditem=>griditem.tabid == filterTextid &&  griditem.visible).sort((a,b)=>a.position-b.position)



    return (
        <div>
            <div className='flex justify-evenly my-3' style={{ backgroundColor: darkModeState.checkvalue ? dayTheme.LabelBarColor : darkTheme.LabelBarColor }}>
                {formDetails.form_tabs && formDetails.form_tabs.sort((a, b) => a.position - b.position).map((item) => (
                    <label
                        style={{
                            fontWeight: masterFormDesign.textWeight,
                            width: '175px',
                            color: item.id === filterTextid ? darkModeState.checkvalue ? dayTheme.TablabelTextColor : darkTheme.TablabelTextColor : darkModeState.checkvalue ? dayTheme.TablabelTextColor : darkTheme.TablabelTextColor
                        }}
                        className={` flex justify-center items-center text-center my-1 text-[${masterFormDesign.textColor}] ${item.id === filterTextid ? `${darkModeState.checkvalue ? 'bg-white filterTabShadow' : 'bg-black'} rounded-full` : ''}`}
                        key={item.tabid}
                        onClick={() => setFilterTextId(item.id)}
                    >
                        {item.label}
                    </label>
                ))}
            </div>
            <div className={`scrollbar ${filterTextid === 2 ? 'grid grid-cols-2 w-full sm:grid sm:grid-cols-1 lg:flex lg:flex-col' : ''}`} style={{ overflowY: 'auto', height: '15vh' }}>

                {formDetails.form_fields && formDetails.form_fields
                    .filter((field) => field.tabid !== null && field.tabid === filterTextid)
                    .sort((a, b) => a.position - b.position)
                    .map((field) => (
                        <div key={field.id} className={'flex sm:flex-col lg:flex-row mt-[11px] sm:pl-3'}>
                            <div className={`${filterTextid === 2 ? `w-10/12 lg:w-4/12 sm:hidden ${arabicAlignMent.rightToLeft === 'rtl' ? 'sm:text-right text-left' : 'text-right sm:text-left'}` : `w-3/12 sm:hidden ${arabicAlignMent.rightToLeft === 'rtl' ? 'sm:text-right text-left' : 'text-right sm:text-left'}`}`}>
                                <label
                                    htmlFor={field.name}
                                    className="flex-none block mx-2"
                                    style={{
                                        fontFamily: `${masterFormDesign.inputLabeltextFamily}`,
                                        fontWeight: `${masterFormDesign.inputLabeltextWeight}`,
                                        fontSize: `${masterFormDesign.inputLabeltextSize}`,
                                        color: (darkModeState.checkvalue ? dayTheme.DlabelTextColor : darkTheme.DlabelTextColor),
                                    }}
                                >{field.label}</label>
                            </div>
                            {['Text', 'Email', 'URL', 'Number'].includes(field.inputtype) && (
                                <div className={`${filterTextid === 2 ? 'w-9/12' : 'w-10/12'}`}>
                                    <div className={`relative ${filterTextid === 2 ? 'sm:w-[360px] lg:w-[360px] xl:w-[200px]' : 'w-[360px]'}`}>
                                        <input
                                            type={field.inputtype.toLowerCase()}
                                            id={field.id}
                                            name={field.name}
                                            className={`${field.required ? 'outline-rose-400' : 'outline-blue-200'} flex-grow p-2 ${masterFormDesign.masterFormBorder} rounded-md w-full`}
                                            style={{
                                                height: `${masterFormDesign.inputTextHeight}`,
                                                width: `${masterFormDesign.inputTextWidth}`,
                                                textAlign: `${field.inputtype === 'Number' ? `${arabicAlignMent.rightToLeft === 'rtl' ? 'left' : 'right'}` : `${arabicAlignMent.rightToLeft === 'rtl' ? 'right' : 'left'}`}`,
                                                backgroundColor: `${(selectState.name === "Delete" || selectState.name === "View" || field.readonly) ? dayTheme.inputFildReadColor : darkModeState.checkvalue ? dayTheme.inputFildColor : darkTheme.inputFildColor}`
                                            }}
                                            readOnly={(selectState.name === "Delete" || selectState.name === "View") ? true : field.readonly}
                                            required={field.required}
                                            // onChange={(event) => handleInputChange(event, field)}
                                            onKeyDown={(event) => handleEnterKeyPress(event, field, formDetails, filterTextid)}
                                            autoFocus={field.position === 1}
                                            onInput={(event) => validate(event, field, setIsValidateRequired)}

                                            // value={
                                            //     field.jsonref === null
                                            //         ? formData[field.name] || ''
                                            //         : (formData[field.jsonref] && formData[field.jsonref][field.name]) || ''
                                            // }

                                            value={
                                                selectState.name !== "Insert" ?
                                                    (getAccDataUpdate && getAccDataUpdate.data && getAccDataUpdate.data.length > 0 ?
                                                        (field.jsonref === null ?
                                                            (getAccDataUpdate.data[0][field.name] || '') :
                                                            (getAccDataUpdate.data[0][field.jsonref] && getAccDataUpdate.data[0][field.jsonref][field.name] || '')) :
                                                        '') :
                                                    (field.jsonref === null ?
                                                        (formData[field.name] || field.initialvalue) :
                                                        (formData[field.jsonref] && formData[field.jsonref][field.name]) || field.initialvalue)
                                            }

                                            placeholder={windowWidth.current > 800 ? " " : field.label}


                                            // onChange={(event) => {
                                            //     if (selectState.name !== "Insert") {
                                            //         const updatedData = { ...getAccDataUpdate };
                                            //         if (field.jsonref === null) {
                                            //             // Check if updatedData.data[0] exists before updating
                                            //             if (updatedData.data && updatedData.data.length > 0) {
                                            //                 updatedData.data[0][field.name] = event.target.value;
                                            //                 setgetAccDataUpdate(updatedData);
                                            //             }
                                            //         } else {
                                            //             // Check if updatedData.data[0][field.jsonref] exists before updating
                                            //             if (updatedData.data && updatedData.data.length > 0 && updatedData.data[0][field.jsonref]) {
                                            //                 const newData = {
                                            //                     ...updatedData,
                                            //                     data: updatedData.data[0].map((item, index) => {
                                            //                         if (index === 0 && item[field.jsonref]) {
                                            //                             return {
                                            //                                 ...item,
                                            //                                 [field.jsonref]: {
                                            //                                     ...item[field.jsonref],
                                            //                                     [field.name]: event.target.value,
                                            //                                 },
                                            //                             };
                                            //                         }
                                            //                         return item;
                                            //                     }),
                                            //                 };
                                            //                 setgetAccDataUpdate(newData);
                                            //             }
                                            //         }
                                            //     } else {
                                            //         handleInputChange(event, field);
                                            //     }
                                            // }}



                                            onChange={(event) => {
                                                if (selectState.name !== "Insert") {
                                                    const updatedData = { ...getAccDataUpdate };
                                                    if (field.jsonref === null) {
                                                        // Check if updatedData.data[0] exists before updating
                                                        if (updatedData.data && updatedData.data.length > 0) {
                                                            updatedData.data[0][field.name] = event.target.value;
                                                            setgetAccDataUpdate(updatedData);
                                                            setCurrentValue(event.target.value);
                                                        }
                                                    } else {
                                                        // Check if updatedData.data[0][field.jsonref] exists before updating
                                                        if (updatedData.data && updatedData.data.length > 0 && updatedData.data[0][field.jsonref]) {
                                                            updatedData.data[0][field.jsonref] = {
                                                                ...updatedData.data[0][field.jsonref],
                                                                [field.name]: event.target.value
                                                            };
                                                            setgetAccDataUpdate(updatedData);
                                                            setCurrentValue(event.target.value);
                                                        }
                                                    }
                                                } else {
                                                    handleInputChange(event, field);
                                                }
                                            }}





                                        />
                                    </div>
                                </div>
                            )}
                            {field.inputtype === 'Dropdown' && (
                                <div className={'w-10/12'}>
                                    <div style={{ width: '360px' }}>
                                        <select
                                            className={`${field.required ? 'outline-rose-400' : 'outline-blue-200'} ${masterFormDesign.masterFormBorder} rounded-md text-gray-400`}
                                            style={{
                                                height: `${masterFormDesign.inputTextHeight}`,
                                                width: `${masterFormDesign.inputTextWidth}`,
                                                fontSize: '13px',
                                                backgroundColor: `${(selectState.name === "Delete" || selectState.name === "View" || field.readonly) ? dayTheme.inputFildReadColor : darkModeState.checkvalue ? dayTheme.inputFildColor : darkTheme.inputFildColor}`
                                            }}
                                            // value={
                                            //     field.jsonref === null
                                            //         ? formData[field.name] || ''
                                            //         : (formData[field.jsonref] && formData[field.jsonref][field.name]) || ''
                                            // }

                                            value={
                                                selectState.name !== "Insert" ?
                                                    (getAccDataUpdate && getAccDataUpdate.data && getAccDataUpdate.data.length > 0 ?
                                                        (field.jsonref === null ?
                                                            (getAccDataUpdate.data[0][field.name] || '') :
                                                            (getAccDataUpdate.data[0][field.jsonref] && getAccDataUpdate.data[0][field.jsonref][field.name] || '')) :
                                                        '') :
                                                    (field.jsonref === null ?
                                                        (formData[field.name] || '') :
                                                        (formData[field.jsonref] && formData[field.jsonref][field.name]) || '')
                                            }

                                            // onChange={(event) => handleInputChange(event, field)}

                                            onChange={(event) => {
                                                if (selectState.name !== "Insert") {
                                                    const updatedData = { ...getAccDataUpdate };
                                                    if (field.jsonref === null) {
                                                        // Check if updatedData.data[0] exists before updating
                                                        if (updatedData.data && updatedData.data.length > 0) {
                                                            updatedData.data[0][field.name] = event.target.value;
                                                            setgetAccDataUpdate(updatedData);
                                                        }
                                                    } else {
                                                        // Check if updatedData.data[0][field.jsonref] exists before updating
                                                        if (updatedData.data && updatedData.data.length > 0 && updatedData.data[0][field.jsonref]) {
                                                            updatedData.data[0][field.jsonref] = {
                                                                ...updatedData.data[0][field.jsonref],
                                                                [field.name]: event.target.value
                                                            };
                                                            setgetAccDataUpdate(updatedData);
                                                        }
                                                    }
                                                } else {
                                                    handleInputChange(event, field);
                                                }
                                            }}

                                            required={field.required ? true : false}
                                            onClick={() => setSelectboxID(field.id)}
                                            name={field.name}
                                            id={field.id}
                                            onKeyDown={(event) => handleEnterKeyPress(event, field, formDetails, filterTextid)}
                                            autoFocus={field.position === 1}
                                            disabled={(selectState.name === "Delete" || selectState.name === "View") ? true : field.readonly}

                                        >
                                            <option value="" disabled selected className='text-gray-400'>
                                                Select
                                            </option>
                                            {regionList.data && regionList.data.map((item) => (
                                                <option key={item.id} value={item[field.apidatakey]} className='text-gray-400'>
                                                    {item[field.apilabelkey]}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                </div>

                            )}
                        </div>
                    ))}

                    {
                        gridfield && gridfield.length>0 &&  (
                            <MasterGrid gridfield={gridfield} />
                        )
                    }
          
            </div>
        </div>
    );
}

export default MasterTabs;
