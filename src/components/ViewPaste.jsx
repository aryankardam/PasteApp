import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import { useEffect } from "react";
import toast from "react-hot-toast"; 
import { FaCopy } from "react-icons/fa";

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.filter((p) => p._id === id)[0];
  console.log("Final paste :", paste);

  return (
    <div>
      <div className="flex flex-row gap-5 place-content-between">
        <input
          className="p-2 rounded-2xl bg-black min-w-[560px] "
          type="text"
          placeholder="Enter Title here"
          value={paste.title}
          disabled
          onChange={(e) => setTitle(e.target.value)}
        />
        <button 
        className="h-12"
        onClick={() => {
          navigator.clipboard.writeText(paste?.title || "");
          toast.success("Content copied to clipboard");

        }}
        >
         <FaCopy size={16} />
        </button>
      </div>

      <div className="flex flex-row mt-8">
        <textarea
          className="rounded-2xl mt-4 bg-black min-w-[580px] p-4"
          value={paste.content}
          disabled
          placeholder="Enter Content Here"
          onChange={(e) => setValue(e.target.value)}
          rows={20}

          
        />
        <button 
        className="h-12"
        onClick={() => {
          navigator.clipboard.writeText(paste?.content || "");
          toast.success("Content copied to clipboard");

        }}
        >
          <FaCopy size={16} />
        </button>
        
      </div>
    </div>
  );
};

export default ViewPaste;
