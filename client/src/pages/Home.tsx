import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaClipboard } from 'react-icons/fa'
import { IoMdClose } from "react-icons/io";
import { FaExternalLinkAlt } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Toast from '../components/Toast'
import { useLocation } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;


const Home: React.FC = () => {
    const [longUrl, setLongUrl] = useState<string>('')
    const [shortLink, setShortLink] = useState<string>('https://shortifyy.vercel.app/afsed')
    const [loading, setLoading] = useState<boolean>(false)
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const url = queryParams.get('url');

    useEffect(() => {
        if (url)
            Toast.Info('Nothing Found');
    }
        , [url])

    const handleLongLink = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShortLink('')
        setLongUrl(e.target.value)
    }

    const handleLinkSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!longUrl) {
            Toast.Error('Please Enter a Valid Url')
            return
        }
        const data = {
            longUrl: longUrl
        }

        setLoading(true)
        await axios.post(API_URL, data)
            .then(res => {
                console.log(res.data)
                if (res.data.message === "short url created") {
                    Toast.Success('Short Link created')
                    setShortLink(res.data.payload.shortUrl)
                }
                else if (res.data.message === "url already exists") {
                    Toast.Success('Short Link already exists')
                    setShortLink(res.data.payload.shortUrl)
                }
                else if (res.data.message === 'invalid url') {
                    Toast.Error('Please Enter a Valid Url')
                }
                else {
                    Toast.Error('Something went wrong')
                }
            })
            .catch(err => {
                console.log(err)
                Toast.Error('Something went wrong')
            })
        setLoading(false)
    }

    const handleCopy = (link: string) => {
        navigator.clipboard.writeText(link)
        Toast.Success('Copied to Clipboard')
    }


    return (
        <div className="w-full">
            <div className="w-[90%] sm:w-[80%] lg:w-[60%] h-full m-auto flex flex-col justify-center items-center pt-20">
                <h1 className='text-3xl md:text-5xl'>Enter your Long link to get Our Shortn Link to make your life easier</h1>
                <form className="w-full mt-5 lg:mt-10 flex flex-col lg:flex-row gap-1" onSubmit={handleLinkSubmit}>
                    <div className='w-full flex flex-col sm:flex-row gap-1'>
                        <input
                            type="text"
                            placeholder='Enter your Long Url'
                            className="w-full sm:w-3/4 p-3 sm:p-4 md:px-5 md:py-4 text-xl h-full font-sans bg-transparent border-2 border-white/40 focus:border-white focus:border-2 focus:outline-none rounded-sm sm:rounded-r-none sm:rounded-l-md"
                            onChange={handleLongLink}
                        />
                        <button
                            className={`h-full w-[150px] m-auto mt-4 py-2 md:py-0 sm:mt-0 sm:w-1/4 text-xl border-2 border-white/40 justify-center items-center hover:font-bold hover:border-2 hover:border-white active:bg-white active:text-black rounded-sm sm:rounded-l-none sm:rounded-r-md flex  ${loading ? 'bg-white cursor-not-allowed' : 'bg-black'}`}
                            type='submit'
                            disabled={loading}
                        >
                            {loading ? <AiOutlineLoading3Quarters className='animate-spin' size={20} color='black' /> : 'Shortn'}
                        </button>
                    </div>
                </form>

                <div className={`h-32 mt-10 p-3 bg-white rounded-sm ${shortLink ? 'opacity-100' : 'opacity-0'}`}>
                    <div className='w-full h-full relative flex justify-center items-center'>
                        <p className='text-xl sm:text-2xl font-sans px-5 text-black'>{shortLink}</p>
                        <IoMdClose size={24} color='black' className='cursor-pointer absolute top-0 right-0' onClick={() => setShortLink('')} />
                        <div className='flex flex-row absolute bottom-0 right-0 gap-5'>
                            <a href={shortLink} target='_blank'><FaExternalLinkAlt size={20} color='black' className='hover:cursor-pointer' /></a>
                            <FaClipboard size={20} color='black' className='hover:cursor-pointer' onClick={() => handleCopy(shortLink)} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='absolute w-full bottom-0 mb-2 '>
                <p className='text-center'>Built by <a href="https://kv3.vercel.app" className='text-blue-500' target='_blank'>Karthikeya</a></p>
            </div>
        </div>
    )
}

export default Home