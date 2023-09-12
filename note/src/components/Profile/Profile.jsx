import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateUser() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isPasswordModified, setIsPasswordModified] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const getUserById = async () => {
      const { data } = await axios.get(`/api/users/${id}`);
      setName(data.name);
      setEmail(data.email);
      setPassword(data.password);
      setIsPasswordModified(false); 
    };
    getUserById();
  }, [id]);

  const updatehandleInput = async (e) => {
    e.preventDefault();

    const data = {
      name: name,
      email: email,
    };

    if (isPasswordModified) {
      data.password = password;
    }

    await axios.put(`/api/users/${id}`, data);
    navigate('/home');
  };
 
  
   

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
       

    <h1 
      className='text-4xl font-bold bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text'
    >
      Update User
    </h1>
    <div className='flex flex-col border-none items-center justify-center shadow-xl shadow-black/20 p-4 rounded-lg m-6 relative  w-fit max-w-sm'>
      <form  className='flex flex-col  m-6' onSubmit={updatehandleInput}>
        <div className='flex flex-col m-3'>
          <label className=' font-bold w-fit text-2xl'>Name</label>
          <input  
            className='w-64 px-2 py-1 border rounded-lg m-2 text-teal-400 text-xl' 
            type='text' 
            placeholder='Enter Last Name' 
            onChange={(e) => setName(e.target.value)} 
            value={name} 
          />
        </div>
      
        <div className='flex flex-col m-3'>
          <label className=' font-bold w-fit text-2xl'>Email</label>
          <input  
            className='w-64 px-2 py-1 border rounded-lg m-2 bg-gray-100 text-teal-400 text-xl' 
            type='email' 
            placeholder='Enter Email' 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
          />
        </div>

        <div className='flex flex-col m-3'>
          <label className='m- font-bold w-fit text-2xl'>Password</label>
          <input
            className='w-64 px-2 py-1 border rounded-lg m-2 text-teal-400 text-xl'
            type='password'
            placeholder='Enter Password'
            onChange={(e) => {
              setPassword(e.target.value);
              setIsPasswordModified(true);
            }}
          />        
        </div>

        <div className='flex items-center justify-center'>
          <button 
            className='rounded-lg text-2xl font-bold bg-gray-400 w-60 text-center flex items-center justify-center hover:bg-green-400 p-2'
          >
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
  );
}
