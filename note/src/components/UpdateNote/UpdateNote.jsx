import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CryptoJS from 'crypto-js';

export default function UpdateNote() {
    const {id} = useParams()

    const[title,setTitle] = useState('')
    const[description,setDescription] = useState('')
    const [category,setCategory] = useState("")

    const navigate = useNavigate()
    const maxWords = 70;

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
        const getDatabyId = async()=>{
            const {data}= await axios.get(`/api/notes/${id}`,config)
            setTitle(data.title)
            setDescription(data.description)
            setCategory(data.category)
            console.log(data)
        }

        getDatabyId()
    },[id])

    const handleWordLength = (e) => {
        const inputText = e.target.value;
        const words = inputText.split(/\s+/);
        if (words.length <= maxWords) {
          setDescription(inputText);
        }
      };
    const updatehandleInput = async(e)=>{
        e.preventDefault()
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          throw new Error('Access token not found');
        }
    
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const data ={
          title:title,
          description:description
        }
        await axios.put(`/api/notes/${id}`,data,config)
        navigate('/notes');
      }

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-500 via-gray-600 to-gray-800'>
        
      <h1 className='text-4xl text-green-400 m-4 relative '>Update Note</h1>
      <div className='flex items-center justify-center ' >
        
        <form  className='flex flex-col bg-gray-300 rounded-2xl w-full  h-96 justify-center px-4 ' onSubmit={updatehandleInput}>
            <div className='flex flex-col m-3'>
            <label className=' font-bold w-fit'>Title</label>
            <input 
              className='w-150 px-2 py-1 border rounded-lg '
              type='text' 
              placeholder='Enter Title' 
              onChange={(e)=>setTitle(e.target.value)} 
              value={title}
            />
            </div>

            <div className='flex flex-col m-3'>
            <label className=' font-bold w-fit'>Description</label>
            <input 
              type='text'
              className='w-150 px-2 py-1 border rounded-lg' 
              placeholder='description'  
              onChange={handleWordLength} 
              value={description}/>
               <p className="text-gray-500 text-sm items-center flex justify-center font-bol">
                    {description.split(/\s+/).length} / {maxWords} words
                </p>
            </div>

            <div className='flex items-center justify-center w-full mt-3  '>
                  <select
                    className={`border rounded-lg text-xl text-center font-medium text-black p-2 `}
                    value={category}
                    onChange={(e)=>setCategory(e.target.value)}
                  >
                    <option  value=''>Select Category</option>
                    <option className='text-teal-400 font-bold' value='personal'>personal</option>
                    <option className='text-teal-400 font-bold' value='work'>work</option>
                  </select>
                </div>
           
              <div className='flex items-center justify-center'>
              <button 
              className='rounded-lg text-2xl font-bold bg-gray-400 w-60 m-4 text-center flex items-center justify-center hover:bg-gray-600 h-15'
              >Update</button>
              </div>
            
        </form>
        </div>
    </div>
  )
}
