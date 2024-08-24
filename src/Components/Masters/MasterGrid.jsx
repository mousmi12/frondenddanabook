import { useEffect,useState,useRef } from "react";
import { Table, TextInput, NumberInput,  Select, Button,Text } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { BaseURL } from "./masterPagefunctions";
import axios from "axios";
import CheckCircleOutlineRoundedIcon  from '@mui/icons-material/CheckCircleOutlineRounded'


function MasterGrid({gridfield}){
  
    const [rows, setRows] = useState([]);
    const [selectOptions, setSelectOptions] = useState({});
    const [ validationErrors, setValidationErrors] = useState({})
    const [activeRow, setActiveRow] = useState(null);
    const [headerWidths, setHeaderWidths] = useState({}) 
    const headerRefs = useRef([])

    const inputRefs = useRef([])

    useEffect(()=> {

        const handleClearRows = () => {
            setRows([]);
            localStorage.removeItem('masterGridRows');
            window.dispatchEvent(new Event('rowsUpdated'));
          };
        
          // Clear rows when gridfield changes
          handleClearRows();
    
     const initialRow =  gridfield?.reduce((acc,{name})=> {
        acc[name]=""; 
        return acc
     }, {});

     setRows([initialRow])

     const fetchSelectOptions = async() => {
        const options = {} 
        for (const field of gridfield){
            if(field.inputtype==="Dropdown" && field.apiservicename) {
                try {
                let dropdownurl = ""
                const { apiservicename ,apiarguments,apiendpoint} = field
                if(apiarguments){
                    dropdownurl = `https://${apiservicename}.${BaseURL}${apiendpoint}?${apiarguments}` 
                }
                else 
                {
                    dropdownurl =  `https://${apiservicename}.${BaseURL}${apiendpoint}`
                }
                const response = await axios.get(dropdownurl)
                const transformeddata = response?.data?.data?.map((item)=> ({label:item.name, value:item.id}))
                setSelectOptions((prev)=> ({
                    ...prev,
                    [field.name]:transformeddata

                }))


            }
                catch(error){
                    console.error(`Error fetching options for ${field.name}:`, error);
                    // Set empty or default options on error
                    options[field.name] = [];
                }


            }

        }

     }




   fetchSelectOptions();

//    const handleClearRows = () => {
//     setRows([]);
//     localStorage.removeItem('masterGridRows');
//     window.dispatchEvent(new Event('rowsUpdated'));
//      };
 
//      window.addEventListener('clearRows', handleClearRows);

    return () => {
    window.removeEventListener('clearRows', handleClearRows);
     };

    },[gridfield])


    // useEffect(()=> {

    // localStorage.setItem('masterGridRows', JSON.stringify(rows))
    // window.dispatchEvent(new Event('rowsUpdated'))
    // },[])

    useEffect(()=> {
        const widths ={};
        headerRefs.current.forEach((ref,index)=> {
            if(ref){
                widths[gridfield[index].name] = ref.offsetWidth;
            }
        });
        setHeaderWidths(widths)
    },[gridfield])

    // const inputStyles = {
    //     input:{
    //         height:'10px',
    //         fontSize:'14px',
    //         width:'200px'

    //     },
    //     select:{
    //         height:'10px',
    //         fontSize:'14px',
    //         width:'200px'

    //     }
    // }

    const inputStyles = {
        input: (fieldName) => ({
            height: '10px',
            fontSize: '14px',
            width: headerWidths[fieldName] || '200px'
        }),
        select: (fieldName) => ({
            height: '10px',
            fontSize: '14px',
            width: headerWidths[fieldName] || '200px'
        })
    }

    const addRow =()=> {
        const newRow = gridfield.reduce((acc,{name})=> {
            acc[name]="";
            return acc;
        },{});
        setRows([...rows, newRow])
        setActiveRow(null)
    }

    const removeRow = (rowIndex) => {
        const updatedRows = rows.filter((_, index) => index !== rowIndex);
        setRows(updatedRows);
        localStorage.setItem('masterGridRows', JSON.stringify(updatedRows));
        window.dispatchEvent(new Event('rowsUpdated'));
    };

    const handleInputChange = (rowIndex, fieldName, value) => {
        const field = gridfield.find(f =>f.name === fieldName);
        let newValue= value; 

        if(field.inputtype === 'Number'){
            const numericValue= newValue?.toString().match(/^\d*\.?\d*$/)?.[0];
            if(numericValue===undefined || numericValue!==newValue.toString()){
                setValidationErrors(prevErrors=>({
                    ...prevErrors,
                    [rowIndex]:{
                        ...prevErrors[rowIndex],
                        [fieldName]: "Please enter a valid number."
                    }

                }));
                return;
            }
            else {
                setValidationErrors(prevError=>({
                    ...prevError,
                    [rowIndex]:{
                        ...prevError[rowIndex],
                        [fieldName]:false
                    }

                }));
            }
            newValue=numericValue;
        }



        const updatedRows = rows.map((row, index) => {
            if (index === rowIndex) {
                return { ...row, [fieldName]: value };
            }
            return row;
        });
        setRows(updatedRows);
        validateRow(updatedRows[rowIndex], rowIndex);
    };

   

    const validateRow =(row,index) => {
        const errors = {}
        gridfield.forEach(field =>{
          if(field.required && !row[field.name]){
            errors[field.name] = true
          }
        })
        setValidationErrors(prevErrors => ({ ...prevErrors, [index]: errors }));
      }

    
    const areAllFieldsFilled = (row) => {
        return gridfield.every(field => {
          return !field.required || (field.required && row[field.name]);
        })
      }

      const handleKeyDown = (index, event, fieldName) => {
        const isLastColumn = gridfield[gridfield.length - 1].name === fieldName;
      
        if (event.key === 'Enter') {
          event.preventDefault();
      
          // Validate the row before proceeding
          // const isValid = areAllFieldsFilled(rows[index]);
      
          // if (!isValid) {
          //   validateRow(rows[index], index); // Show validation errors
          //   return; // Prevent moving to the next field or adding a new row
          // }
          const currentField = gridfield.find(field => field.name === fieldName);
           if (currentField.required && !rows[index][fieldName]) {
            validateRow(rows[index], index); // Show validation errors
            const currentRef = inputRefs.current[index * gridfield.length + gridfield.findIndex(field => field.name === fieldName)];
            if (currentRef) {
                currentRef.focus(); // Focus on the current required field
            }
            return;
         }

      
          if (isLastColumn) {
      
            const isValid = areAllFieldsFilled(rows[index]);
      
          if (!isValid) {
            validateRow(rows[index], index); // Show validation errors
            return; // Prevent moving to the next field or adding a new row
          }
          localStorage.setItem('masterGridRows', JSON.stringify(rows));
          window.dispatchEvent(new Event('rowsUpdated'));

      
            // Check if a new row has already been added
            setActiveRow(index);
      
            // Add a new row only if the current active row is the last row
            if (isValid && index === rows.length - 1) {
             
              addRow()
              
            }
            // dispatch(setReduxRows(rows));
           
      
            // Move cursor to the first field of the new row
            const newRowIndex = rows.length;
            const firstFieldIndex = 0;
            const firstRef = inputRefs.current[newRowIndex * gridfield.length + firstFieldIndex];
            if (firstRef) {
              firstRef.focus(); // Move cursor to the first field of the new row
            }
          } else {
            // Move to the next field in the current row
            const nextFieldIndex = gridfield.findIndex(field => field.name === fieldName) + 1;
            if (nextFieldIndex < gridfield.length) {
              const nextRef = inputRefs.current[index * gridfield.length + nextFieldIndex];
              if (nextRef) {
                nextRef.focus();
              }
            }
          }
        }
      };


    




    return (
        <>
           {/* <Button onClick={addRow} variant="light" style={{ marginTop: '10px' }}>
                    Add Row
                </Button> */}
       <div style={{ overflowX:"auto", overflowY:"auto", minHeight:"100px", maxWidth:'100%', marginTop:"-10px"}}>
        <Table  style={{ minWidth: '100%' }}>
            <thead>
                <tr>
                    {
                        gridfield.map((field)=>(
                            <th key={field.id}  style={{ textAlign: 'left', paddingLeft: '24px' }}>{field.label}</th>
                        ))
                    }
                    <th style={{ textAlign: 'left', paddingLeft: '24px' }}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    rows.map((row, rowIndex)=> (
                        <tr key={rowIndex}>
                            {
                                gridfield.map((field ,colIndex)=> (
                                    <td key={field.id} >
                                     {
                                        field.inputtype === "Text" && (
                                            <TextInput 
                                            size="sm"
                                         
                                            value={row[field.name]}
                                            onChange={(e) => handleInputChange(rowIndex, field.name, e.target.value)}
                                            onKeyDown={(event) => handleKeyDown(rowIndex, event, field.name)}
                                            ref={el => inputRefs.current[rowIndex * gridfield.length + colIndex] = el}
                                            rightSection={validationErrors[rowIndex]?.[field.name] && <CheckCircleOutlineRoundedIcon sx={{color:'red'}}/>}
                    

                                            />
                                        )                             
                                     } 
                                     {
                                        field.inputtype === "Number" && (
                                            <>
                                            <NumberInput
                                            size="sm"
                                         
                                            hideControls
                                            value={row[field.name]}
                                            onChange={(value) => handleInputChange(rowIndex, field.name, value)}
                                            onKeyDown={(event) => handleKeyDown(rowIndex, event, field.name)} 
                                            ref={el => inputRefs.current[rowIndex * gridfield.length + colIndex] = el}
                                            rightSection={validationErrors[rowIndex]?.[field.name] && <CheckCircleOutlineRoundedIcon sx={{color:'red'}}/>}
                    
                                             
                                                                                                                                      
                                            />
                                             
                                                {validationErrors[rowIndex]?.[field.name] && (
                                                    <Text color="red" size="xs" mt="4px">
                                                        {validationErrors[rowIndex][field.name]}
                                                    </Text>
                                                )}
                                            </>
                                        )
                                     }
                                     {
                                        field.inputtype === 'Dropdown' && (
                                            <Select 
                                           
                                              data={selectOptions[field.name] || []}
                                               defaultValue=""
                                               value={row[field.name]}
                                               onChange={(value) => handleInputChange(rowIndex, field.name, value)}
                                               onKeyDown={(event) => handleKeyDown(rowIndex, event, field.name)} 
                                               ref={el => inputRefs.current[rowIndex * gridfield.length + colIndex] = el}
                                               rightSection={validationErrors[rowIndex]?.[field.name] && <CheckCircleOutlineRoundedIcon sx={{color:"red"}} />}
                          
                                            



                                                                                              

                                            />
                                        )
                                     }
                                     {
                                        field.inputtype === "Date" && (
                                            <DateInput
                                       
                                            value={row[field.name]}
                                            onChange={(value) => handleInputChange(rowIndex, field.name, value)}
                                            ref={el => inputRefs.current[rowIndex * gridfield.length + colIndex] = el}
                                            onKeyDown={(event) => handleKeyDown(rowIndex, event, field.name)} // Add this line
                                            rightSection={validationErrors[rowIndex]?.[field.name] && <CheckCircleOutlineRoundedIcon sx={{color:"red"}}/>}
                                           



                                            />
                                        )
                                     }
                                    
                                       

                                    </td>
                                    
                                ))
                            }
                               <td>
                                    {rowIndex !== 0 && (
                                        <Button
                                            variant="outline"
                                            color="red"
                                            onClick={() => removeRow(rowIndex)}
                                            size="xs"
                                        >
                                            Remove
                                        </Button>
                                    )}
                                </td>

                        </tr>
                    ))
                }
            </tbody>
        </Table>
       </div>
        </>
    )
}

export default MasterGrid