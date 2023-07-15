import React, {useEffect, useState} from 'react'
import {nanoid} from 'nanoid'

import { getGameTagsAPI, putGameTagsAPI, postGameTagsAPI, deleteGameTagsAPI } from '../../api/adminAPI';

const Tags = () => {
    const [gameTagsData, setGameTagsData] = useState([]);
    const [openAddForm, setOpenAddForm] = useState(false)
    const [addData,setAddData] = useState({
        tagName: ''
    })

    useEffect(()=> {
        refreshTagsList();
    },[])

    const refreshTagsList = async() => {
        await getGameTagsAPI(sessionStorage.getItem("accountToken"))
        .then((data) => setGameTagsData(data))
        .catch((error) => console.log(error))
    }

    const [openDetailsForm, setOpenDetailsForm] = useState(false)
    const [openUpdateForm, setOpenUpdateForm] = useState(false)

    const toggleAddForm = () => {
        setOpenAddForm(!openAddForm)
    }

    const handleAddFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("id");
        const fieldValue = event.target.value;

        const newData = {...addData}
        newData[fieldName] = fieldValue;

        setAddData(newData)
    }

    const handleAddFormSubmit = (event) => {
        event.preventDefault();

        const newTag = {
            id: nanoid(),
            tagName: addData.tagName
        }

        const newTagsData = [...gameTagsData, newTag];
        setGameTagsData(newTagsData);
    }

    const toggleDetailsForm = () => {
        setOpenDetailsForm(!openDetailsForm)
    }

    const handleViewDetailsForm = () => {

    }

    const toggleUpdateForm = () => {
        setOpenUpdateForm(!openUpdateForm)
    }

    const switchingUpdateFormAndDetailsForm = () => {
        setOpenDetailsForm(!openDetailsForm)
        setOpenUpdateForm(!openUpdateForm)
    }

    const handleDeleteClick = () => {
        
    }

    return (
        <div>
            <div>
                <h2 className='text-[24px] font-bold'>Boardgame Tags</h2>
                <button 
                    className='bg-blue-500 flex justify-end'
                    onClick={toggleAddForm}
                    >
                        Add
                </button>
                {openAddForm && (
                    <form 
                        className='grid grid-cols-2 w-[480px] gap-y-4 bg-white rounded-md'
                        onSubmit={handleAddFormSubmit}
                        >
                        <label>Game Tag ID</label>
                        <input 
                            disabled 
                            placeholder='Tag ID' 
                            className='border-gray-300 border-[1px] p-2'
                            id='tagId'
                            
                        />
                        <label>Game Tag Name</label>
                        <input 
                            type='text' 
                            placeholder="Enter the Tag Name" 
                            className='border-gray-300 border-[1px] p-2'
                            onChange={handleAddFormChange}
                            id='tagName'
                        />

                        <button type='submit' className='bg-purple-500'>Add Tag</button>
                        <button className='bg-pink-500' onClick={toggleAddForm}>Cancel</button>
                    </form>
                )

                }
                <table className='mx-auto w-full'>
                    <thead>
                        <tr>
                            <th  className='text-left'>
                                <input type='checkbox'></input>
                            </th>
                            <th id='gameTagId'  className='text-left'>Tag ID</th>
                            <th id='gameTagName'  className='text-left'>Tag Name</th>
                            
                            <th colSpan={2}>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='w-full'>
                        {/* Replace with Call API here */}
                        {gameTagsData.map((gameTag) => (
                            <tr>
                                <td>
                                    <input type='checkbox'></input>
                                </td>
                                <td>{gameTag.gameTagId}</td>
                                <td>{gameTag.gameTagName}</td>
                                
                                <td>
                                    <button 
                                        className='bg-green-500'
                                        onClick={toggleDetailsForm}
                                        >
                                            Details
                                    </button>
                                </td>
                                <td>
                                    <button 
                                        className='bg-yellow-500'
                                        onClick={toggleUpdateForm}
                                        >
                                            Update
                                    </button>
                                </td>
                                <td>
                                    <button className='bg-red-500'>Delete</button>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </table>
                {openUpdateForm && (
                    <form
                        className='grid grid-cols-2 w-[480px] gap-y-4 bg-white rounded-md'
                    >
                        <label>Tag ID</label>
                        <input 
                            disabled 
                            placeholder='Tag ID' 
                            className='border-gray-300 border-[1px] p-2'
                            id='tagId'
                            
                        />
                        <label>Tag Name</label>
                        <input 
                            type='text' 
                            placeholder="Enter the Tag Name" 
                            className='border-gray-300 border-[1px] p-2'
                            onChange={handleAddFormChange}
                            id='tagName'
                        />
                        <button type='submit' className='bg-purple-500'>Add Tag</button>
                        <button className='bg-pink-500' onClick={toggleUpdateForm}>Cancel</button>
                    </form>
                )}
                {openDetailsForm && (
                    <form
                    className='grid grid-cols-2 w-[480px] gap-y-4 bg-white rounded-md'
                >
                        <label>Tag ID</label>
                        <input  
                            placeholder='Tag ID' 
                            className='border-gray-300 border-[1px] p-2'
                            id='tagId'
                        />
                        <label>Tag Name</label>
                        <input 
                            type='text' 
                            placeholder="Enter the Tag Name" 
                            className='border-gray-300 border-[1px] p-2'
                            onChange={handleAddFormChange}
                            id='tagName'
                        />
                        <button className='bg-purple-500' onClick={toggleDetailsForm}>Cancel View Details</button>
                        <button className='bg-pink-500' onClick={switchingUpdateFormAndDetailsForm}>Update Tags</button>
                    </form>
                )}
            </div>

            
        </div>
    )
}

export default Tags
