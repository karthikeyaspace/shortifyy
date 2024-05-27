import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Toast from '../components/Toast';

const Notfound: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const url = queryParams.get('url');
  const navigate = useNavigate()

  useEffect(() => {
    if (url)
      Toast.Info('Enter A Valid url!');
  }, [])


  return (
    <div className='w-full h-full text-4xl flex flex-col items-center gap-8 '>
      <h1>URL Not Found or expired</h1>
      <h1>Create your Own short URLS</h1>
      <button onClick={() => navigate('/')} className='w-1/5 py-4  text-4xl rounded-xl flex items-center  justify-center bg-blue-700'>
        Create
      </button>
    </div>
  );
};

export default Notfound;
