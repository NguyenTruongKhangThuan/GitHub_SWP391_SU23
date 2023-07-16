import React, { useState, useEffect } from 'react'
import { getGameTagsAPI } from '../../api/adminAPI'

const Tags = () => {
    const [gameTags, setGameTags] = useState([])

    useEffect(() => {
        refreshGameTagsList();
    }, [])

    const refreshGameTagsList = async () => {
        await getGameTagsAPI(sessionStorage.getItem("accountToken"))
            .then((data) => setGameTags(data))
            .catch((error) => console.log(error))
    }

    return (
        <div>
            <div className='flex justify-between'>
                <h2>Tags Management</h2>
                <button
                    className='bg-blue-500 flex justify-center w-[120px] p-2 rounded-md'

                >
                    Add
                </button>
            </div>
            <table className='mt-[10px]'>
                <thead>
                    <tr className='text-[16px]'>
                        <th className='border-[2px] border-gray-500 pr-5 px-3'>Tag ID</th>
                        <th className='border-[2px] border-gray-500 pr-5 px-3'>Tag Name</th>
                        <th className='border-[2px] border-gray-500 pr-5 px-3' colSpan={3}>Actions</th>
                    </tr>
                </thead>
                <tbody className='bg-gray-200'>
                    {gameTags.map((gameTag, index) => (
                        <tr className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-300'} text-[16px]`}>
                            <td className='border-[2px] border-gray-500 pr-5 pl-2'>{gameTag.gameTagId}</td>
                            <td className='border-[2px] border-gray-500 pr-5 pl-2'>{gameTag.gameTagName}</td>
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
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Tags
