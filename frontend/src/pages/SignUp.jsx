import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate('/sign-in')
      
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-bold my-8'>Sign Up</h1>
      <p className='text-red-700 my-5 font-bold text-center'>{error && 'Something went wrong!. Please check again.'}</p>
      <form onSubmit = {handleSubmit} className='flex flex-col gap-4 '>
        <input 
          type ="text" 
          placeholder = "Username" 
          id = "username" 
          className='bg-slate-100 p-3 rounded-lg' 
          onChange = {handleChange}
        />
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
          {loading ? 'Loading...' : 'Sign Up'}
          </button>
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
