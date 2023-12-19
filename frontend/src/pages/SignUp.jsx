import React from 'react'
import { Link } from 'react-router-dom';

export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-bold my-8'>Sign Up</h1>
      <form action="" className='flex flex-col gap-4 '>
        <input type ="text" placeholder = "Username" id = "username" className='bg-slate-100 p-3 rounded-lg' />
        <input type ="email" placeholder = "Email" id = "email" className='bg-slate-100 p-3 rounded-lg' />
        <input type ="password" placeholder = "Password" id = "password" className='bg-slate-100 p-3 rounded-lg' />

        <button className='bg-blue-700 rounded-lg py-2 text-white font-bold uppercase hover:opacity-90 disabled:opacity-50'>Sign Up</button>
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to = '/sign-in'>
          <span className='text-blue-500 font-semibold'>Sign In</span>
        </Link>
      </div>
    </div>
  )
}
