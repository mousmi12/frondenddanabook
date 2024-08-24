import React, { useEffect, useRef, useState } from 'react'
import { inputTextStyle, labelFiledStyle, masterFormDesign } from '../../PageStyle/pageStyleVariable';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { BaseURL, fetchData, getMasterAccountDetails, groupListData, handleDeleteAPI, handleDeleteApI, handleEnterKeyPress, handleEnterKeyPressMAaster } from './masterPagefunctions';
import MasterTabs from './MasterTabs';
import SimCardIcon from '@mui/icons-material/SimCard';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import SelectDropDown from './SelectDropDown';
import MasterList from './MasterList';
import MasterDashBoard from '../Dashboard/MasterDashBoard';
import ReloadComponent from '../CommanCoponent/ReloadComponent';
import { selectMenuFunction } from '../../Redux/Reducer/activateMenuSlice';
import BeforeLoadTableData from '../CommanCoponent/BeforeLoadTableData';
import AlertBoxMessage from '../CommanCoponent/AlertBoxMessage';
import AlertBoxSuccErr from '../CommanCoponent/AlerBoxSuccErr';
import { useInputBoxValidation } from '../../Hook/useInputBoxValidation';
import './master.css'
import ReportMainCom from '../Report/ReportMainCom';
import scan from '../../asset/Menusvg/main/scan.svg'
import ChequeModal from '../Cheque/ChequeModal';
import { darkTheme, dayTheme } from '../../PageStyle/colorsdarkWhite';



function MasterForm() {

  // create State for fetData(Form Filed datas)
  const [formDetails, setFormDetails] = useState([]);


  // create state for submit data
  const [formData, setFormData] = useState({ billingaddress: {} });

  // store inital value seperation 
  const headeraccidInitialValue = formDetails?.form_fields?.filter(field => field.initialvalue !== null).map((item) => (item))
  const datasValues = headeraccidInitialValue?.reduce((acc, item) => {
    acc[item.name] = formData[item.name] ?? item.initialvalue;
    return acc;
  }, { ...formData })



  console.log("datasValues", datasValues)


  // create state for relaod data
  const [hiddenReloadIcon, sethiddenReloadIcon] = useState(false);

  // save button disable button
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);

  // ShowAccountData State
  const [getAccDataUpdate, setgetAccDataUpdate] = useState({ billingaddress: {} });

  // Show Loding Time Heading
  const [LoadheadingTime, setLoadHeadingTime] = useState(0);

  const [displayCustomAlertBox, setdisplayCustomAlertBox] = useState(false)

  // getresponse Message
  const [alertMessage, setalertMessage] = useState({})

  // successMessage
  const [displaySuccErrAlert, setdisplaySuccErrAlert] = useState(false)

  // deledataUpdation
  const [deleteData, setDeleteData] = useState([])

  // currentValue Statae
  const [currentValue, setCurrentValue] = useState('')

  // create state for dispaly chequebook data abstraction
  const [chequeModal, setchequeModal] = useState(false)

  // create state to store cheque image 
  const [chequeImage, setChequeImage] = useState(null);

  const [mobilescreenFilter, setMobilescreenFilter] = useState(null)

  // crete useSelector for Menu
  const selectState = useSelector((state) => state.selectMenu);
  const dispatch = useDispatch();
  const selectFilterName = useSelector((state) => state.Filternames)
  const selectLAbelName = useSelector((state) => state.reportMenuLAbel)
  // create selectore foe Arabic Alignment
  const arabicAlignMent = useSelector((state) => state.arabicAlignMent)
  // 
  const darkModeState = useSelector((state) => state.darkMode)

  const chequeimagedetails = useSelector((state) => state.getchequedata.chequedata)

  // get subnmenu labels
  const selectedSubMenuLabel = useSelector((state) => state.getsubmenulabel)

// innerwidth
  const windowWidth = useRef(window.innerWidth);
  console.log("innerWidth",windowWidth.current) ;


  // validatin Function
  const validate = useInputBoxValidation();

  const [isValidateRequired, setIsValidateRequired] = useState(false)

  // Create a ref to the Select component
  const selectRef = useRef(null);
  // create reference in input file
  const fileInputRef = useRef(null);

  console.log("selectFilterName", selectLAbelName.label);

  console.log("adcd", selectRef);

  // const clearForm = () => {
  //   if (selectState.name !== 'Update') {
  //     setFormData({ billingaddress: {} });
  //     setSaveButtonDisabled(false);
  //     sethiddenReloadIcon(false);
  //   } else{
  //     if (
  //       formDetails.form_fields.some((field) => (
  //         (getAccDataUpdate.data[0][field.name] === formData[field.name]) ||
  //         (getAccDataUpdate.data[0][field.jsonref] && getAccDataUpdate.data[0][field.jsonref][field.name] === formData[field.name])
  //       ))
  //     ) {
  //       window.addEventListener('click',dispatch(selectMenuFunction({ name: 'List', opid: selectState.opid })));
  //     } else {
  //       setdisplayCustomAlertBox(true)
  //     }
  //   }
  // };



  const clearForm = () => {
    if (selectState.name !== 'Update') {
      const isFormDataMatching = formDetails?.form_fields?.some((field) => (
        (formData[field.name] == currentValue) || (formData[field.jsonref] && formData[field.jsonref][field.name] == currentValue)
      ));

      if (!isFormDataMatching) {
        dispatch(selectMenuFunction({ name: 'List', opid: selectState.opid }));
      } else {
        setdisplayCustomAlertBox(true);
        setSaveButtonDisabled(false);
        sethiddenReloadIcon(false);
      }

    } else {
      const isFormDataMatching = formDetails.form_fields.some((field) => (
        (getAccDataUpdate.data[0][field.name] === currentValue) ||
        (getAccDataUpdate.data[0][field.jsonref] && getAccDataUpdate.data[0][field.jsonref][field.name] === currentValue)
      ));

      if (!isFormDataMatching) {
        window.addEventListener('click', dispatch(selectMenuFunction({ name: 'List', opid: selectState.opid })));
      } else {
        setdisplayCustomAlertBox(true);
      }
    }
  };


  const currentDate = new Date(); // Get the end time when data loading is complete
  const Todaydate = currentDate.toISOString().split('T')[0];


  console.log("Todaydate", Todaydate);

  // display Fetch Form Details
  useEffect(() => {
    const startTime = new Date(); // Get the start time when component mounts
    fetchData(setFormDetails, selectState, sethiddenReloadIcon, setIsValidateRequired).then(() => {
      const endTime = new Date(); // Get the end time when data loading is complete
      const timeDifference = endTime - startTime; // Calculate the time taken to load data
      const timeInSeconds = timeDifference / 1000; // Convert milliseconds to seconds
      setLoadHeadingTime(timeInSeconds); // Update the loading time state
      if (selectState.name === "Insert") {
        setFormData({ billingaddress: {} });
      }
    })
  }, [selectState, deleteData]);

  // Display Account Data
  useEffect(() => {
    getMasterAccountDetails(formDetails, selectState, setgetAccDataUpdate)
  }, [selectState.userId])



  // chequedetails autofill 
  useEffect(() => {
    if (chequeimagedetails) {
      setFormData((prevData) => ({
        ...prevData,
        ...chequeimagedetails
      }));
    }
  }, [chequeimagedetails]);


  console.log("Updated datas", getAccDataUpdate.data?.[0]);





  // create function for input filed 
  const handleInputChange = (event, field) => {
    const { name, value } = event.target;

    if (field.jsonref === null) {
      setFormData((prevData) => ({
        ...prevData,
        [field.name]: value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [field.jsonref]: {
          ...prevData[field.jsonref],
          [field.name]: value,
        },
      }));
    }
  };


  // set Post End Point
  const POSTEndPoint = formDetails?.apiendpoint;


  // create funtion for POST Method (ADD Supplier Details)

  const deleteAlert = async (event) => {
    event.preventDefault();
    setdisplayCustomAlertBox(true)
  }

  const handeleDeleteFunction = () => {
    handleDeleteAPI(formDetails, selectState, sethiddenReloadIcon, setSaveButtonDisabled, dispatch)
  }



  const handleSave = async (event) => {
    event.preventDefault();
    // Disable save button and show loading icon
    setSaveButtonDisabled(true);
    sethiddenReloadIcon(true);
    setdisplayCustomAlertBox(false);
    console.log("Form data", formData);
    const storedRows = localStorage.getItem('masterGridRows')
    console.log("handle save griddata store",storedRows)
    const parsedStoredRows = storedRows ? JSON.parse(storedRows) : [];

    try {
      let formDataWithJsonBillingAddress = null;
      let url = '';
      // formDetails?form_fields &&  formDetails?form_fields

      if (selectState.name === "Insert") {
        formDataWithJsonBillingAddress = {
          ...formData,
          opid: selectState.opid,
          // headeraccid: formData.headeraccid || initialvalueBank,
          ...datasValues,
          billingaddress: JSON.stringify(formData.billingaddress),
          parentid: parseInt(formData.parentid) || selectFilterName.filterId,
          creditperiod: parseInt(formData.creditperiod),
          creditperiodexception: parseInt(formData.creditperiodexception),
        };
        if (!formDetails.apiarguments) {
          url = `https://${formDetails.apiservicename}.${BaseURL}${POSTEndPoint}`;
        } else {
          url = `https://${formDetails.apiservicename}.${BaseURL}${POSTEndPoint}?${formDetails.apiarguments[0]}`;
        }
        if (parsedStoredRows && parsedStoredRows.length > 0) {
          formDataWithJsonBillingAddress.transaccounts = parsedStoredRows;
        }

      } else {
        // Remove the "code" attribute from the formDataWithJsonBillingAddress object
        const { code, ...formDataWithoutCode } = getAccDataUpdate.data[0];

        formDataWithJsonBillingAddress = {
          ...formDataWithoutCode,
          parentid: parseInt(getAccDataUpdate.data[0].parentid),
          creditperiod: parseInt(getAccDataUpdate.data[0].creditperiod),
          creditperiodexception: parseInt(getAccDataUpdate.data[0].creditperiodexception),
          ...datasValues,
          billingaddress: JSON.stringify(getAccDataUpdate.data[0].billingaddress),
        };
        if (parsedStoredRows && parsedStoredRows.length > 0) {
          formDataWithJsonBillingAddress.transaccounts = parsedStoredRows;
        }
        url = `https://${formDetails.apiservicename}.${BaseURL}${POSTEndPoint}?${formDetails.apiarguments[0]}&id=${selectState.userId}`;
      }

      const method = selectState.name === "Insert" ? axios.post : axios.put;

      const response = await method(url, formDataWithJsonBillingAddress);
      setalertMessage(response);
      if (response.status === 200 && response.data && response.data.message) {
        console.log("Form Save", response);
        // alert(response.data.message);
        // AlertBoxMessage(response={response})
        if (selectState.name === "Insert") {
          setFormData({ billingaddress: {} });
        }
        setdisplaySuccErrAlert(true)
      } else {
        console.log("Faild to save", response);
        // AlertBoxMessage(response={response})
        // alert(response.data.error);
        setdisplaySuccErrAlert(true)
        if (selectState.name === "Insert") {
          setFormData({ billingaddress: {} });
        }
        // Optionally perform additional actions after successful save
      }
    } catch (error) {
      console.error("Error saving form:", error);
      setalertMessage(error);
      setdisplaySuccErrAlert(true)
    } finally {
      // Enable save button and hide loading icon
      setSaveButtonDisabled(false);
      sethiddenReloadIcon(false);
      setIsValidateRequired(false);
      // setdisplayCustomAlertBox(true);
      // window.addEventListener('click',dispatch(selectMenuFunction({ name: 'List', opid: selectState.opid })));
    }
  };

  const handleChequeImage = async (event) => {
    const selectedChequeImage = event.target.files[0];
    setChequeImage(selectedChequeImage)
    setchequeModal(true)
    event.target.value = null

  }



  return (
    <div>
      <style>
        {
          `
    .darkdayfilter {
    borderRadius: '5px';
    color:${darkModeState.checkvalue ? dayTheme.TablabelTextColor : darkTheme.TablabelTextColor};
     background:${darkModeState.checkvalue ? dayTheme.mobileMenuFilterTabs : darkTheme.mobileMenuFilterTabs};
     border: solid 1px ${darkModeState.checkvalue ? dayTheme.mobileMenuFilterTabs : darkTheme.mobileMenuFilterTabs};
    }

    .darkdayfilterNot {
    borderRadius: '5px';
     color:${darkModeState.checkvalue ? dayTheme.TablabelTextColor : darkTheme.TablabelTextColor};
    border: solid 1px ${darkModeState.checkvalue ? dayTheme.mobileMenuFilterTabs : darkTheme.mobileMenuFilterTabs};
    }

    .darkdaysaveCancelNot {
    color:${darkModeState.checkvalue ? dayTheme.TablabelTextColor : darkTheme.TablabelTextColor};
    border: solid 1px ${darkModeState.checkvalue ? dayTheme.mobileMenuFilterTabs : darkTheme.mobileMenuFilterTabs};
    
    }

    .darkdaysaveCancelNot:hover {
    color:${darkModeState.checkvalue ? 'white' : darkTheme.TablabelTextColor};
    background:${darkModeState.checkvalue ? dayTheme.mobileSavebutton : darkTheme.mobileSavebutton};
    border: solid 1px ${darkModeState.checkvalue ? dayTheme.mobileMenuFilterTabs : darkTheme.mobileMenuFilterTabs};
    }
          

    `
        }

      </style>
      {selectState.name !== null && selectState.opid !== null ? <div className='flex items-start justify-center h-screen w-auto'>
        {selectState.name === "List" ? <MasterList formDetails={formDetails} hiddenReloadIcon={hiddenReloadIcon} sethiddenReloadIcon={sethiddenReloadIcon} LoadheadingTime={LoadheadingTime} setdisplayCustomAlertBox={setdisplayCustomAlertBox} setdisplaySuccErrAlert={setdisplaySuccErrAlert} /> : selectState.name === "Report" ? (<ReportMainCom formDetails={formDetails} />) :
          <div style={{ background: darkModeState.checkvalue ? dayTheme.DmenuCcolor : darkTheme.DmenuCcolor }} className={`w-full relative rounded sm:h-[84%] lg:h-[84%] xl:h-[84%] shadow pt-4 xl:mt-[95px] lg:mt-[95px] md:mt-[95px] sm:mt-[95px]`}>
            <div className='flex'>
              <div style={{ fontFamily: `${masterFormDesign.inputLabeltextFamily}`, fontWeight: `${masterFormDesign.inputLabeltextWeight}`, fontSize: `${masterFormDesign.inputLabeltextSize}`, color: darkModeState.checkvalue ? dayTheme.DlabelTextColor : darkTheme.DlabelTextColor }} className='px-3 cursor-pointer' onClick={() => setMobilescreenFilter(null)}> {formDetails?.name}</div>
              <div className='flex xl:hidden lg:hidden'>

                {formDetails.form_tabs && formDetails.form_tabs.sort((a, b) => a.position - b.position).map((item) => (
                  <button
                    style={{
                      fontWeight: masterFormDesign.textWeight,
                      fontSize: '12px',
                    }}
                    className={` flex justify-center mx-1 px-1 items-center text-center my-1 text-[${masterFormDesign.textColor}] rounded ${item.id === mobilescreenFilter ? 'darkdayfilter' : 'darkdayfilterNot'}`}
                    key={item.tabid}
                    onClick={() => setMobilescreenFilter(item.id)}
                  >
                    {item.label}
                  </button>
                ))}

              </div>
            </div>

            <form action="" onSubmit={selectState.name !== "Delete" ? handleSave : deleteAlert}>
              <div className={`${formDetails?.form_tabs && formDetails?.form_tabs.length > 0 ? 'lg:h-[40vh] lg:overflow-y-auto xl:h-[40vh] xl:overflow-y-auto' : 'sm:h-96 sm:overflow-y-auto lg:h-96 lg:overflow-y-auto xl:h-96 xl:overflow-y-auto'}`}>
                {formDetails?.form_fields && formDetails?.form_fields.filter((filed) => (filed.tabid === mobilescreenFilter && filed.visible === true)).sort((a, b) => a.position - b.position).map(field => (
                  <div key={field.id} className={'flex sm:flex-col mt-[11px] sm:px-3'}>
                    <div className={`w-3/12 sm:hidden ${arabicAlignMent.rightToLeft === 'rtl' ? 'text-left sm:text-right' : 'text-right sm:text-left'} text-left sm:text-left`}>
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
                    {['Text', 'Email', 'URL', 'Number', 'Date'].includes(field.inputtype) && (
                      <div className={'w-10/12 sm:w-full'}>
                        <div className='relative sm:flex lg:w-[360px] xl:w-[360px]'>
                          <input
                            type={field.inputtype.toLowerCase()}
                            id={field.id}
                            name={field.name}
                            className={`${field.required ? 'outline-blue-200' : 'outline-blue-200'} flex-grow p-2 ${masterFormDesign.masterFormBorder} rounded-md w-full`}
                            style={{
                              height: `${masterFormDesign.inputTextHeight}`,
                              width: `${masterFormDesign.inputTextWidth}`,
                              backgroundColor: `${(selectState.name === "Delete" || selectState.name === "View" || field.readonly) ? dayTheme.inputFildReadColor : darkModeState.checkvalue ? dayTheme.inputFildColor : darkTheme.inputFildColor}`
                            }}
                            readOnly={(selectState.name === "Delete" || selectState.name === "View") ? true : field.readonly}

                            value={
                              selectState.name !== "Insert" ?
                                (getAccDataUpdate && getAccDataUpdate.data && getAccDataUpdate.data.length > 0 ?
                                  (field.jsonref === null ?
                                    (getAccDataUpdate.data[0][field.name] || '') :
                                    (getAccDataUpdate.data[0][field.jsonref] && getAccDataUpdate.data[0][field.jsonref][field.name]) || '') :
                                  '') :
                                (field.jsonref === null ?
                                  (formData[field.name] || (field.initialvalue !== null ? field.initialvalue : '')) :
                                  (formData[field.jsonref] && formData[field.jsonref][field.name]) || (field.initialvalue !== null ? field.initialvalue : ''))
                            }

                            onChange={(event) => {
                              if (selectState.name !== "Insert") {
                                const updatedData = { ...getAccDataUpdate };

                                updatedData.data[0][field.name] = event.target.value;
                                setgetAccDataUpdate(updatedData);
                                setCurrentValue(event.target.value);
                              }
                              handleInputChange(event, field);
                              setCurrentValue(event.target.value);
                            }}
                            required={field.required}
                            onInput={(event) => validate(event, field, setIsValidateRequired)}
                            onInvalid={(event) => validate(event, field, setIsValidateRequired)}
                            // pattern={field.name === 'mobile' ? '[0-9]{10}' : undefined}
                            onKeyDown={(event) => handleEnterKeyPressMAaster(event, field, formDetails)}
                            autoFocus={field.position == 1}
                            min={field.minvalue}
                            max={field.maxvalue}
                            size={field.maxlength}
                            placeholder={windowWidth.current > 800 ? " " : field.label}
                          />
                          {isValidateRequired &&
                            <p className={`text-rose-600 bold text-right absolute top-1  ${arabicAlignMent.rightToLeft === 'rtl' ? 'right-[280px] sm:right-[380px]' : 'left-[280px] sm:left-[380px]'}`} style={{ fontSize: '10px' }}>
                              {field.required == true ? <CheckCircleOutlineRoundedIcon
                                className={`${field.required &&
                                  (formData[field.name] == null || formData[field.name] === '')
                                  ? 'text-red'
                                  : 'text-green-600'
                                  }`}
                                style={{ fontSize: '15px' }}
                              /> : null}
                            </p>}

                        </div>
                      </div>
                    )}


                    {field.inputtype === 'Dropdown' && (
                      <SelectDropDown field={field} formData={formData} formDetails={formDetails} handleInputChange={handleInputChange} selectName={selectState.name} getAccDataUpdate={getAccDataUpdate} setgetAccDataUpdate={setgetAccDataUpdate} setIsValidateRequired={setIsValidateRequired} isValidateRequired={isValidateRequired} />
                    )}

                  </div>
                ))}
              </div>
              {formDetails?.form_tabs && formDetails?.form_tabs.length > 0 ?
                <div className='sm:hidden'>
                  <MasterTabs formDetails={formDetails} formData={formData} handleInputChange={handleInputChange} handleEnterKeyPress={handleEnterKeyPress} setgetAccDataUpdate={setgetAccDataUpdate} getAccDataUpdate={getAccDataUpdate} setCurrentValue={setCurrentValue} setIsValidateRequired={setIsValidateRequired} />
                </div> : null
              }

              {/* Relaod Icon */}
              {hiddenReloadIcon && <BeforeLoadTableData />}

              {/* <div className='flex justify-center items-end'> */}

              {/* mobile save button cancel */}
              <div className='xl:hidden lg:hidden flex justify-end absolute bottom-[70px] w-[100%] left-0 right-0'>

                <div className='px-1'>

                  <div className='flex justify-end px-1'>

                    {selectedSubMenuLabel.submenulabel == "Cheque Receipt" && (
                      <>

                        <input type="file" name="" ref={fileInputRef} id="" style={{ display: 'none' }} onChange={handleChequeImage} />

                        <button type='button' className={`${darkModeState.checkvalue ? 'scanbutton' : 'scanbuttondark'} p-2 rounded`} onClick={() => fileInputRef?.current?.click()}> <img src={scan} alt="" srcset="" style={{ width: '25px' }} /></button>

                      </>
                    )}


                  </div>

                  <div>
                    <button type='submit' className={`m-2 px-1 darkdaysaveCancelNot rounded`} disabled={saveButtonDisabled} style={{ width: '50px', fontSize: '12px', fontWeight: 'bold' }}>
                      {selectState.name === "Delete" ? `${arabicAlignMent.rightToLeft === 'rtl' ? 'حذف' : 'Delete'}` : `${arabicAlignMent.rightToLeft === 'rtl' ? 'أنقذ' : 'Save'}`}</button>
                    <button type='button' className={`m-2 px-1 darkdaysaveCancelNot rounded`} onClick={clearForm} style={{ width: '50px', fontSize: '12px', fontWeight: 'bold' }}>
                      <div>{arabicAlignMent.rightToLeft === 'rtl' ? 'غلق' : 'Close'}</div></button>
                  </div>

                </div>

              </div>

              {/* lap desk top */}
              <div className={`flex justify-between sm:hidden ${darkModeState.checkvalue ? dayTheme.DmenuCcolor : darkTheme.DmenuCcolor} footerShadow rounded-lg absolute bottom-0 w-[100%] left-0 right-0`}>
                <div className='flex items-center mx-2'>

                  {selectedSubMenuLabel.submenulabel == "Cheque Receipt" && (
                    <>

                      <input type="file" name="" ref={fileInputRef} id="" style={{ display: 'none' }} onChange={handleChequeImage} />

                      <button type='button' className={`${darkModeState.checkvalue ? 'scanbutton' : 'scanbuttondark'} p-2 rounded`} onClick={() => fileInputRef?.current?.click()}> <img src={scan} alt="" srcset="" style={{ width: '30px' }} /></button>

                    </>
                  )}


                </div>

                <div>
                  <button type='submit' className={`m-2 ${saveButtonDisabled ? `${masterFormDesign.buttonHoverColor}` : ''}`} disabled={saveButtonDisabled}><SimCardIcon className={`hover:${masterFormDesign.buttonHoverColor}`} style={{ width: '30px', height: '30px', color: darkModeState.checkvalue ? dayTheme.DlabelTextColor : darkTheme.DlabelTextColor }} />
                    <div style={{ color: darkModeState.checkvalue ? dayTheme.DlabelTextColor : darkTheme.DlabelTextColor }}>{selectState.name === "Delete" ? `${arabicAlignMent.rightToLeft === 'rtl' ? 'حذف' : 'Delete'}` : `${arabicAlignMent.rightToLeft === 'rtl' ? 'أنقذ' : 'Save'}`}</div></button>
                  <button type='button' className={`m-2`} onClick={clearForm}><CloseIcon className={`hover:text-[#43418e]`} style={{ width: '30px', height: '30px', color: darkModeState.checkvalue ? dayTheme.DlabelTextColor : darkTheme.DlabelTextColor }} />
                    <div style={{ color: darkModeState.checkvalue ? dayTheme.DlabelTextColor : darkTheme.DlabelTextColor }}>{arabicAlignMent.rightToLeft === 'rtl' ? 'غلق' : 'Close'}</div></button>
                </div>

              </div>


              {/* </div> */}


            </form>
          </div>} </div> : <MasterDashBoard />}
      {displayCustomAlertBox && <AlertBoxMessage handleSave={handleSave} setdisplayCustomAlertBox={setdisplayCustomAlertBox} handeleDeleteFunction={handeleDeleteFunction} />}
      {displaySuccErrAlert && <AlertBoxSuccErr alertMessage={alertMessage} setdisplaySuccErrAlert={setdisplaySuccErrAlert} />}
      {chequeModal && <ChequeModal chequeModal={chequeModal} setchequeModal={setchequeModal} chequeImage={chequeImage} handleChequeImage={handleChequeImage} setChequeImage={setChequeImage} />}

    </div>
  )
}

export default MasterForm