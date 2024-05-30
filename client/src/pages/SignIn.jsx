import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';

import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  //instead of having 2 hooks error & loading . Using useSelector hook we can import these two.
  //And that is coming from global state & state name called user inside userSlice
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
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
      console.log(data);
      const { role } = data;
      localStorage.setItem('role', role);

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');//we are navigating to homepage when sign-in is completed.
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className='hero-bg w-full  h-screen'>
    <div className='p-3 pt-20 max-w-lg mx-auto'>
      <h1 className='font-bold text-center text-xl lg:text-7xl'>
              <span className='text-white'>Renti</span>
              <span className='text-green-300'>fy</span>
      </h1>
      <h1 className='text-3xl text-center font-semibold my-7 text-white'>Login</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='email'
          placeholder='email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className='bg-orange-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAuth />
      </form>
      <div className='flex gap-2 mt-5 text-white'>
        <p>Dont have an account?</p>
        <Link to={'/sign-up'}>
          <span className='text-blue-400'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
    </div>

  );
}
