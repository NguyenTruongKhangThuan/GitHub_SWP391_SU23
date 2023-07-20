import React, { useState, useEffect } from "react";
import {
  getGameTagsAPI,
  postGameTagsAPI,
  putGameTagsAPI,
  deleteGameTagsAPI,
} from "../../api/adminAPI";
import { useNavigate } from "react-router-dom";
import AdminAccount from "../components/AdminAccount";

const Tags = () => {
  const [gameTags, setGameTags] = useState([]);
  const navigate = useNavigate();

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
          toggleAddForm();
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

  //Dropdown
  const Dropdown = ({ tag }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    return (
      <div className="relative">
        <button
          className="bg-gray-500 hover:bg-gray-600 px-4 py-2 text-white font-bold rounded-md"
          onClick={toggleDropdown}
        >
          Actions
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-50">
            <button
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
              onClick={() => {
                toggleViewDetailsForm();
                setTag(tag);
              }}
            >
              View Details
            </button>
            <button
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
              onClick={(e) => {
                setDeleteTag(tag);
                deleteGameTag(e);
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-end p-4">
        <AdminAccount />
      </div>
      <div className="p-20">
        <div className="flex justify-center gap-x-[120px]">
          <h2 className="font-bold text-2xl">Tags Management</h2>
          <button
            className="bg-blue-500 flex justify-center font-bold w-[120px] p-2 rounded-md"
            onClick={toggleAddForm}
          >
            Add
          </button>
        </div>
        <div className="flex justify-center">
          <table className="mt-[10px]">
            <thead>
              <tr className="text-[16px]">
                <th className="border-l-[2px] border-t-[2px] border-b-[2px] border-gray-500 pr-5 px-3">
                  Tag ID
                </th>
                <th className="border-t-[2px] border-b-[2px] border-gray-500 pr-5 px-3">
                  Tag Name
                </th>
                <th className="border-r-[2px] border-t-[2px] border-b-[2px] border-gray-500 pr-5 px-3"></th>
              </tr>
            </thead>
            <tbody className="bg-gray-200">
              {gameTags.map((gameTag, index) => (
                <tr
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                  } text-[16px] w-fit`}
                >
                  <td
                    className={`${
                      gameTags[gameTags.length - 1].gameTagId ===
                      gameTag.gameTagId
                        ? "border-b-[2px]"
                        : ""
                    } border-l-[2px] border-gray-500 pr-5 p-4`}
                  >
                    <p className="p-2">{gameTag.gameTagId}</p>
                  </td>
                  <td
                    className={`${
                      gameTags[gameTags.length - 1].gameTagId ===
                      gameTag.gameTagId
                        ? "border-b-[2px]"
                        : ""
                    } border-gray-500 pr-5 p-4`}
                  >
                    <p className="p-2">{gameTag.gameTagName}</p>
                  </td>
                  <td
                    className={`${
                      gameTags[gameTags.length - 1].gameTagId ===
                      gameTag.gameTagId
                        ? "border-b-[2px]"
                        : ""
                    } border-r-[2px] border-gray-500 pr-5 p-4`}
                  >
                    <div className="flex justify-center p-2">
                      <Dropdown tag={gameTag} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {openAddForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-gray-200 p-6 rounded-md w-[840px]">
            <form>
              <div className="flex flex-col w-[400px]">
                <div className="flex flex-col mt-4">
                  <label className="mb-3">Tag Name</label>
                  <input
                    type="text"
                    id=""
                    placeholder=""
                    value={addedTagName}
                    className="p-2 rounded-md border-gray-900"
                    onChange={(e) => setAddedTagName(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  className="bg-green-500 px-4 py-2 rounded-md font-bold w-[120px] text-[16px]"
                  onClick={addTag}
                >
                  Add
                </button>
                <button
                  className="bg-red-500 px-4 py-2 rounded-md font-bold w-[120px] text-[16px]"
                  onClick={toggleAddForm}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {openDetailsForm && tag && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-gray-200 p-6 rounded-md w-[840px]">
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
                      value={tag.gameTagName}
                      readOnly
                      onChange={(e) => setUpdatedTagName(e.target.value)}
                    />
                  </div>
                </div>
              </form>
              <button
                className="bg-red-500 hover:bg-red-600 py-2 px-4 rounded-md w-[240px] font-bold text-[16px]"
                onClick={toggleViewDetailsForm}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tags;
