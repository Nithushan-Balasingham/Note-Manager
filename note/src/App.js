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


function App() {
  return (
    <div className="app">
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
  );
}

export default App;
