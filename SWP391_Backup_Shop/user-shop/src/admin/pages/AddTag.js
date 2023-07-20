import React, {useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import {
  postGameTagsAPI,
} from "../../api/adminAPI";

const AddTag = () => {
  const navigate = useNavigate();
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
          navigate("/admin/tags")
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div>
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
              }}
            >
              Add
            </button>
            <button
              className="bg-red-500 px-4 py-2 rounded-md w-[120px] text-[16px]"
              onClick={() => navigate("/admin/tags")}
            >
              Cancel
            </button>
          </form>
        </div>
    </div>
  )
}

export default AddTag
