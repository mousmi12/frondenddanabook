import axios from "axios";
import { selectMenuFunction } from "../../Redux/Reducer/activateMenuSlice";


// master API
export const commanAPI = "https://zerobook.milestone-hosting.cloud"

export const BaseURL = `zerobook.store`

// comman API Update Delete List Insert
export const commanAactionsAPI = `https://operations.${BaseURL}/api/operation`



// Create function for fetching Master API data and List Table
export const fetchData = async (setFormDetails, selectState, sethiddenReloadIcon, setIsValidateRequired) => {
  //------------ set Reaload true-------------
  if (selectState.name === null && selectState.opid === null) {
    sethiddenReloadIcon(false);
  } else {
    sethiddenReloadIcon(true);
    setIsValidateRequired(false);
    console.log("Backend", `${commanAactionsAPI}/${selectState.name}/${selectState.opid}`)
    try {
      console.log("Backend values", selectState.name, selectState.opid)
      const response = await axios.get(
        `${commanAactionsAPI}/${selectState.name}/${selectState.opid}`
      );

      if (response.status === 200) {
        //   console.log("FormFiled data", response.data.form);
        console.log("API Argument First", response.data.form)
        if (selectState.name !== 'Report') {
          setFormDetails(response.data.form);
        } else {
          setFormDetails(response.data.reports);
        }

        //------------ set Reaload false-------------
        sethiddenReloadIcon(false);
      } else {
        console.error("Request failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

};







// create groupListData for Master Form Supplier (Dropdown)
export const groupListData = async (gropDropListAPI, setGroupList,setAccountList) => {
  try {
    const response = await axios.get(gropDropListAPI);
    console.log("Supplier Dropdown after", gropDropListAPI);
    console.log("supplier Drop response : ", response.data.data);
    setGroupList(response.data.data);
    setAccountList(response.data.data);
  } catch (error) {
    console.error('Error fetching supplier list:', error);
  }
};






// create dropdown API for Master Form (Region) 
export const getRegion = async (APIStateRegion, setRegionList) => {
  try {
    const response = await axios.get(APIStateRegion);
    // console.log("Response data:",`${commanAPI}${filterAPI}`);
    setRegionList(response.data);
  } catch (error) {
    console.error('Error fetching state list:', error);
  }
};


// GetMAsterAccountData(get perticulat data form)(SUP,CUS,REV......)

// export const getMasterAccountDetails = async (formDetails, selectState, setgetAccDataUpdate) => {
//   console.log("FormDetailsMAsterAccount", formDetails?.apiendpoint)
//   console.log("get Update data", `https://${formDetails.apiservicename}.${BaseURL}${formDetails.apiendpoint}/${selectState.userId}`)
//   try {
//     const response = await axios.get(`https://${formDetails.apiservicename}.${BaseURL}${formDetails.apiendpoint}/${selectState.userId}`);
//     console.log("get Update data", `https://${formDetails.apiservicename}.${BaseURL}${formDetails.apiendpoint}/${selectState.userId}`)
//     console.log("response",response.data)
//     const { billingaddress } = response.data.data[0];  
//     if (billingaddress) {
//       const billingAddstring = JSON.stringify(billingaddress);
//       const billingAdd = JSON.parse(billingAddstring);
//       const billingAddsec = JSON.parse(billingAdd);
//       const billingAddThr= JSON.parse(billingAddsec);
//       response.data[0].billingaddress = billingAddThr
//       console.log("Billing address", billingAddThr)
//       setgetAccDataUpdate(response.data);
//     } else {
//       setgetAccDataUpdate(response.data);
//     }
//     //  console.log("getMasterAccountDetails",billingAddressNew);
//   } catch (error) {
//     console.error('Error fetching account Details list:', error);
//   }
// }


export const getMasterAccountDetails = async (formDetails, selectState, setgetAccDataUpdate) => {
  try {
    // Construct the URL
    const url = `https://${formDetails.apiservicename}.${BaseURL}${formDetails.apiendpoint}?id=${selectState.userId}`;
    console.log("Request URL:", url);

    // Make the API call
    const response = await axios.get(url);


    // Extract and parse billing address if it exists
    const data = response.data.data[0];
    const { billingaddress, docdate, txn_narrations } = data;
    if (billingaddress) {
      try {
        const parsedBillingAddress = JSON.parse(billingaddress);
        const parsedBillingAdd = JSON.parse(parsedBillingAddress);
        data.billingaddress = parsedBillingAdd;
        console.log("Parsed Billing Address:", parsedBillingAdd);
      } catch (parseError) {
        console.error("Error parsing billing address:", parseError);
      }
    }

    if (txn_narrations) {
      try {
        const parsedBillingAddress = JSON.parse(txn_narrations);
        data.txn_narrations = parsedBillingAddress.DESC
        console.log("Parsed Billing Address:", parsedBillingAddress);
      } catch (parseError) {
        console.error("Error parsing billing address:", parseError);
      }
    }


    if (docdate) {
      try {
        const originalDate = docdate;
        const formattedDate = originalDate.split(' ')[0];
        data.docdate = formattedDate
        console.log("txn_docdate", formattedDate);
      } catch (parseError) {
        console.error("Error parsing billing address:", parseError);
      }
    }

    // Update the state with the fetched data
    setgetAccDataUpdate(response.data);
    console.log("API Response:", response.data);


  } catch (error) {
    console.error('Error fetching account details:', error);
  }
};









// create function for implementing Tab button function for Enter key press

export const handleEnterKeyPress = (event, currentField, formDetails, filterTextid) => {
  if (event.key === 'Enter') {
    event.preventDefault();

    // Ensure the form fields are sorted by position
    const sortedFormFields = formDetails.form_fields.sort(
      (a, b) => a.position - b.position
    );

    const nextFieldIndex = sortedFormFields.findIndex(
      (field) => field.tabid === filterTextid && field.position > currentField.position
    );

    if (nextFieldIndex !== -1) {
      const nextField = sortedFormFields[nextFieldIndex];
      const nextFieldElement = document.getElementById(nextField.id);


      if (nextFieldElement) {
        // Check the type of the next field and focus accordingly
        switch (nextField.inputtype) {
          case 'Text':
          case 'Number':
          case 'Date':
            nextFieldElement.focus();
            // nextFieldElement.click();
            nextFieldElement.select();
            break;

          case 'Dropdown':
            // nextFieldElement.click();
            nextFieldElement.focus();
            // nextFieldElement.select();
            break;
          // Add more cases if needed for other field types
          default:
            break;
        }
      }
    }
  }
};



// // create function for Enter function
export const handleEnterKeyPressMAaster = (event, currentField, formDetails) => {
  if (event.key === 'Enter') {
    event.preventDefault();

    // Ensure the form fields are sorted by position
    const sortedFormFields = formDetails.form_fields.sort(
      (a, b) => a.position - b.position
    );

    const nextFieldIndex = sortedFormFields.findIndex(
      (field) =>
        field.tabid === null &&
        field.position > currentField.position &&
        field.readonly === false
    );

    if (nextFieldIndex !== -1) {
      const nextField = sortedFormFields[nextFieldIndex];
      const nextFieldElement = document.getElementsByName(nextField.name)[0]
      const currentFieldElement = document.getElementsByName(currentField.name)[0];
      console.log("Previous", currentFieldElement)

      // Check if the next field is required and its value is not null or empty
      if (!(currentField.required === true && (currentFieldElement.value == null || currentFieldElement.value.trim() == ''))) {
        if (nextFieldElement) {
          nextFieldElement.focus();
          console.log("nextfiledss", nextFieldElement)
        }
      }
    }
  }
};






// export const handleEnterKeyPressMAaster = (event, currentField, formDetails) => {
//   if (event.key === 'Enter') {
//     event.preventDefault();

//     // Find the next field to focus on
//     const nextField = findNextField(currentField, formDetails);
//     console.log("ksadks", nextField)

//     // Focus on the next field if found
//     if (nextField) {
//       // Focus on the Select component if it's the next field
//       console.log("inside", nextField)
//       console.log("type", nextField.inputtype);
//       const currentFieldElement = document.getElementsByName(currentField.name)[0];
//       const varTag = document.getElementsByName(nextField.name)[0]
//       if (nextField.inputtype === "Dropdown") {
//         // Check if the ref exists and if the focus method is available
//         console.log("inside after", nextField)

//         console.log("current filed", currentFieldElement)
//         console.log("selfRef", varTag)
//         if (!(currentField.required === true && (currentFieldElement.value == null || currentFieldElement.value.trim() == ''))) {
//           if (varTag) {
//             varTag.focus();
//             console.log("select Reference", varTag);
//           }
//         }
//       } else {
//         // Focus on the next input field
//         const nextFieldElement = document.getElementById(nextField.name);
//         // current field
//         console.log("current filed567667", currentFieldElement)
//         if (!(currentField.required === true && (currentFieldElement.value == null || currentFieldElement.value.trim() == ''))) {
//           if (varTag) {
//             varTag.focus();
//             console.log("ullil", nextFieldElement);
//             console.log(nextField.name);
//           }
//         }
//       }
//     }
//   }

// };








// // Helper function to find the next field to focus on
// const findNextField = (currentField, formDetails) => {
//   // Ensure the form fields are sorted by position
//   const sortedFormFields = formDetails.form_fields.sort(
//     (a, b) => a.position - b.position
//   );

//   // Find the index of the current field
//   const currentFieldIndex = sortedFormFields.findIndex(
//     (field) => field.id === currentField.id
//   );

//   // Find the next field based on tabindex
//   let nextFieldIndex = -1;
//   for (let i = currentFieldIndex + 1; i < sortedFormFields.length; i++) {
//     const field = sortedFormFields[i];
//     if (field.tabid === null && field.readonly === false) {
//       nextFieldIndex = i;
//       break;
//     }
//   }

//   // Return the next field if found
//   if (nextFieldIndex !== -1) {
//     const nextField = sortedFormFields[nextFieldIndex];
//     // Set the type property based on field type
//     const type = nextField.inputType === 'Dropdown' ? 'Dropdown' : 'input';
//     return { ...nextField, type };
//   }

//   // Return null if no next field found
//   return null;
// };







// List Table Data (Master Data Filed)
export const getTableListItems = async (formDetails, setTableItemList, setMenuLoaded) => {

  const apiendpoint = formDetails?.apiendpoint;
  const apiArgumenty = formDetails?.apiarguments?.[0];
  const apiServicename = formDetails?.apiservicename
  setMenuLoaded(true)

  console.log("Table Items", `https://${apiServicename}.${BaseURL}${apiendpoint}?${apiArgumenty}`)

  try {
    const response = await axios.get(
      `https://${apiServicename}.${BaseURL}${apiendpoint}?${apiArgumenty}`
    );
    if (response.status === 200) {
      setTableItemList(response.data);
      setMenuLoaded(false)
    } else {
      console.error("Request failed with status:", response.status);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    const errorData = {
      name: '',
      active: []
    }
    setTableItemList(errorData);
    setMenuLoaded(false);
  }
};



// export const deleteTableDatas = async()=>{

//   try{
//     const response = await axios.delete(
//       `${commanAPI}/form/`
//   )
//   }catch(error){
//     console.error("error:",error)

//   }
// }

// Delete function for Master Form

export const handleDeleteAPI = async (formDetails, selectState, sethiddenReloadIcon, setSaveButtonDisabled, dispatch) => {
  const apiEndpoint = formDetails.apiendpoint;
  const apiArgumenty = formDetails.apiarguments[0];
  const apiservicename = formDetails.apiservicename;
  setSaveButtonDisabled(true);
  sethiddenReloadIcon(true);
  console.log("DeleteedID", selectState);
  let getId
  if (selectState.userId === selectState.deleteId) {
    getId = selectState.userId
  } else {
    getId = selectState.deleteId
  }
  try {
    const response = await axios.delete(
      `https://${apiservicename}.${BaseURL}${apiEndpoint}?${apiArgumenty}&id=${getId}`
    );

    if (response.status === 200) {
      // window.confirm(response.data.message);
      setSaveButtonDisabled(false);
      sethiddenReloadIcon(false);
      window.addEventListener('click', dispatch(selectMenuFunction({ name: 'List', opid: selectState.opid })));
      // Assuming you want to log the response data
    } else {
      console.error("Request failed with status:", response.status);
    }
  } catch (error) {
    console.error("Error deleting data:", error);
  }
};
