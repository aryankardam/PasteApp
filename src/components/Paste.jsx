import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes, shareFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { NavLink } from "react-router";
import { FaEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaCopy } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";
import { format } from 'date-fns';

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  // Pass the paste's _id to shareFromPastes via dispatch
  function handleShare(pasteId) {
    dispatch(shareFromPastes(pasteId));
  }

  const truncateContent = (content, wordLimit = 20) => {
    const words = content.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return content;
  };
  

  return (
    <div>
      <input
        className="p-2 rounded-2xl min-w-[600px] mt-5 bg-black"
        type="search"
        placeholder="search here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-col gap-5 mt-5 border p-2">
        <h1 className=" flex place-content-start ">All Pastes</h1>
        {filteredData.length > 0 &&
          filteredData.map((paste) => (
            <div
              className="border flex place-content-between gap-4 p-2.5"
              key={paste._id}
            >
              <div>
                <div className="italic font-[800] flex place-content-start">{paste.title}</div>
                <div className="font-light flex place-content-start"> {truncateContent(paste.content)}</div>
              </div>
              <div>
                <div className="flex flex-row gap-1 place-content-evenly">
                  <button>
                    <NavLink to={`/?pasteId=${paste?._id}`}>
                      <FaEdit size={16} className="text-white" />
                    </NavLink>
                  </button>
                  <button className={""}>
                    <NavLink to={`/pastes/${paste?._id}`}>
                      <FaEye size={16} className="text-white" />
                    </NavLink>
                  </button>
                  <button onClick={() => handleDelete(paste._id)}>
                    <FaTrash size={16} />
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste.content);
                      toast.success("Content copied to clipboard");
                    }}
                  >
                    <FaCopy size={16}  />
                  </button>
                  <button onClick={() => handleShare(paste._id)}>
                    <FaShareAlt size={16} />
                  </button>
                </div>
                <div>{format(new Date(paste.createdAt), 'yyyy-MM-dd')}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Paste;
