export function convertDate(dateStr) {
    if(!dateStr){
        return 
    }
    let day = dateStr?.slice(0, 2);
    let month = dateStr?.slice(2, 4);
    let year = dateStr?.slice(4, 8);
    return `${year}-${month}-${day}`;
}

export function formatNumber(inputamount){ 
    let cleanInput = inputamount.replace(/[,\-\/]/g, '')
    let integerPart = cleanInput.split(".")[0];
    return integerPart

} 

export function updateAmount(value){
    let formatamount = value
    if (/[,\-\/]/.test(value)){
        formatamount = formatNumber(value)
        
    }
    return formatamount;
} 






export const singledigitfunc = (singlelines) => {
  
    console.log("ll", singlelines)
    const result = {} 
    singlelines.forEach(line => {
        const [key, value] = line.split('. ').map(part=>part.trim());
    
        switch(key){
            case '1':
            case '1.':
                result.partyname = value
            case '2':
            case '2.':
                result["txn_refdate[1]"] = value ? convertDate(value) : ""
            case '3':
            case '3.':
                result.txn_amount = updateAmount(value)
            case '4':
            case '4.':
                result.bank = value
            case '5':
            case '5.':
                result["txn_refno[1]"] =value || ""

        }
    })
  
    return result
} 


export function cleanObject(obj) {
    
 
    const cleanedobj = {}
    for (let key in obj){
       
        if(typeof obj[key] == 'string'){
            cleanedobj[key] = obj[key].replace(/\"$/, '');
        }
        else {
            cleanedobj[key] = obj[key];
        }
    }
    return cleanedobj
}

export const singleconvert = (lines) => {
   
    const joinedLines = lines.join(('\n')) 
   
    const singlelines = joinedLines.replace('```json', '').replace('```').replace('{', '').replace('}', '').trim();
   
    const removesingle = singlelines.split("\n")
   
    const transfromdata = {}
    try {
        for (const value of removesingle ){ 
         
            const parts = value.split(':').map(part => part.trim());
            if (parts.length > 1) {
                let key = parts[0].replace(/^"|"$/g, '');   // Removes quotes from the key part
                let value = parts[1].replace(/^"|"$/g, '').replace(/,$/, '')  // Removes quotes from the value part
              
             
                if (key == "Name of Customer"){
                 
                    transfromdata["partyname"] = value
                }
                else if(key == "Date"){
                    transfromdata[`txn_refdate[1]`] = value || ""
                }
                else if (key == "Digits"){
                    transfromdata["txn_amount"] = value
                }
                else if(key == "Bank Details"){
                    transfromdata["bank"] = value
                }

                else if (key == "Cheque Number"){
                    transfromdata[`txn_refno[1]`] = value || ""
                }
                console.log("Value:", value); // Output: Maharaja
              }
            

        }
      
        let newtransformdata = {...transfromdata}
        const convertedtransformdata = cleanObject(newtransformdata)
        
        return convertedtransformdata
       
    }
    catch(error){
        console.log("error")
        return null
    }
    

}

export const extractData = (lines) => {
    let result = {} 
    let matched =  false;
    lines.forEach(line => {
        const [key, value] = line.split(': ').map(part =>part.trim())
        if (key == '```json' || key == '```'){
               matched =  true
               result = singleconvert(lines)
            
            
            }
        switch(key){
            case '1. Name of Customer':
            case 'Name of Customer':
            case '- Name of Customer':
            case "Name of Customer":
            case '1. ':
            case '1.':
            case '1.  ':
            case '**Name of Customer':
                result.partyname = value;
                matched = true;
                break;
            case '2. Date':
            case 'Date':
            case '- Date':
            case '2. ':
            case '2.':
            case '2.  ':
            case '**Date:':
                result["txn_refdate[1]"] = value ? convertDate(value) : "";
                matched = true;
                break;
            case '3. Digits':
            case 'Digits':
            case '- Digits':
            case '3. ':
            case '3.':
            case '3.  ':
            case '**Digits':
                result.txn_amount = updateAmount(value)
                matched = true;
                break;

            case '4. Bank Details': 
            case 'Bank Details':
            case '- Bank Details':
            case '4. ':
            case '4.  ':
            case '**Bank Details:':
                result.bank = value
                matched = true;
                break;
            case '5.  Cheque Number':
            case 'Cheque Number':
            case '- Cheque Number':
            case '5. ':
            case '5.':
            case '5.  ':
            case '**Cheque Number':
                result["txn_refno[1]"] = value || ""
                matched = true 
                break
            default:
                break;

             
            
        }
      
    })
 
    if(!matched){
        return singledigitfunc(lines)
    }
    return result
}


export const formatresponse = (data) => {
    const lines = data.split('\n') 
   
    return extractData(lines)

}



