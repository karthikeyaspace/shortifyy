import React, { useState } from 'react'
import axios from 'axios'
import { FaClipboard } from 'react-icons/fa'
import { IoMdClose } from "react-icons/io";
import { FaExternalLinkAlt } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Toast from '../components/Toast'

const API_URL = import.meta.env.VITE_API_URL;


const Home: React.FC = () => {
    const [longUrl, setLongUrl] = useState<string>('')
    const [shortLink, setShortLink] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)


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
        setLoading(true)
        await axios.post(API_URL, { longUrl: longUrl })
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
        <div className="w-full min-h-[60vh]">
            <div className="w-[50%] h-full m-auto flex flex-col justify-center items-center">
                <h1 className='text-5xl mt-24'>Enter your Long link to get Our Shortn Link to make your life easier</h1>
                <form className="w-full h-15 mt-5 p-4 flex flex-row gap-2" onSubmit={handleLinkSubmit}>
                    <input
                        type="text"
                        placeholder='Enter your Long Url'
                        className="w-[70%] p-5 text-xl h-full font-sans bg-transparent border-2 border-white/40 focus:border-white focus:border-2 focus:outline-none rounded-l-xl"
                        onChange={handleLongLink}
                    />
                    <button
                        className={`w-[30%] h-full text-xl rounded-r-xl flex items-center  justify-center ${loading ? 'bg-blue-700 cursor-not-allowed' : 'bg-blue-700'}`}
                        type='submit'
                        disabled={loading}
                    >
                        {loading ? <AiOutlineLoading3Quarters className='animate-spin ' size={20} /> : 'Shortn'}
                    </button>
                </form>

                <div className={`w-[80%] h-24 mt-10 p-3 pr-6 bg-blue-700 rounded-md ${shortLink ? 'opacity-100' : 'opacity-0'}`}>
                    <div className='w-full h-full relative flex justify-center items-center'>
                        <p className='text-2xl font-sans'>{shortLink}</p>
                        <IoMdClose size={24} color='white' className='cursor-pointer absolute top-0 right-0' onClick={() => setShortLink('')} />
                        <div>
                            <a href={shortLink} target='_blank'><FaExternalLinkAlt size={24} color='white' className='cursor-pointer absolute bottom-0 right-10' onClick={() => window.open(shortLink, '_blank')} /></a>
                            <FaClipboard size={24} color='white' className='cursor-pointer absolute bottom-0 right-0' onClick={() => handleCopy(shortLink)} />
                        </div>
                    </div>
                </div>
            </div>
            <p className='absolute bottom-0 mb-2 text-lg left-1/2'>Build by <a href="https://kv3.vercel.app" target='_blank'>Karthikeya</a></p>

        </div>
    )
}

export default Home