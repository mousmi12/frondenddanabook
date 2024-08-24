import Favourite from '../src/asset/Menusvg/main/favourite.svg'
import Master from '../src/asset/Menusvg/main/master.svg'
// import Transation from '../src/asset/Menusvg/main/accounts.svg'
import Inventory from '../src/asset/Menusvg/main/inventory.svg'
import Report from '../src/asset/Menusvg/main/report.svg'
// import Setting from '../src/asset/Menusvg/main/setting.svg'
// import ChequeReceipt from '../src/asset/Menusvg/main/chequereceipt.svg'
import Cashpayment from '../src/asset/Menusvg/main/cashpayment.svg'
// import Cashreciepts from '../src/asset/Menusvg/main/cashreciept.svg'
// import CyberPayment from '../src/asset/Menusvg/main/cyberpayment.svg'
import CyberReceipt from '../src/asset/Menusvg/main/cyberreciept.svg'
import Chequepayment from '../src/asset/Menusvg/main/chequepayment.svg'
import InterstateSales from '../src/asset/Menusvg/main/InterstateSales.svg'
// import ExportSales from '../src/asset/Menusvg/main/ExportSales.svg'
import Salesexport from '../src/asset/Menusvg/main/salesexport.svg'
import Salesreturn from '../src/asset/Menusvg/main/salesreturn.svg'
import Purchase from '../src/asset/Menusvg/main/purchase.svg'
import Purchasereturn from '../src/asset/Menusvg/main/purchasereturn.svg'
import Salesb2c from '../src/asset/Menusvg/main/salesb2c.svg' 
import Expenditure from '../src/asset/Menusvg/main/expenditure.svg'
import Revenue from '../src/asset/Menusvg/main/revenue.svg'
import Supplier from '../src/asset/Menusvg/main/supplier.svg'
import Customer from '../src/asset/Menusvg/main/customer.svg'
import Bank from '../src/asset/Menusvg/main/bank.svg'
import Salesb2b from '../src/asset/Menusvg/main/salesb2b.svg'
import Item from '../src/asset/Menusvg/main/item.svg'
import ExportSales from '../src/asset/Menusvg/main/salesexport.svg'
import CreditNote from '../src/asset/Menusvg/main/creditnote.svg'
import DebitNote from '../src/asset/Menusvg/main/debit note.svg'
import AccountBooks from '../src/asset/Menusvg/main/accountbook.svg'
import Ledger from '../src/asset/Menusvg/main/ledger.svg'
import Payable from '../src/asset/Menusvg/main/payable.svg'
import Receivable from '../src/asset/Menusvg/main/recievable.svg'
import TrialBalance from '../src/asset/Menusvg/main/trialbalance.svg'
import Update from '../src/asset/Menusvg/main/update.svg'
import Delete from '../src/asset/Menusvg/main/delete.svg'
import View from '../src/asset/Menusvg/main/view.svg'
// import Settings from '../src/asset/Menusvg/main/settings.svg'
import UserProfile from '../src/asset/Menusvg/main/user-profile.svg'
export const svgImgPath=[{
    svgname:'Favorites',
    svgsrc:Favourite

},
{
    svgname:'Master',
    svgsrc:Master
    
},
{
    svgname:'Debit Note',
    svgsrc:DebitNote
    
},

{
    svgname:'Credit Note',
    svgsrc:CreditNote
    
},
{
    svgname:'inventory',
    svgsrc:Inventory 
},
{
    svgname:'Reports',
    svgsrc:Report 
},
// {  
//     svgname: "Cheque Receipt",
//     svgsrc: ChequeReceipt,
// },
{
    svgname: "Cash Payment",
    svgsrc: Cashpayment,
   
},
// {
//     svgname: "Cash Receipt",
//     svgsrc: Cashreciepts,
// },
// {
//     svgname: "Cyber Payment",
//    svgsrc: CyberPayment,
// },
{
    svgname: "Cyber Receipt",
   svgsrc: CyberReceipt,
},
{
    svgname: "Cheque Payment",
    svgsrc: Chequepayment,
},
{
    svgname: "Interstate Sales",
   svgsrc: InterstateSales,
},
{
    svgname: "Export Sales",
    svgsrc: ExportSales,
},
{
    svgname: "Sales Export",
    svgsrc: Salesexport,
},
{
    svgname: "Sales Return",
    svgsrc: Salesreturn,
},
{
    svgname: "Purchase",
    svgsrc: Purchase,
},
{
    svgname: "Purchase Return",
    svgsrc: Purchasereturn,
},
{
    svgname: "Sales B2C",
    svgsrc: Salesb2c,
},
 {
        
    svgname: "Expenditure",
    svgsrc: Expenditure,
   
},
{

    svgname: "Revenue",
    svgsrc: Revenue,
    
  
},
{

    svgname: "Supplier",
    svgsrc: Supplier,

 
},
{

    svgname: "Customer",
    svgsrc: Customer,

    
},
{
    
    svgname: "Bank",
    svgsrc: Bank,
  
 
},

{
    svgname: "Sales B2B",
    svgsrc: Salesb2b,
    
},
{
    
    svgname: "Export Sales",
    svgsrc: "Customer",
   
},
{
    
    svgname: 'Item',
    svgsrc: Item,

    
},
{
    
    svgname: 'Account Books',
    svgsrc: AccountBooks,

    
},
{
    
    svgname: 'Ledger',
    svgsrc: Ledger,

    
},
{
    
    svgname: 'Payable',
    svgsrc: Payable,

    
},
{
    
    svgname: 'Receivable',
    svgsrc: Receivable,

    
},
{
    
    svgname: 'Trial Balance',
    svgsrc: TrialBalance,

    
},
{
    
    svgname: 'View',
    svgsrc: View,

    
},
{
    
    svgname: 'Update',
    svgsrc: Update,

    
},
{
    
    svgname: 'Delete',
    svgsrc: Delete,

    
},
{
    svgname:'User Profile',
    svgsrc:UserProfile,
}


]

//  const ImagArr = [ svgImgPath.map((item)=>({
//     svgname: item.svgname,
//     svgsrc: item.svgsrc,
//  }))];

//  console.log("enhurie data",ImagArr)

// const fetchMenuItems = async () => {
//     try {
//         const response = await axios.get('https://operations.zerobook.shop/api/menus/4');
//         console.log("sathya dev", response.data);
//         ImagArr = response.data;
//         console.log("sathya dev second", ImagArr);
//     } catch (error) {
//         console.error("Error fetching menu items:", error);
//     }
// };

// fetchMenuItems()
//     .then(() => {
//         // Map over ImagArr here
//         ImagArr.map((item) => (
//             item.img
//         ));
//     });


// fetchMenuItems()

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// export const SvgImagePath = () => {
//     const [menuArray, setMenuArray] = useState([]);

//     useEffect(() => {
//         const fetchMenuItems = async () => {
//             try {
//                 const response = await axios.get('https://operations.zerobook.shop/api/menus/4');
//                 setMenuArray(response.data.menu[0]);
//             } catch (error) {
//                 console.error("Error fetching menu items:", error);
//             }
//         };

//         fetchMenuItems();
//     }, []); // Empty dependency array ensures fetchMenuItems runs only once on component mount

//     return menuArray.map((item) => ({
//         svgname: item.image,
//         svgsrc: item.label,
//         submenus: item.submenus.map((submenu) => ({
//             svgname: submenu.image,
//             svgsrc: submenu.label,
//         }))
//     }));
// };

// Usage:
// In another component or file, import SvgImagePath and use it to get svgImgPath array
// import { SvgImagePath } from './SvgImagePath';
// const svgImgPath = SvgImagePath();

