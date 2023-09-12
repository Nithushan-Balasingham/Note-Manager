import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import PrivateRoute from './PrivateRoute';
import Profile from './components/Profile/Profile';
import HomeNotes from './components/HomeNotes/HomeNotes';
import AddNote from './components/AddNote/AddNote';
import UpdateNote from './components/UpdateNote/UpdateNote';
import NoteComp from './components/NoteComp/NoteComp';
import { useContext, useEffect, useState } from 'react';
import DarkModeIcon from '@mui/icons-material/DarkMode';


function App() {
  const [toggleTheme, setToggleTheme] = useState(false); 

  useEffect(() => {
    if (toggleTheme) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [toggleTheme]);

  const toggleDark = () => {
    setToggleTheme(!toggleTheme);
  };

  return (
    <div className={toggleTheme  ? "app dark":"app"}>
      <div 
        className='
                  dark:bg-gradient-to-b from-gray-500  via-gray-600 to-gray-800 
                  bg-gray-200 
                  h-full
                  '>
                    <div className='relative'>
                    <DarkModeIcon className=" cursor-pointer " onClick={toggleDark}/>
                    </div>
                   

    
        <Routes>
        <Route path='/' element ={<Login/>} />
        <Route path='/sign-in' element ={<Login/>} />
        <Route path='/register' element ={<Register/>} />
        <Route path='/deleted' element={<NoteComp/>}/>

        <Route path='' element={<PrivateRoute />}>
          <Route path='/home' element={<Home/>}/>
          <Route path='/update/user/:id' element={<Profile/>}/>
          <Route path='/notes' element={<HomeNotes/>}/>
          <Route path='/addNote' element={<AddNote/>}/>
          <Route path='notes/update/:id' element={<UpdateNote/>}/>
        </Route>
      </Routes>
      </div>
      
     
    </div>
  );
}

export default App;
