import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRef } from 'react'; 
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';

export default function Profile() {

  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

  return (
    <div className='max-w-lg p-3 mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input 
          type="file" 
          ref={fileRef} 
          hidden accept='image/*'
          onChange={(e) => setImage(e.target.files[0])} 
        />
        <img 
          src= {formData.profilePicture || currentUser.profilePicture} 
          alt="profile" 
          className='self-center object-cover w-32 h-32 mt-2 rounded-full cursor-pointer'
          onClick = {() => fileRef.current.click()}
        />
         <p className='self-center text-sm'>
          {imageError ? (
            <span className='text-red-700'>
              Error uploading image (file size must be less than 2 MB)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className='text-slate-700'>{`Uploading: ${imagePercent} %`}</span>
          ) : imagePercent === 100 ? (
            <span className='text-green-700'>Image uploaded successfully</span>
          ) : (
            ''
          )}
        </p>

        <input 
          defaultValue={currentUser.username} 
          type="text" 
          id="username" 
          placeholder='Username' 
          className='p-3 font-semibold rounded-lg bg-slate-100' 
        />
        <input 
          defaultValue={currentUser.email} 
          type="email" 
          id="email" 
          placeholder='Email' 
          className='p-3 font-semibold rounded-lg bg-slate-100' 
        />
        <input 
          type="password" 
          id="password" 
          placeholder='Password' 
          className='p-3 font-semibold rounded-lg bg-slate-100' 
        />

        <button className='p-2 font-semibold text-white uppercase rounded-lg bg-slate-700 hover:opacity-90 hover:font-bold disabled:opacity-75'>Update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='font-medium text-red-700 cursor-pointer'>Delete Account</span>
        <span className='font-medium text-red-700 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}
