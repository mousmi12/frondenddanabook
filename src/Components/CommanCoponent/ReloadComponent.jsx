import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

function ReloadComponent() {
    return (
        <div className='absolute top-[50%] left-[50%] text-center p-10'>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loding.....</span>
            </Spinner>
            {/* <p className='text-blue-300 font-bold'>Loding.....</p> */}
        </div>
    )
}

export default ReloadComponent