import React, { useState } from 'react';
import './master.css';
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded';

function MasterAccount({ accountList, selectboxAttributes }) {
    const [searchQuery, setSearchQuery] = useState("");

    // Filter the account list based on the search query
    const filteredAccounts = accountList.filter((item) =>
        item?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='AccountMenuBgColor h-full overflow-y-auto mt-[95px] shadow'>
            <style>
                {
                    `
                    .accountButtonStyle{
                    background:white;
                    width:80%;
                    box-shadow: inset -1px -1px 4px 2px #888888;
                    }
                    `
                }
            </style>
            <div className='flex justify-end py-2'>
                <input 
                    type="text" 
                    className='rounded outline-none pl-3' 
                    style={{fontSize:'8px'}}
                    placeholder="Search accounts"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className='ml-3'> 
                    <ManageSearchRoundedIcon className='text-white' style={{fontSize:'25px'}}/>
                </button>
            </div>
            <div className='grid grid-cols-5'>
                {filteredAccounts.map((item) => (
                    <div key={item.id} className='divWidth flex flex-col items-center m-2'>
                        <button className='accountButtonStyle rounded py-2 font-black text-xl'>
                            {item?.name?.substr(0, 2)}
                        </button>
                        <label className='text-center text-white font-bold' style={{ fontSize: '10px' }}>
                            {item?.name?.substr(0, 8)}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MasterAccount;
