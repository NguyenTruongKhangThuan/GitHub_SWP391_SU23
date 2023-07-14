import React, {useState} from 'react'
import {nanoid} from 'nanoid'

const Tags = () => {
    const [data, setData] = useState([]);
    const [openAddForm, setOpenAddForm] = useState(false)
    const [addData,setAddData] = useState({
        tagName: ''
    })


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

        const newTagsData = [...data, newTag];
        setData(newTag);
    }

    const toggleDetailsForm = () => {
        setOpenDetailsForm(!openDetailsForm)
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
                        <button className='bg-pink-500' onClick={toggleAddForm}>Cancel</button>
                    </form>
                )

                }
                <table>
                    <thead>
                        <tr>
                            <th>
                                <input type='checkbox'></input>
                            </th>
                            <th>Tag ID</th>
                            <th>Tag Name</th>
                            <th colSpan={2}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Replace with Call API here */}
                        <tr>
                            <td>
                                <input type='checkbox'></input>
                            </td>
                            <td>T01</td>
                            <td>Monopoly</td>
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
                        <button className='bg-purple-500' onClick={toggleDetailsForm}>Cancel View Details</button>
                        <button className='bg-pink-500' onClick={switchingUpdateFormAndDetailsForm}>Update Tags</button>
                    </form>
                )}
            </div>

            
        </div>
    )
}

export default Tags
