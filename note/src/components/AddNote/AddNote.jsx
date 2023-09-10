import React, { useEffect, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAddNoteMutation } from '../../slices/notesApiSlice';
import axios from 'axios'



const AddNote = () => {
  const maxWords = 70;
    const dispatch = useDispatch();
    const [addNote, { isLoading }] = useAddNoteMutation();
    const { userInfo } = useSelector((state) => state.auth);


    const [title, setTitle] = useState("");
    const [description,setDescription] = useState("")
    const [category,setCategory] = useState("")

    const navigate = useNavigate()
  
    const handleWordLength = (e) => {
      const inputText = e.target.value;
      const words = inputText.split(/\s+/);
      if (words.length <= maxWords) {
        setDescription(inputText);
      }
    };
    
    useEffect(() => {
        if (userInfo) {
        }
      }, [navigate, userInfo]);
    
     
    const handleSubmit=async(e)=>{
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
      const {data} = await axios.post('/api/notes/addnote',{
          title:title,
          description:description,
          category:category
      },config)
      navigate('/notes')
      console.log(data)
  }
  return (
    <div 
        className='
            flex 
            justify-center 
            items-center 
            h-screen    
            w-full 
            bg-gradient-to-b from-gray-500  via-gray-600 to-gray-800 
            tracking-wide'
    >
        <div className=' shadow-2xl shadow:black bg-slate-300 p-4 rounded-lg '>
        <div >
            <div className='flex flex-col items-center justify-center'>
                <div>
                    <h1 
                        className='text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-cyan-500 to-blue-500 font-bold lg:text-4xl md:text-3xl text-4xl text-center m-4'
                    >Add Note
                    </h1>
                </div>
                
            </div>           
            <form className='flex flex-col w-full rounded-lg' onSubmit={handleSubmit}>

                <div className='flex flex-col m-3'>
                    <label className='m- font-bold w-fit'>Title</label>
                    <input 
                        type='title' 
                        placeholder='Enter your title' 
                        className='w-250 px-4 py-2 border rounded-lg'
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        />
                         
                </div>
                <div className='flex flex-col m-3'>
                    <label className='m- font-bold w-fit'>Description</label>
                    <textarea 
                        type='text' 
                        placeholder='Enter your Desc..' 
                        className='w-250 px-4 py-2 border rounded-lg'
                        required
                        value={description}
                        onChange={handleWordLength}
                        />
                        <p className="text-gray-500 text-sm items-center flex justify-center font-bol">
                          {description.split(/\s+/).length} / {maxWords} words
                        </p>
                </div>
                <div className='flex items-center justify-center w-full mt-3  '>
                  <select
                    className={`border rounded-lg text-xl text-center font-medium text-black p-2 `}
                    value={category}
                    required
                    onChange={(e)=>setCategory(e.target.value)}
                  >
                    <option  value=''>Select Category</option>
                    <option className='text-teal-400 font-bold' value='personal'>personal</option>
                    <option className='text-teal-400 font-bold' value='work'>work</option>
                  </select>
                </div>
                <div className='flex items-center justify-center w-100 m-6 flex-col'>
                    <button 
                    type="submit" 
                    className=' rounded-lg text-2xl font-bold bg-green-400 hover:bg-rose-400 w-60 text-center p-2' 
                    >
                    Submit  
                    </button>
                    <p className=' flex items-center justify-center  gap-2 rounded-lg text-xl font-bold p-2 bg-green-400 m-2  w-fit text-center  hover:bg-rose-200 h-fit'>
                    <Link className='flex items-center justify-center' to='/register' >Not have an Account?</Link>
                </p>
                </div>
                
            </form>
        </div>
    </div>
    </div>
 
  )
}

export default AddNote