// RedirectHandler.jsx
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

const RedirectHandler: React.FC = () => {
   const {alias} = useParams<{alias: string}>()
    const navigate = useNavigate();
    console.log(alias)
    useEffect(() => {
        if (alias) {
            const redirectToLongUrl = async () => {
                try{
                    const response = await axios.get(`${API_URL}${alias}`)
                    
                    if(response.data.message === 'redirecting')
                        window.location.href = response.data.payload.longUrl
                    else 
                        window.location.href = '/?url='+alias
                }
                catch(err){
                    console.error(err)
                }
            };
            redirectToLongUrl();
        }
    }, [alias, navigate]);


    return (
        <div className='z-50 absolute w-screen h-screen bg-black'></div>
    ); 
};

export default RedirectHandler;
