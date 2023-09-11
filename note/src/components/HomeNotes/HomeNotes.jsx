import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';


export default function AllBooks() {
  const [notes, setNotes] = useState([]);
  const navigate =useNavigate()

  const decryptData = (encryptedData, secretKey) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  };
  
const secretKey = process.env.REACT_APP_ENCRYPT_KEY;

  useEffect(()=>{
    const encryptedAccessToken = localStorage.getItem('accessToken');
    const accessToken = decryptData(encryptedAccessToken, secretKey);

    if (!accessToken) {
      throw new Error('Access token not found');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    axios.get('/api/notes', config)
      .then((response) => {
        const notesData = response.data;
        setNotes(notesData); 
        if (notesData.length === 0) {
          console.log('No notes found');
        }

        if (response.data.data === "Token Expired") {
          alert("Expired Session");
          window.localStorage.clear();
          window.location.href = "./sign-in";
        }
      })
      .catch((error) => {
        console.log('Error fetching data:', error);
      });
  },[])
  
  const handleClick=(()=>{
    navigate('/home')
  })
  const handleClick2=(()=>{
    navigate('/addNote')
  })

  const handleDelete = async(id)=>{
    const encryptedAccessToken = localStorage.getItem('accessToken');
    const accessToken = decryptData(encryptedAccessToken, secretKey);
        if (!accessToken) {
          throw new Error('Access token not found');
        }
        const confirmDelete = window.confirm('Are you sure you want to delete ?');

        if(confirmDelete){
          const config = {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          };
          await axios.delete(`/api/notes/${id}`,config)
          window.location.reload()
        }
        }


        
     

      const getFontSize = (text) => {
        const textLength = text.length;
        if (textLength < 50) {
          return 'text-lg'; 
        } else if (textLength < 100) {
          return 'text-md'; 
        } else {
          return 'text-sm'; 
        }
      };
      const getChangeColor = (category) => {
        switch (category) {
          case 'work':
            return 'text-green-500';
          case 'personal':
            return 'text-red-500';
          default:
            return '';
        }
      };
    
  

  return (
    <div className='w-full min-h-screen bg-gradient-to-b from-gray-500 via-gray-600 to-gray-800'>
      {notes.length ==0 ? 
      (
            <h2 className='flex items-center justify-center text-5xl  font-bold'>No Notes Found</h2>
      ):(
        <h2 className='flex items-center justify-center text-5xl  font-bold'>Notes</h2>
        )}

    <button onClick={handleClick2} className="btn  w-16 h-16 rounded-2xl  flex flex-col items-center justify-center  ">
      <p className='text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-cyan-500 to-blue-500 text-2xl font-bold '>ADD</p>
    <svg viewBox="0 0 17.503 15.625" className="icon w-24 h-24 transform transition-transform hover:scale-125 "> 
    <path className="fill-current transition-fill hover:fill-pink-500" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" ></path>
    </svg>
    <span class="absolute text-white text-xs opacity-0 invisible transition-opacity hover:opacity-100 top-6">like</span>
  </button>
  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-4'>
    {notes.length !==0 ? (
      notes.map((note) => (
        <div key={note._id} style={{ marginBottom: '20px' }} className='m-6'>
          <div className="flex h-fit items-center justify-center ">
          <div className="group h-96 w-full sm:w-full md:w-full lg:w-full xl:w-96 [perspective:1000px]">
              <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-200 rounded-xl">
                  <h1 className={'font-bold text-3xl'}>{note.title}</h1>
                  <h1 className={`font-bold text-3xl ${getChangeColor(note.category)}`}>{note.category}</h1>
                </div>
                <div className="absolute inset-0 h-full w-full rounded-xl bg-black/80 px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  <div className="flex min-h-full flex-col items-center justify-center">
                    <p className={`text-justify ${getFontSize(note.description)}`}>{note.description}</p>
                    <div className='flex items-center justify-between gap-3 mt-2' >
                      <button
                       className="mt-1 rounded-md bg-neutral-800 py-1 px-2 text-sm hover:bg-neutral-900 ">
                        <Link to={`update/${note._id}`}>Update</Link>
                      </button>
                      <button 
                        onClick={() => handleDelete(note._id)}
                        className="mt-1 rounded-md bg-neutral-800 py-1 px-2 text-sm hover:bg-neutral-900">Delete</button>
                    </div>               
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))) :(
        "" )}
    </div>
    <div className='flex items-center justify-center text-5xl bg-'>
    <button 
      onClick={handleClick}
      className="bg-transparent hover:bg-blue-500 text-blue-200 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mb-4"
    >
      Go Back
    </button>
    

    </div>

  </div>
);
}