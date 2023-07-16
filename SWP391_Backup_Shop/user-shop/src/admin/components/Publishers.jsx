import React, { useEffect, useState } from 'react'
import { getOwnerAPI, postOwnersAPI, putOwnersAPI } from '../../api/adminAPI';
import AdminAccount from './AdminAccount';

const Owner = () => {
    const [publishers, setPublishers] = useState([])

    useEffect(() => {
        refreshPublishersList();
    })

    const refreshPublishersList = async () => {
        await getOwnerAPI(sessionStorage.getItem("accountToken"))
            .then((data) => setPublishers(data))
            .catch((error) => console.log(error))
    }

    return (
        <div>
            <div className='flex justify-between'>
                <h2>Publishers Management</h2>
                <button
                    className='bg-blue-500 flex justify-center w-[120px] p-2 rounded-md'

                >
                    Add
                </button>
            </div>
            <table className='mt-[10px]'>
                <thead>
                    <tr className='text-[16px]'>
                        <th className='border-[2px] border-gray-500 pr-5 px-3'>Publisher ID</th>
                        <th className='border-[2px] border-gray-500 pr-5 px-3'>Publisher Username</th>
                        <th className='border-[2px] border-gray-500 pr-5 px-3'>Publisher Password</th>
                        <th className='border-[2px] border-gray-500 pr-5 px-3'>Publisher Full Name</th>
                        <th className='border-[2px] border-gray-500 pr-5 px-3'>Publisher Email</th>
                        <th className='border-[2px] border-gray-500 pr-5 px-3'>Publisher Phone Number</th>
                        <th className='border-[2px] border-gray-500 pr-5 px-3' colSpan={3}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {publishers.map((publisher, index) => (
                        <tr className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-300'} text-[16px]`}>
                            <td className='border-[2px] border-gray-500 pr-5 pl-2'>{publisher.ownerId}</td>
                            <td className='border-[2px] border-gray-500 pr-5 pl-2'>{publisher.ownerName}</td>
                            <td className='border-[2px] border-gray-500 pr-5 pl-2'>
                                {publisher.password}
                            </td>
                            <td className='border-[2px] border-gray-500 pr-5 pl-2'>{publisher.fullName}</td>
                            <td className='border-[2px] border-gray-500 pr-5 pl-2'>{publisher.email}</td>
                            <td className='border-[2px] border-gray-500 pr-5 pl-2'>{publisher.phoneNumber}</td>
                            <td className='border-l-[2px] border-b-[2px] border-r-none border-gray-500 pr-5 pl-2'>
                                <button
                                    className='bg-green-400 hover:bg-green-600 w-[160px] p-4 text-[18px] font-bold rounded-md'

                                >
                                    View Details
                                </button>
                            </td>
                            <td className='border-b-[2px] border-gray-500 pr-5 pl-2'>
                                <button
                                    className='bg-yellow-400 hover:bg-yellow-500 w-[160px] p-4 text-[18px] font-bold rounded-md'

                                >
                                    Update
                                </button>
                            </td>
                            <td className='border-r-[2px] border-b-[2px] border-gray-500 pr-5 pl-2'>
                                <button
                                    className='bg-red-400 hover:bg-red-500 w-[160px] p-4 text-[18px] font-bold rounded-md'

                                >
                                    Ban
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Owner
