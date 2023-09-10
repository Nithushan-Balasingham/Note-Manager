import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../slices/authSlice';
import { useLogoutMutation } from '../../slices/usersApiSlice';
import CryptoJS from 'crypto-js';


const Home = () => {
  const decryptData = (encryptedData, secretKey) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  };
  
const secretKey = process.env.REACT_APP_ENCRYPT_KEY; 

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [userId,setUserId] =useState('')
  const[ own,SetOwn] = useState('')
  const [logoutApiCall] = useLogoutMutation();
  
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {

    const encryptedAccessToken = localStorage.getItem('accessToken');
    const accessToken = decryptData(encryptedAccessToken, secretKey);
  
    console.log(accessToken)
    if (!accessToken) {
      throw new Error('Access token not found');
    }
  
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
  
    axios.get(`/api/users/${userInfo.userId}`, config)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setPosts(response.data);
        
        }
        if (typeof response.data === 'object' && response.data !== null) {
        setPosts([response.data]);
        setUserId(response.data.id)
        SetOwn(response.data._id)
        console.log('Response Data:',response.data); 
        console.log('Response Data:',own); 


      }  
  
        if (response.data.data === "Token Expired") {
          alert("Expired Session");
          navigate("/");
          window.localStorage.clear();
          window.location.href = "./sign-in";
        }
      })
      .catch((error) => {
        console.log('Error fetching data:', error);
      });
  }, []);
  const handleUserDelete =async()=>{
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('Access token not found');
    }
    const confirmDeleteUser = window.confirm('Are you sure you want to delete the account and added all notes will be deleted also ?');

    if(confirmDeleteUser){
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      try {
        await axios.delete(`/api/users/${own}`, config);
        navigate('/deleted');
        localStorage.removeItem('userInfo');
        localStorage.removeItem('userId');
        localStorage.removeItem('accessToken');
      } catch (error) {
        console.error('Error deleting user:', error);
      }
  }
}
  return (
    <div 
      className=' w-full bg-gradient-to-b from-gray-500  via-gray-600 to-gray-800  items-center justify-center flex   md:h-screen xl:h-screen h-screen '>
    <div className='flex flex-col justify-center items-center shadow-xl p-16 rounded-lg shadow-black/10  bg-gray-100'>
      <h1 
        className='text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 text-5xl font-bold'>
        Home
      </h1>
                
      {posts ? (
        <div className='m-4'>
          {posts.map((post,index) => {
            return (
              <div
              key={index}

              >
              {userInfo ? (
              <>

                  <div className='flex flex-col items-center justify-center'>
                  <p className='text-4xl text-blue-400 font-semibold m-2 '>{post.name}</p> 
                  <h4 className='text-2xl text-blue-400 font-semibold m-2 '>{post.email}</h4>
                  <hr/>
                  <div className='flex flex-col items-center justify-center mt-6'>
                    <Link 
                      to={`/update/user/${userInfo.userId}`} 
                      className='text-black text-3xl font-bold mt-4 hover:text-green-400'
                      >
                        Profile
                      </Link>

                    <Link to='/notes' className='text-black text-3xl font-bold mt-4 hover:text-green-400'>
                      <h1>Notes</h1>
                    </Link>
                  <div 
                    className='text-black text-3xl font-bold mt-5 cursor-pointer bg-slate-500 rounded-lg p-2 hover:bg-green-400' 
                    onClick={logoutHandler}
                  >Log-Out
                  </div>
                  </div>
                  <div>
                    <button
                      className='rounded-lg text-2xl font-bold w-40 m-3 bg-green-400 text-center hover:bg-green-200 h-10'        
                      variant="outline-info"
                      onClick={() => handleUserDelete(post)}
                  >
                  DELETE
                    </button>
                  </div>
                 
              </div>
            </>
          ) : (
            <div>
              {/* <div className='text-black text-3xl'>
                <Link to='/' >
                    Sign In
                </Link>
              </div>

              <Link to='/register'>
                 Sign Up
              </Link> */}
            </div>
          )}      
                </div>
              
            );
          })}
        </div>
      ) : (
        ""
      )}
      
    </div>
    </div>
  )
}

export default Home