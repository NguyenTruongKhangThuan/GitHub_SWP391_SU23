import React, {useEffect, useState} from 'react'
import Table from './Table';
import { getOwnerAPI, postOwnersAPI, putOwnersAPI } from '../../api/adminAPI';
import AdminAccount from './AdminAccount';

const getToken = sessionStorage.getItem("accountToken");

const StateTag = () => {
    
}

const Owner = () => {
    const columns = [
        {label: "ID", field: "ownerId"},
        {label: "Name", field: "ownerName"},
        {label: "Email", field: "email"},
        {label: "Phone Number", field: "phoneNumber"},
        {label: "Password", field: "password"},
        {label: "State", field: "status", hidden: true, hiddenPopUp: false}
    ];

    useEffect(()=> {
        refreshOwnerList();
    }, [])

    const refreshOwnerList = async() => {
        await getOwnerAPI(getToken)
        .then((data) => setOwners(data)).catch((error) => console.log(error));
    }

    const [owners, setOwners] = useState([]);

    const handleDeleteOwner = (owner) => {
        const updatedOwners = owners.filter((u) => u.ID !== owner.ID);
        setOwners(updatedOwners);
    }

    const addOrEditOwner = (formData) => {
        if(formData.get("ownerId") === "0"){
            //Token insert into empty string
            postOwnersAPI(getToken ,formData)
            .then((res) =>{
                refreshOwnerList();
            }
                
            ).catch(
                (error) => console.log(error)
            ) 
        }
        else {
            putOwnersAPI(getToken ,formData)
            .then((res) => {
                refreshOwnerList()
            }).catch((error) => console.log(error))
        }
    }

    const handleUpdateOrAddOwner = (owners) => {
        //Create formData and then append all fields of the table
        const formData = new FormData();
        formData.append("ownerId", owners.ownerId);
        formData.append("ownerName", owners.ownerName);
        formData.append("ownerEmail", owners.email);
        formData.append("ownerPhoneNumber", owners.phoneNumber);
        formData.append("ownerPassword", owners.password);
        formData.append("status", owners.status);

        //Call API
        addOrEditOwner();
    }

    return (
        <div>
        <h1 className='mt-[20px] mb-[30px] font-bold text-2xl'>Publishers Management</h1>
            
            <Table 
                columns={columns}
                data={owners}
                onDelete={handleDeleteOwner}
                onUpdate={handleUpdateOrAddOwner}
                onAdd={handleUpdateOrAddOwner}
                isView
                isAdd
                isUpdate
            />
        </div>
    )
}

export default Owner
