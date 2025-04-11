import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import { useEffect } from 'react';

const Home = () => {
  const [title,setTitle] =useState('');
  const [value,setValue] =useState('');
  const [searchParams,setSearchParams] =useSearchParams();
  const pasteID = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state)=> state.paste.pastes);

  function createPaste(){
    const paste = {
      title : title,
      content : value,
      _id : pasteID || Date.now().toString(36),
      createdAt : new Date().toISOString(),
    }
    if(pasteID){
      //update
      dispatch(updateToPastes(paste));
    }
    else{
      //create
      dispatch(addToPastes(paste));
    }

    //after creation or updation 
    setTitle('');
    setValue('');
    setSearchParams({});
 
  }

  useEffect(() => {
    console.log("inside use effect")
    if(pasteID){
      const paste = allPastes.find((p)=>p._id === pasteID);
      console.log("pageFound")
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteID])

  return (
    <div>
     <div className='flex flex-row gap-7 place-content-between'>
      <input
        className='p-2 rounded-2xl bg-black w-[69%]'
        type='text'
        placeholder='Enter Title here'
        value={title}
        onChange={(e)=> setTitle(e.target.value)}
     />
       <button 
          className='p-2 rounded-2xl '
          onClick={createPaste}
          type='text'>
          {
            pasteID ? "Update  My Paste" : "Create My Paste"
          }
         </button>
     </div>

     <div className='mt-8'>
      <textarea 
        className= "rounded-2xl mt-4 bg-black min-w-[600px] p-4"
        value={value}
        placeholder='Enter Content Here'
        onChange={(e)=>setValue(e.target.value)}
        rows={20}

      />
     </div>
    </div>
  )
}

export default Home
