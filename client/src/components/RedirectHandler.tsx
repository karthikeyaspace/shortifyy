// RedirectHandler.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RedirectHandler: React.FC = () => {
   const {alias} = useParams<{alias: string}>()
    const navigate = useNavigate();
    const [url, setUrl] = useState<string>('')
    console.log(alias);
    useEffect(() => {
        if (alias) {
            console.log(alias)
            const redirectToLongUrl = async () => {
                try{
                    const response = await axios.get(`http://localhost:3000/${alias}`)
                    if(response.data.message === 'redirecting'){
                        setUrl(response.data.payload.longUrl)
                        window.location.href = response.data.payload.longUrl
                    }
                    else {
                        window.location.href = '/notfound?url='+alias
                    }
                }
                catch(err){
                    window.location.href = '/notfound?url='+alias
                }
            };
            redirectToLongUrl();
        }
    }, [alias, navigate]);

    return (
        <div className='h-full w-full flex flex-row justify-center items-center'>
            <h1 className='text-3xl'>Redirecting to {url}</h1>
        </div>
    ); 
};

export default RedirectHandler;
