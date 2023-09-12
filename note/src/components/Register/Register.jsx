import { Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../../slices/usersApiSlice';
import { setCredentials } from '../../slices/authSlice';
import React, { useEffect, useState } from 'react'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';


const Login = () => {
    const [name,setName]= useState("");
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [visible, setVisible] = useState(true);
    const [visibleS, setVisibleS] = useState(true);

    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const [register, { isLoading }] = useRegisterMutation();
    const { userInfo } = useSelector((state) => state.auth);


    useEffect(() => {
        if (userInfo) {
          navigate('/');
        }
      }, [navigate, userInfo]);
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (password !== confirmPassword) {
          alert('Passwords do not match');
        } else {
          try {
            const res = await register({ name, email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate('/sign-in');
          } catch (err) {
            alert(err)
          }
        }
      };

  return (
    <div 
        className='
            flex 
            justify-center 
            items-center 
            h-screen 
            w-full 
            tracking-wide'
    >
        <div className='shadow-xl shadow-black  text-[#1f2937] p-4 rounded-lg '>
        <div >
            <div className='flex flex-col items-center justify-center'>
                <div>
                    <h1 
                        className='text-green-400 font-bold lg:text-4xl md:text-3xl text-4xl text-center m-4'
                    >Welcome to Note Manager
                    </h1>
                </div>
                <div>
                    <h2 className='text-teal-400 text-3xl m-4 font-bold'>Sign-Up</h2>
                </div>
            </div>           
            <form className='flex flex-col w-full  rounded-lg' onSubmit={handleSubmit}>
                <div className='flex flex-col m-3'>
                    <label className='m- font-bold w-fit'>Name</label>
                    <input 
                        type='text' 
                        placeholder='Enter your name' 
                        className='w-250 px-4 py-2 border rounded-lg'
                        value={name}
                        onChange={(e) => setName(e.target.value)}

                        required/>
                </div>
                <div className='flex flex-col m-3'>
                    <label className='m- font-bold w-fit'>Email</label>
                    <input 
                        type='email' 
                        placeholder='Enter your email' 
                        className='w-250 px-4 py-2 border rounded-lg'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required/>
                </div>
                <div className='flex flex-col m-3'>
                <div className='flex justify-between'>
                    <label className=' font-bold w-fit'>Password</label>
                      <div onClick={() => setVisible(!visible)} className='cursor-pointer '>
                              {visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </div>
                    </div>                        
                     <input 
                        type={visible ? 'password' : 'text'}
                        placeholder='Enter your password' 
                        className='w-250 px-4 py-2 border rounded-lg'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required/>
                </div>
                <div className='flex flex-col m-3'>
                    <div className='flex justify-between'>
                    <label className=' font-bold w-fit'>Confirm Password</label>
                      <div onClick={() => setVisibleS(!visibleS)} className='cursor-pointer '>
                              {visibleS ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </div>
                    </div>               
                    <input 
                        type={visible ? 'password' : 'text'}
                        placeholder='Confirm password' 
                        className='w-250 px-4 py-2 border rounded-lg'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required/>
                       
                </div>
                <div className='flex items-center justify-center w-100 m-6 flex-col'>
                    <button 
                    type="submit" 
                    className=' rounded-lg text-2xl font-bold bg-green-400 hover:bg-rose-400 w-60 text-center p-1' 
                    >
                    Submit  
                    </button>
                    <p className=' flex items-center justify-center  gap-2 rounded-lg text-xl font-bold p-2 bg-green-400 m-2  w-fit text-center  hover:bg-rose-200 h-fit'>
                    <Link className='flex items-center justify-center' to='/' >Already have an Account?</Link>
                </p>
                </div>
                
            </form>
        </div>
    </div>
    </div>
 
  )
}

export default Login