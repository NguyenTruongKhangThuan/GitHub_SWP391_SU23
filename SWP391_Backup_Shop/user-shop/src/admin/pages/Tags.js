import React, { useState, useEffect } from "react";
import {
  getGameTagsAPI,
  postGameTagsAPI,
  putGameTagsAPI,
  deleteGameTagsAPI,
} from "../../api/adminAPI";

const Tags = () => {
  const [gameTags, setGameTags] = useState([]);

  const [openAddForm, setOpenAddForm] = useState(false);
  const [openDetailsForm, setOpenDetailsForm] = useState(false);
  const [openUpdateForm, setOpenUpdateForm] = useState(false);

  const toggleAddForm = () => {
    setOpenAddForm(!openAddForm);
  };

  const toggleViewDetailsForm = () => {
    setOpenDetailsForm(!openDetailsForm);
  };

  const toggleUpdateForm = () => {
    setOpenUpdateForm(!openUpdateForm);
  };

  const toggleViewDetailsOrUpdate = () => {
    if (openDetailsForm) setOpenUpdateForm(false);
    else setOpenUpdateForm(true);
  };

  useEffect(() => {
    refreshGameTagsList();
  }, []);

  const refreshGameTagsList = async () => {
    await getGameTagsAPI(sessionStorage.getItem("accountToken"))
      .then((data) => setGameTags(data))
      .catch((error) => console.log(error));
  };

  //Create new tag
  const [addedTagName, setAddedTagName] = useState();
  const addTag = (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("gameTagId", "temp");
    formData.append("gameTagName", addedTagName);

    if (addedTagName) {
      postGameTagsAPI(sessionStorage.getItem("accountToken"), formData)
        .then((res) => {
          window.alert(res);
          refreshGameTagsList();
        })
        .catch((err) => console.log(err));
    }
  };

  //Update Tag
  const [tag, setTag] = useState();

  const [updatedTagName, setUpdatedTagName] = useState();

  const updateGameTag = (e) => {
    // e.preventDefault();
    var formData = new FormData();
    formData.append("gameTagId", tag.gameTagId);
    formData.append("gameTagName", updatedTagName);

    if (updatedTagName) {
      putGameTagsAPI(sessionStorage.getItem("accountToken"), formData)
        .then((res) => {
          window.alert(res);
          refreshGameTagsList();
        })
        .catch((err) => console.log(err));
    }
  };

  //delete tag
  const [deleteTag, setDeleteTag] = useState();
  const deleteGameTag = (e) => {
    if (deleteTag) {
      deleteGameTagsAPI(
        sessionStorage.getItem("accountToken"),
        deleteTag.gameTagId
      )
        .then((res) => {
          window.alert(res);
          refreshGameTagsList();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <h2>Tags Management</h2>
        <button
          className="bg-blue-500 flex justify-center w-[120px] p-2 rounded-md"
          onClick={toggleAddForm}
        >
          Add
        </button>
      </div>
      <table className="mt-[10px]">
        <thead>
          <tr className="text-[16px]">
            <th className="border-[2px] border-gray-500 pr-5 px-3">Tag ID</th>
            <th className="border-[2px] border-gray-500 pr-5 px-3">Tag Name</th>
            <th className="border-[2px] border-gray-500 pr-5 px-3" colSpan={3}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-200">
          {gameTags.map((gameTag, index) => (
            <tr
              className={`${
                index % 2 === 0 ? "bg-gray-100" : "bg-gray-300"
              } text-[16px]`}
            >
              <td className="border-[2px] border-gray-500 pr-5 pl-2">
                {gameTag.gameTagId}
              </td>
              <td className="border-[2px] border-gray-500 pr-5 pl-2">
                {gameTag.gameTagName}
              </td>
              <td className="border-l-[2px] border-b-[2px] border-r-none border-gray-500 pr-5 pl-2">
                <button
                  className="bg-green-400 hover:bg-green-600 w-[160px] p-4 text-[18px] font-bold rounded-md"
                  onClick={() => {
                    toggleViewDetailsForm();
                    setTag(gameTag);
                  }}
                >
                  View Details
                </button>
              </td>
              {/* <td className="border-b-[2px] border-gray-500 pr-5 pl-2">
                <button className="bg-yellow-400 hover:bg-yellow-500 w-[160px] p-4 text-[18px] font-bold rounded-md">
                  Update
                </button>
              </td> */}
              <td className="border-r-[2px] border-b-[2px] border-gray-500 pr-5 pl-2">
                <button
                  className="bg-red-400 hover:bg-red-500 w-[160px] p-4 text-[18px] font-bold rounded-md"
                  onClick={(e) => {
                    setDeleteTag(gameTag);
                    deleteGameTag(e);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {openAddForm && (
        <div className="flex justify-center">
          <form className="w-[840px]">
            <div className="flex flex-col w-[400px]">
              <div className="flex flex-col mt-4">
                <label className="mb-3">Tag Name</label>
                <input
                  type="text"
                  id=""
                  placeholder=""
                  className="p-2 rounded-md"
                  onChange={(e) => setAddedTagName(e.target.value)}
                />
              </div>
            </div>
            <button
              className="bg-green-500 px-4 py-2 rounded-md w-[120px] text-[16px]"
              onClick={(e) => {
                addTag(e);
                toggleAddForm();
              }}
            >
              Add
            </button>
            <button
              className="bg-red-500 px-4 py-2 rounded-md w-[120px] text-[16px]"
              onClick={toggleAddForm}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
      {openDetailsForm && tag && (
        <div className="flex justify-center">
          <form className="w-[840px]">
            <div className="flex flex-col w-[400px]">
              <div className="flex flex-col mt-4">
                <label className="mb-3">Tag Name</label>
                <input
                  type="text"
                  id=""
                  placeholder=""
                  className="p-2 rounded-md"
                  defaultValue={tag.gameTagName}
                  onChange={(e) => setUpdatedTagName(e.target.value)}
                />
              </div>
            </div>
          </form>
          <button
            className="bg-yellow-500 px-4 py-2 rounded-md w-[140px] text-[16px]"
            onClick={(e) => {
              toggleViewDetailsOrUpdate();
              updateGameTag(e);
            }}
          >
            Update Tag
          </button>
          <button
            className="bg-red-500 px-4 py-2 rounded-md w-[120px] text-[16px]"
            onClick={toggleViewDetailsForm}
          >
            Cancel
          </button>
        </div>
      )}
      {openUpdateForm && (
        <div className="flex justify-center">
          <form className="w-[840px]">
            <div className="flex flex-col w-[400px]">
              <div className="flex flex-col mt-4">
                <label className="mb-3">Tag Name</label>
                <input
                  type="text"
                  id=""
                  placeholder=""
                  defaultValue={tag.gameTagName}
                  className="p-2 rounded-md"
                />
              </div>
            </div>
            <button className="bg-yellow-500 px-4 py-2 rounded-md w-[140px] text-[16px]">
              Update Tag
            </button>
            <button
              className="bg-red-500 px-4 py-2 rounded-md w-[120px] text-[16px]"
              onClick={toggleViewDetailsForm}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Tags;
