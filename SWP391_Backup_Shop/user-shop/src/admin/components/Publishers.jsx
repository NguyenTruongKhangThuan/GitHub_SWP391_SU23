import React, {useEffect, useState} from 'react'
import { getOwnerAPI, postOwnersAPI, putOwnersAPI } from '../../api/adminAPI';
import AdminAccount from './AdminAccount';

const getToken = sessionStorage.getItem("accountToken");


const Owner = () => {

    return (
        <div>
        <h1 className='mt-[20px] mb-[30px] font-bold text-2xl'>Publishers Management</h1>

        </div>
    )
}

export default Owner
