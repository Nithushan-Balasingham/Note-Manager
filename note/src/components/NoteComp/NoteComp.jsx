import React from 'react'
import { Link } from 'react-router-dom'


const NoteComp = () => {
  return (
    <div className='flex h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-500  via-gray-600 to-gray-800'>
        <div>
        <div className='flex flex-col items-center justify-center shadow-2xl rounded-2xl p-5'>
			<h1 className='text-3xl text-center font-bold p-4'>User Deleted successfully</h1>
			
            <Link to='/sign-in' className='text-3xl text-center font-bold p-4 hover:text-green-400'>Go to Login Page</Link>

				</div>
        </div>
    </div>
  )
}

export default NoteComp