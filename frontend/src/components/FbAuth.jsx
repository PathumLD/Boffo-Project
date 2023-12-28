import React from 'react'
import { FacebookAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function FbAuth() {
  // ... (existing code remains unchanged)

  const handleFacebookClick = async () => {
    try {
      // Initialize the Facebook authentication provider
      const provider = new FacebookAuthProvider();
      const auth = getAuth(app);

      // Open the Facebook authentication popup
      const result = await signInWithPopup(auth, provider);

      // Make a POST request to your backend to handle Facebook authentication
      const res = await fetch('/api/auth/facebook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();
      console.log(data);

      // Dispatch the user data to Redux state after successful authentication
      dispatch(signInSuccess(data));

      // Redirect the user to the desired location (e.g., home page)
      navigate('/');
    } catch (error) {
      console.log('Could not login with Facebook', error);
    }
  };

  return (
    <button
      type='button'
      onClick={handleFacebookClick}
      className='p-3 text-white uppercase bg-blue-800 rounded-lg hover:opacity-95'
    >
      Continue with Facebook
    </button>
  );
}