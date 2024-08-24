import { Spinner } from 'react-bootstrap';
import React, { useRef, useState } from 'react'
import ImageOutLine from '../../asset/checkrecipt/emptyImage.jpg';
import './chequemodal.css'
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import axios from 'axios';
import { formatresponse } from './chequehelper';
import { setChequedataFunction } from '../../Redux/Reducer/chequeDataSlice';
import { useSelector, useDispatch } from 'react-redux';
import { darkTheme, dayTheme } from '../../PageStyle/colorsdarkWhite';

function ChequeModal({ chequeModal, setchequeModal,  chequeImage,setChequeImage  }) {
    const dispatch = useDispatch();

    const [imageDetails, setImageDetails] = useState(false);
    const [chequeContent, setChequeContent] = useState(null);
    const [loadstatus, setLoadStatus] = useState(false)

    const darkModeState = useSelector((state) => state.darkMode)
  

    // create reference in input file
    const fileInputRef = useRef(null);

    const getImageDetails = async () => {
        // setErrorMessage('')
        setLoadStatus(true)
     
        const GOOGLE_API_KEY = 'AIzaSyCKzv6v4d6VDeb49zPDCHk2EdURMbxU0YY';
        if (!chequeImage) return;
    
        const reader = new FileReader();
        reader.readAsDataURL(chequeImage);
        reader.onloadend = async () => {
            const base64String = reader.result.split(',')[1]; // Extract base64 part
            const requestBody = {
                "contents": [{
                    "parts": [
                        { "text": "You are an OCR Expert which can extract information from input image. Here I will provide a cheque image, you have to analyze the image and extract the following details: 1. Name of Customer (IF available in cheque) 2. Date (do not add any slash or hyphen) 3. Digits (numeric integer amount,no need to add after decimal values) 4. Bank Details (if available, include bank name) 5.Cheque Number Please extract the cheque number which is six digit number  from the image. Please do not include account number.At the bottom of the cheque, first 6 digits are cheque number, next 9 digit known as MICR code( in which first 3 are state code, middle 3 are bank code,and last 3 are city code), last 2 digit are transaction code. " },
                        {
                            "inline_data": {
                                "mime_type": "image/png",
                                "data": base64String
                            }
                        }
                    ]
                }],
                "safety_settings": [
                  {
                    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                    "threshold": "BLOCK_NONE"
                  },
                  {
                    "category": "HARM_CATEGORY_HATE_SPEECH",
                    "threshold": "BLOCK_NONE"
                  },
                  {
                    "category": "HARM_CATEGORY_HARASSMENT",
                    "threshold": "BLOCK_NONE"
                  },
                  {
                    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                    "threshold": "BLOCK_NONE"
                  }
                ]
                
                
            };
    
            try {
               
                const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GOOGLE_API_KEY}`, requestBody, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
              
                if(response){
                    setLoadStatus(false)
                }
                if(response.status ==200){
                setLoadStatus(false)
                const content = response?.data?.candidates[0]?.content 
             
               
                if (content){
                    const chequedetails = content.parts[0]?.text
                    const outputdetails = formatresponse(chequedetails)
                    console.log("my final outputdetails", outputdetails)
                   
                    // setShowDetails(outputdetails)
                    setImageDetails(true)
                    setChequeContent(outputdetails)
                  
                }
                else {
              
                //   setErrorMessage("Safety Issue")
                }
    
              }
              else {
                console.log("error")
                // setErrorMessage("Something went wrong")
                // setLoadStatus(false)
              }
    
                // Handle the response data as needed
            } catch (error) {
                console.error('Error uploading image:', error);
                
                // setErrorMessage("Error uploading image")
                // Handle the error as needed
            } finally {
              setLoadStatus(false)
            }
        };
    }

    const chequeDetailSubmit =() => {
        if(chequeContent){
        dispatch(setChequedataFunction(chequeContent))
        setchequeModal(false)
        }

    }

    const otherHandleChequeImage = async(event) => {
        setChequeImage(null)
        setImageDetails(false)
        const selectedChequeImage = event.target.files[0]; 
        setChequeImage(selectedChequeImage) 
    }

    const chequeModalclose = () => {
        setChequeImage(null) 
        setchequeModal(false)
    }


    return (

        <div className='absolute top-0 flex justify-center items-center h-screen xl:w-9/12 lg:w-9/12 sm:w-full'>


            {chequeModal && <div style={{background: darkModeState.checkvalue ? dayTheme.masterListRowColor : darkTheme.masterListRowColor}} className=' relative xl:w-6/12 lg:w-7/12 sm:w-10/12 rounded-[28px] z-50 ChequeShadow'>

                <div className='absolute top-[-12px] right-0'>
                    <button onClick={chequeModalclose}> <CloseSharpIcon className='rounded-full text-[#373195] shadow closeButton  border-3 border-[#373195]' style={{ fontSize: '30px', fontWeight: 'bold' }} /></button>

                </div>

                <div className='w-[100%] rounded flex justify-center'>
                    <div className='w-[90%] py-4'>
                        {
                         chequeImage ?<img src={URL.createObjectURL(chequeImage)} alt="Preview" style={{width:'100%'}} />:
                         <img src={ImageOutLine} style={{ width: '100%', height: '300px' }} alt="" srcset="" className='rounded-xl' />

                      }
                    </div>
                </div>
                {imageDetails && !loadstatus &&  <div className='flex justify-center'>
                    <div className='w-[90%]'>
                        <div> <label><strong>Party Name</strong></label>: {chequeContent?.partyname || ""}</div>
                        <div><label><strong>Amount</strong></label>: {chequeContent?.txn_amount || ""}</div>
                        <div>  <label><strong>Date</strong></label>:{chequeContent[`txn_refdate[1]`] || ""}</div>
                        <div>  <label><strong>BankDetails</strong></label>: {chequeContent?.bank|| "" }</div>
                        <div> <label><strong>Cheque Number</strong></label>:{chequeContent[`txn_refno[1]`]|| ""}</div>

                    </div>

                </div>}
                { 
                  loadstatus && (
                 <div style={{display:"flex", justifyContent:"center",alignItems:"center", height:"100%"}}>
                 <Spinner />
                 </div>
          )
        }
                <div>
                    <hr />
                    <div className='flex justify-between items-center px-2 py-2'>
                        <input type="file" name="" ref={fileInputRef} id="" style={{ display: 'none' }} onChange={ otherHandleChequeImage } />
                        <div><button className='rounded-xl text-center py-2 px-4 my-1 font-semibold logOutbutton' onClick={() => fileInputRef?.current?.click()}>Import</button></div>
                        <div>
                            <button className='rounded-xl text-center py-2 my-1 mx-2 px-4  font-semibold logOutbutton' onClick={getImageDetails}>Extract</button>
                            <button className='rounded-xl text-center py-2 my-1 px-4 font-semibold logOutbutton' onClick={chequeDetailSubmit}>Submit</button>
                        </div>
                    </div>
                </div>


            </div>}
            {/* {chequeModal && <div className='bg-gray-100 absolute xl:w-[53%] lg:w-[62%] sm:w-[87%] rounded-[28px] h-[50%] ChequeShadow'>

            </div>} */}


        </div>
    )
}

export default ChequeModal