import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {FileIcon, defaultStyles} from 'react-file-icon';

const Table = ({ columns, data, onDelete, onUpdate, onAdd, isAdd, isDelete, isUpdate, isView, isDetails, isCheckbox, subTable }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = data.slice(startIndex, endIndex);

    const [selectedRow, setSelectedRow] = useState(null);
    const [showAddButton, setShowAddButton] = useState(true);
    const [updatedRow, setUpdatedRow] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [viewedRow, setViewedRow] = useState(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [rowToDelete, setRowToDelete] = useState(null);
    const [viewDetails, setViewDetails] = useState(false);
    const [isViewDetails, setIsViewDetails] = useState(false);

    const [isTextOverflow, setIsTextOverflow] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [isAddConfirmation, setIsAddConfirmation] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newRow, setNewRow] = useState({}); // New row object to be added

    const MAX_INPUT_LENGTH = 20;
    const [formData, setFormData] = useState(null);
    const [viewMode, setViewMode] = useState('Table');
    const [isTableView, setIsTableView] = useState(viewMode === 'Table');
    const [editMode, setEditMode] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedData, setSelectedData] = useState([]);
    const [updateModal, setUpdateModal] = useState(false);
    const [showAddPage, setShowAddPage] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [dataRow, setDataRow] = useState([]);
    const [image, setImage]= useState(null);
    const [rule,setRule] = useState(null);
    const [component,setComponent] = useState(null);

    const handleRowSelection = (rowId) => {
        const isSelected = selectedRows.includes(rowId);

        if (isSelected) {
            setSelectedRows(selectedRows.filter((id) => id !== rowId));
        } else {
            setSelectedRows([...selectedRows, rowId]);
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [field]: value,
        }));
    };

    const handleFileChange = (fieldName, file) => {
        if (file) {
            setSelectedImage(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);

            // Perform any other necessary operations with the file
        }
    };

    const handleSaveUpdateChanges = () => {
        // Perform the update logic with the formData
        // Display confirmation modal or perform any necessary actions
        // Once the update is successful, you can set the viewedRow to the updated data
        setViewedRow(formData);
        openUpdateModalConfirmation();

    };

    const handleToggleAddButton = () => {
        setShowAddButton(!showAddButton);
    };


    const toggleViewMode = () => {
        if (viewMode === 'Table' || viewMode === 'Update') {
            setViewMode('Details');
            setEditMode(false);
        } else {
            setViewMode('Table');
            setEditMode(false);
        }
    };

    const toggleUpdateMode = () => {
        if (isUpdate) {
            setEditMode(true);
            setFormData({ ...viewedRow });
        }
        else {
            window.alert("You cannot update the data!");
        }
    };

    const toggleUpdateDetailsClose = () => {
        setEditMode(false);
        setViewMode('Table');
    };

    const handleCancelUpdate = () => {
        setEditMode(false);
    };

    //Trigger to open Update Modal
    const openUpdateModalConfirmation = () => {
        setUpdateModal(true);
    }

    //Trigger to close Update Modal
    const closeUpdateModalConfirmation = () => {
        setUpdateModal(false);
        setEditMode(false);
    }

    const handleDeleteRows = () => {
        if (selectedRows.length > 0) {
            const updatedData = currentData.filter((row, index) =>
                selectedRows.includes(index)
            );

            // TODO: Perform any necessary API/database operations to delete the selected rows

            // After successful deletion, update the state with the remaining rows
            setSelectedData(updatedData);
            setSelectedRows([]);
        } else {
            // Display error message popup
            alert("Error\nYou did not select any rows to delete.");
        }
    };

    const handleAdd = useCallback(() => {
        setShowAddPage(true);
        
        console.log('Add button clicked');
    }, []);

    const handleAddRow = (e) => {
        e.preventDefault();

        if (newRow) {
            // Perform your logic to add the new row
            // For example, you can call an API or update the data array
            // Once the row is added, you can close the modal and reset the new row object
            // You can replace the console.log statements with your actual logic
            console.log('Adding new row:', newRow);
            // Call the API or update the data array here
            setShowAddPage(false);
            setNewRow({});
        }
    };

    const handleCancelAdd = () => {
        setShowAddModal(false);
        setNewRow({});
    };

    const renderCellValue = (row, column) => {
        const fieldValue = row[column.field];

        if (typeof fieldValue === 'string') {
            return fieldValue;
        }

        if (React.isValidElement(fieldValue)) {
            return fieldValue;
        }

        if (
            typeof fieldValue === 'object' &&
            fieldValue.type === 'img' &&
            fieldValue.props
        ) {
            const { src, alt } = fieldValue.props;
            return <img src={src} alt={alt} className="w-10 rounded-full" />;
        }

        return null;
    };

    useEffect(() => {
        const handleResize = () => {
            const table = document.getElementById('table');
            if (table && table.scrollWidth > table.clientWidth) {
                setIsTextOverflow(true);
            } else {
                setIsTextOverflow(false);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleUpdate = (row) => {
        setSelectedRow(row);

        setUpdatedRow({ ...row });
    };

    const handleUpdateRow = (e) => {
        e.preventDefault();

        if (updatedRow) {
            const updatedValues = { ...updatedRow };

            setUpdatedRow(null);
        }

        setIsConfirmationModalOpen(true);
    };

    const handleView = (row) => {
        setViewedRow(row);
        setIsViewModalOpen(true);
    };

    const handleViewDetails = (row) => {
        setViewedRow(row);
        setIsViewDetails(true);
        setIsViewModalOpen(false);
        setIsTableView(false);
    }

    const handleDelete = (row) => {
        setRowToDelete(row);
        setShowDeleteConfirmation(true);
    };

    const handleDeleteSelectedRow = (row) => {
        // For deleting the row with corresponding API
        // Here, you can perform any necessary logic to delete the row from your data or state

        // Simulate the API call to delete the row
        // Replace this with your actual API call when available

        // Update the data source by removing the deleted row
        const updatedData = data.filter((item) => item.id !== row.id);
        setDataRow(updatedData);
    }

    const handleDeleteCheckedRows = () => {
        // Simulate the API call to delete the selected rows
        // Replace this with your actual API call when available

        // Update the data source by removing the deleted rows
        const updatedData = data.filter((item) => !selectedRows.includes(item.id));
        setDataRow(updatedData);

        // Clear the selected rows array
        setSelectedRows([]);
    };

    const handleDeleteConfirmation = (rowToDelete) => {
        handleExecuteDelete(rowToDelete);
        setShowDeleteConfirmation(false);
    };

    const handleExecuteDelete = (row) => {
        console.log('row:', row);
        // if(row && row.id)
        // {
        // Check if the table is a subTable
        if (isTableView) {
            // Handle deletion for the main table with individual delete buttons
            handleDeleteSelectedRow(row);
        } else {
            // Handle deletion for the subTable with checkboxes
            setSelectedRows((prevSelectedRows) =>
                prevSelectedRows.filter((selectedRow) => selectedRow !== row)
            );
        }
        // }
        // else{
        //     // The row object is missing the id property
        //     console.error("Invalid row object:", row);
        //     // Handle the error or show an error message to the user
        // }

    }

    const handleCancelDelete = () => {
        setShowDeleteConfirmation(false);
        setRowToDelete(null);
    };



    if (!data || data.length === 0) {
        return <p>No data available.</p>;
    }

    return (
        <div>
            <div>
               
                {/* Show All Details Page */}
                {isTableView && !showAddPage && !viewedRow && (
                    <>
                        <div className="flex justify-end mb-4">
                            {isAdd && (
                                <button
                                    className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded"
                                    onClick={() => setShowAddPage(true)}
                                >
                                    Add
                                </button>
                            )}
                        </div>
                        {subTable && isDelete && (
                            <div className="flex justify-end mb-4">
                                <button
                                    className="px-4 py-2 bg-red-500 text-white rounded"
                                    onClick={handleDeleteCheckedRows}
                                >
                                    Delete Selected
                                </button>
                            </div>
                        )}
                        <div className={`overflow-x-auto ${isTextOverflow ? 'max-w-full' : ''} ${subTable ? 'max-w-full' : ''}`}>
                            <table className="table-auto w-full">
                                <thead className='rounded-t-lg'>
                                    <tr className="bg-gray-200">
                                        {isCheckbox && (
                                            <th className="px-4 py-2 border-b">
                                                {/* Checkbox column header */}
                                            </th>
                                        )}
                                        {columns.map((column, index) => {
                                            if (!column.hidden) {
                                                return (
                                                    <th
                                                        key={index}
                                                        className="px-4 py-2 border-b text-left text-gray-700"
                                                    >
                                                        {column.label}
                                                    </th>
                                                );
                                            }
                                            return null;
                                        })}
                                        <th className="px-4 py-2 border-b w-[300px]">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentData.map((row, index) => (
                                        <tr
                                            key={index}
                                            className={index % 2 === 0 ? 'bg-gray-100 border-b-2 border-gray-300' : 'bg-gray-200 border-b-2 border-gray-300'}
                                        >
                                            {isCheckbox && (
                                                <td className="px-4 py-2 border-b">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedRows.includes(index)}
                                                        onChange={() => handleRowSelection(index)}
                                                    />
                                                </td>
                                            )}
                                            {columns.map((column, columnIndex) => {
                                                if (!column.hidden) {
                                                    return (
                                                        <td
                                                            key={columnIndex}
                                                            className="px-4 py-2 border-b text-gray-700"
                                                        >
                                                            {column.render ? column.render(row) : renderCellValue(row, column)}
                                                        </td>
                                                    );
                                                }
                                                return null;
                                            })}
                                            <td className="px-3 py-1 border-b flex flex-col items-center justify-center gap-y-4">
                                                {isView && (
                                                    <button
                                                        className="px-[26px] py-2 bg-green-500 hover:bg-green-600 text-white rounded ml-2 flex items-center justify-center"
                                                        onClick={() => handleViewDetails(row)}
                                                    >
                                                        View Details
                                                    </button>
                                                )}
                                                {!subTable && isDelete && (
                                                    <>
                                                        <button
                                                            className="px-[20px] py-2 bg-red-500 hover:bg-red-600 text-white rounded ml-2 flex items-center justify-center"
                                                            onClick={() => handleDelete(row)}
                                                        >
                                                            Delete
                                                        </button>
                                                        {/* Delete Confirmation Dialog */}
                                                        {showDeleteConfirmation && (
                                                            <div className="absolute inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
                                                                <div className="bg-white p-6 rounded shadow-lg max-w-2xl">
                                                                    <div className="flex items-center justify-between mb-4">
                                                                        <h2 className="text-lg font-bold">Confirm Deletion</h2>
                                                                        <button
                                                                            className="text-gray-500 hover:text-gray-700"
                                                                            onClick={handleCancelDelete}
                                                                        >
                                                                            <svg
                                                                                className="w-6 h-6"
                                                                                fill="none"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                strokeWidth="2"
                                                                                viewBox="0 0 24 24"
                                                                                stroke="currentColor"
                                                                            >
                                                                                <path d="M6 18L18 6M6 6l12 12" />
                                                                            </svg>
                                                                        </button>
                                                                    </div>
                                                                    <p>Are you sure you want to delete this row?</p>
                                                                    <div className="flex justify-end mt-6">
                                                                        <button
                                                                            className="px-4 py-2 bg-red-500 text-white rounded mr-2"
                                                                            onClick={() => handleDeleteConfirmation(row)}
                                                                        >
                                                                            Delete
                                                                        </button>
                                                                        <button
                                                                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded"
                                                                            onClick={handleCancelDelete}
                                                                        >
                                                                            Cancel
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </>

                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>
                        {/* Pagination */}
                        <div className="flex justify-center mt-4 -z-20">
                            <nav>
                                <ul className="flex space-x-2">
                                    <li
                                        className={`px-3 py-2 bg-gray-200 text-gray-700 cursor-pointer ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                                            }`}
                                        onClick={() =>
                                            handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
                                        }
                                    >
                                        Previous
                                    </li>
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <li
                                            key={index}
                                            className={`px-3 py-2 bg-gray-200 text-gray-700 cursor-pointer ${currentPage === index + 1 ? 'bg-blue-500 text-white' : ''
                                                }`}
                                            onClick={() => handlePageChange(index + 1)}
                                        >
                                            {index + 1}
                                        </li>
                                    ))}
                                    <li
                                        className={`px-3 py-2 bg-gray-200 text-gray-700 cursor-pointer ${currentPage === totalPages
                                            ? 'opacity-50 cursor-not-allowed'
                                            : ''
                                            }`}
                                        onClick={() =>
                                            handlePageChange(
                                                currentPage < totalPages ? currentPage + 1 : totalPages
                                            )
                                        }
                                    >
                                        Next
                                    </li>
                                </ul>
                            </nav>
                        </div>

                    </>
                )}
                {/* Show Add Page */}
                {showAddPage && (
                    <>
                        {/* Add page */}
                        <div className="bg-white p-6 rounded shadow-lg max-w-[1200px]">
                            <h2 className="text-lg font-bold mb-4">Add Item</h2>
                            <form onSubmit={handleAddRow} className="grid grid-cols-2 gap-y-6 gap-x-8">
                                {/* Render input fields for each column */}
                                {columns.map((column, columnIndex) => (
                                    column.label === "ImageSrc" ? "" :
                                    <div key={columnIndex} className="mb-4">
                                        <label className="block mb-2 font-bold">{column.label}</label>
                                        <input
                                            type={(column.field.includes("Rules") || column.field.includes("Image") || column.field.includes("Components"))? "file": "text"}
                                            className="border border-gray-300 px-4 py-2 rounded w-full"
                                            value={newRow[column.field] || ""}
                                            disabled={column.label === 'ID'}
                                            accept={
                                                column.field.includes("Image")
                                                ?"image/*"
                                                :column.field.includes("Rules")
                                                ?".doc, .docx"
                                                : ".xls, .xlsx"
                                            }
                                            onChange={(e) => {
                                                const { value, files } = e.target;
                                                setNewRow((prevRow) => ({
                                                  ...prevRow,
                                                  [column.field]: value,
                                                }));
                        
                                                const previewContainer =
                                                  document.getElementById("previewContainer");
                                                const previewRulesContainer = document.getElementById(
                                                  "previewRulesContainer"
                                                );
                                                const previewComponentsContainer =
                                                  document.getElementById("previewComponentsContainer");
                        
                                                if (image !== null) {
                                                  previewContainer.append(image);
                                                }
                        
                                                if (rule !== null) {
                                                  previewRulesContainer.append(rule);
                                                }
                        
                                                if (component !== null) {
                                                  previewComponentsContainer.append(component);
                                                }
                        
                                                if (files && files.length > 0) {
                                                  const file = files[0];
                                                  const fileType = file.type;
                                                  const reader = new FileReader();
                        
                                                  reader.onload = function (event) {
                                                    if (fileType.startsWith("image/")) {
                                                      // Display image preview
                                                      const preview = document.createElement("img");
                                                      preview.src = event.target.result;
                                                      preview.id = "preview";
                                                      preview.style = "width: 50%"

                                                      if(image !== null )
                                                      {
                                                        previewContainer
                                                            .removeChild(
                                                                document.getElementById("previewContainer").lastElementChild
                                                                )
                                                      }
                        
                                                      // Append preview element to container
                                                      previewContainer.appendChild(preview);
                                                      setImage(preview);
                                                    } else {
                                                      if (
                                                        fileType ===
                                                          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
                                                        fileType === "application/msword"
                                                      ) {
                                                        // Display file icon
                                                        const preview = document.createElement("span");
                                                        preview.className = "file-icon";
                                                        preview.textContent = file.name;

                                                        if(rule !== null )
                                                        {
                                                            previewRulesContainer
                                                                .removeChild(
                                                                    document.getElementById("previewRulesContainer").lastElementChild
                                                                )
                                                        }
                        
                                                        // Append preview element to container
                                                        previewRulesContainer.appendChild(preview);
                                                        setRule(preview);
                                                      } else {
                                                        const preview = document.createElement("span");
                                                        preview.className = "file-icon";
                                                        preview.textContent = file.name;

                                                        if(component !== null )
                                                        {
                                                            previewComponentsContainer
                                                                .removeChild(
                                                                    document.getElementById("previewComponentsContainer").lastElementChild
                                                                    )
                                                        }
                        
                                                        // Append preview element to container
                                                        previewComponentsContainer.appendChild(preview);
                                                        setComponent(preview);
                                                      }
                                                    }
                                                  };
                        
                                                  reader.readAsDataURL(file);
                                                }
                                              }}
                                        />
                                        { column.label.includes("Image") && (
                                            <div className='max-w-[500px] mt-10' id="previewContainer"></div>
                                        )}
                                        { column.label.includes("Rules") && (
                                            <div className='flex flex-col ml-2'>
                                            <div 
                                                className='w-[70px] mt-5'
                                                style={{
                                                    visibility: rule === null? "hidden" : "visible"
                                                }}
                                                >
                                                   <FileIcon extension='docx' {...defaultStyles.docx} />     
                                            </div>
                                            <div 
                                                className='w-[500px] mt-4' 
                                                id="previewRulesContainer">

                                            </div>
                                            </div>
                                        )}
                                        { column.label.includes("Components") && (
                                            <div className='flex flex-col ml-2'>
                                                <div 
                                                className='w-[70px] mt-5'
                                                style={{
                                                    visibility: component === null? "hidden" : "visible"
                                                }}
                                                >
                                                   <FileIcon extension='xls' {...defaultStyles.xlsx} />     
                                                </div>
                                                <div className='w-[500px] mt-4' id="previewComponentsContainer"></div>
                                            </div>
                                           
                                        )}
                                    </div>
                                ))}
                                <div className="col-span-2 flex justify-end">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-green-500 text-white rounded mr-2"
                                        onClick={() => setIsAddConfirmation(true)}
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-red-500 text-white rounded"
                                        onClick={() => setShowAddPage(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </>
                )}
                {/* Show Details Page */}
                {viewedRow && (
                    <div>
                        <div className='flex justify-between mb-[10px]'>
                            <h2 className='font-semibold'>Details</h2>
                            <div className='flex gap-x-5'>
                                {!editMode ? (
                                    <button
                                        className="px-4 py-2 bg-red-500 text-white rounded justify-end"
                                        onClick={() => {
                                            setIsTableView(true);
                                            setViewedRow(null);
                                        }}
                                    >
                                        Return
                                    </button>
                                ) : (
                                    <button
                                        className="px-4 py-2 bg-red-500 text-white rounded justify-end"
                                        onClick={toggleUpdateDetailsClose}
                                    >
                                        Cancel
                                    </button>
                                )}
                                {!editMode && (
                                    <button
                                        className="px-4 py-2 bg-blue-500 text-white rounded justify-end"
                                        onClick={toggleUpdateMode}
                                    >
                                        Update
                                    </button>
                                )}
                            </div>
                        </div>
                        {viewedRow && (
                            <div className="bg-white p-10 mt-4 rounded-md">
                                <div className="grid grid-cols-2 gap-4">
                                    {columns.map((column, columnIndex) => {
                                        if (column.field !== 'BoardgameComponents' && column.field !== 'BoardgameRules') {
                                            return (
                                                <div key={columnIndex} className="mb-4 ml-6">
                                                    {column.label !== "ImageSrc" ?
                                                    <>
                                                        <label className="block mb-2 font-bold">{column.label}</label>
                                                    </>    : ""
                                                }
                                                    
                                                    {editMode ? (
                                                        <>
                                                            {column.label.includes('Status') && (
                                                                <select
                                                                    className="border border-gray-300 p-2 rounded w-full"
                                                                    disabled={column.label === 'ID'}
                                                                    onChange={(e) => handleInputChange(column.field, e.target.value)}
                                                                    value={formData[column.field]}
                                                                >
                                                                    {/* Dropdown options */}
                                                                    {/* Replace the options below with your actual options */}
                                                                    <option>Pending</option>
                                                                    <option>Complete</option>
                                                                </select>
                                                            )}
                                                            {column.label.includes('Tag') && (
                                                                <select
                                                                    className="border border-gray-300 p-2 rounded w-full"
                                                                    disabled={column.label === 'ID'}
                                                                    onChange={(e) => handleInputChange(column.field, e.target.value)}
                                                                    value={formData[column.field]}
                                                                >
                                                                    {/* Dropdown options */}
                                                                    {/* Replace the options below with your actual options */}
                                                                    <option>Economy</option>
                                                                    <option>Strategy</option>
                                                                    <option>Family</option>
                                                                    <option>Economy</option>
                                                                    <option>Strategy</option>
                                                                    <option>Family</option>
                                                                </select>
                                                            )}
                                                            {!column.label.includes('Status') && !column.label.includes('Tag') && !column.label.includes('ImageSrc') && (
                                                                <input
                                                                    className="border border-gray-300 p-2 rounded w-full"
                                                                    type={column.label === 'Image' ? 'file' : 'text'}
                                                                    disabled={column.label === 'ID'}
                                                                    onChange={(e) => {
                                                                        if (column.label !== 'Image') {
                                                                            handleInputChange(column.field, e.target.value);
                                                                        } else {
                                                                            const file = e.target.files[0];
                                                                            handleFileChange(column.field, file);
                                                                        }
                                                                    }}
                                                                    maxLength={MAX_INPUT_LENGTH}
                                                                    value={(column.label === 'Image' || column.label === 'Tag') ? "" : formData[column.field]}
                                                                />
                                                            )}
                                                        </>
                                                    ) : (
                                                        <>
                                                                {column.label !== "ImageSrc" ?
                                                                    <>
                                                                        <span className="font-normal">{(column.label === "State") ? (viewedRow[column.field] ? "Active" : "Banned") : viewedRow[column.field]}</span>
                                                                    </> : ""
                                                                }
                                                        </>
                                                    )}
                                                </div>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>
                                {viewedRow.BoardgameRules &&(
                                    <div className="mb-7 ml-6">
                                        <label className="block mb-2 font-bold">Rules</label>
                                        {viewedRow.BoardgameRules}
                                    </div>
                                )}
                                {viewedRow.BoardgameComponents && (
                                    <div className="mb-4 ml-6">
                                        <label className="block mb-2 font-bold">Components</label>
                                        {viewedRow.BoardgameComponents}
                                    </div>
                                )}
                            </div>
                        )}

                        {editMode && (
                            <div className="flex justify-end mt-4">
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded justify-end"
                                    onClick={handleSaveUpdateChanges}
                                >
                                    Save
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>



            {/* Update Confirmation Modal */}
            {updateModal && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-75">
                    <div className="bg-white p-6 rounded shadow-lg max-w-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold">Confirm Update</h2>
                            <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={openUpdateModalConfirmation}
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <p>Changes to the data has been saved.</p>
                        <div className="flex justify-end mt-6">
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded mr-2"
                                onClick={closeUpdateModalConfirmation}
                            >
                                Close
                            </button>

                        </div>
                    </div>
                </div>
            )}



            {isAddConfirmation && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-75">
                    <div className="bg-white p-6 rounded shadow-lg max-w-2xl w-full">
                        <h2 className="text-lg font-bold mb-4">Adding Confirmation</h2>
                        <p>The data has been added successfully.</p>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                                onClick={() => {
                                    setShowAddPage(false)
                                    setIsAddConfirmation(false)
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

Table.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            field: PropTypes.string.isRequired,
            hidden: PropTypes.bool,
        })
    ).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    onAdd: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onView: PropTypes.func.isRequired,
    isDelete: PropTypes.bool.isRequired,
    isUpdate: PropTypes.bool.isRequired,
    isView: PropTypes.bool.isRequired,
    isAdd: PropTypes.bool.isRequired
};

export default Table;