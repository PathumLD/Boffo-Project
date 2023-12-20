import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function SignIn() {

  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
      
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-bold my-8'>Sign In</h1>
      <p className='text-red-700 my-5 font-bold text-center'>
        {error ? error || 'Something went wrong!. Please check again.' : ''}
      </p>
      <form onSubmit = {handleSubmit} className='flex flex-col gap-4 '>
        
        <input 
          type ="email" 
          placeholder = "Email" 
          id = "email" 
          className='bg-slate-100 p-3 rounded-lg' 
          onChange = {handleChange}
        />
        <input 
          type ="password" 
          placeholder = "Password" 
          id = "password" 
          className='bg-slate-100 p-3 rounded-lg' 
          onChange = {handleChange}
        />

        <button disabled={loading} className='bg-blue-700 rounded-lg py-2 text-white font-bold uppercase hover:opacity-90 disabled:opacity-50'>
          {loading ? 'Loading...' : 'Sign In'}
          </button>
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Don't have an account?</p>
        <Link to = '/sign-up'>
          <span className='text-blue-500 font-semibold'>Sign Up</span>
        </Link>
      </div>
      
    </div>
  )
}
