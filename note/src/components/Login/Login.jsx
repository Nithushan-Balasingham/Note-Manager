import React, {useEffect, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../../slices/usersApiSlice';
import { setCredentials } from '../../slices/authSlice';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';




const Login = () => {
    const dispatch = useDispatch();
    const [login, { isLoading }] = useLoginMutation();
    const { userInfo } = useSelector((state) => state.auth);
    const [visible, setVisible] = useState(true);


    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit= async(e)=>{
        e.preventDefault();
        try {
            const res = await login({email,password}).unwrap();
            dispatch(setCredentials({ ...res,login:true }));
            navigate('/home');        
        } catch (error) {
            alert("Please check email or password")
        }
    }
    useEffect(() => {
        if (userInfo) {
          navigate('/home');
        }
      }, [navigate, userInfo]);
    
  return (
    <div 
        className='
            flex 
            justify-center 
            items-center 
            h-screen    
            w-full 
            tracking-wide
            bg-gradient-to-b from-gray-500  via-gray-600 to-gray-800'
    >        
    <div className=' text-[#1f2937] p-4 shadow-xl shadow-black rounded-lg bg-slate-500 '>
        <div >
            <div className='flex flex-col items-center justify-center'>
                <div>
                    <h1 
                        className='text-green-400 font-bold lg:text-4xl md:text-3xl text-4xl text-center m-4'
                    >Welcome to Note Manager
                    </h1>
                </div>
                <div>
                    <h2 className='text-teal-400 text-3xl m-4 font-bold'>Sign-In</h2>
                </div>
            </div>           
            <form className='flex flex-col w-full bg-slate-300 rounded-lg' onSubmit={handleSubmit}>

                <div className='flex flex-col m-3'>
                    <label className='m- font-bold w-fit'>Email</label>
                    <input 
                        type='email' 
                        placeholder='Enter your email' 
                        className='w-250 px-4 py-2 border rounded-lg'
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                </div>
                <div className='flex flex-col m-3'>
                <div className='flex justify-between'>
                    <label className=' font-bold w-fit'> Password</label>
                      <div onClick={() => setVisible(!visible)} className='cursor-pointer '>
                              {visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </div>
                    </div>                         
                    <input 
                        type={visible ? 'password' : 'text'}
                        placeholder='Enter your password' 
                        className='w-250 px-4 py-2 border rounded-lg'
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                </div>
                <div className='flex items-center justify-center w-100 m-6 flex-col'>
                    <button 
                    type="submit" 
                    className=' rounded-lg text-2xl font-bold bg-green-400 hover:bg-rose-400 w-60 text-center p-1' 
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

export default Login