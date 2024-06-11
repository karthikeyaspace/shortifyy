import React from 'react'
import { FaGithub } from 'react-icons/fa'


const Navbar: React.FC = () => {
    return (
        <div className='w-full h-[15vh]  flex items-center'>
            <div className="w-[90%] md:w-[70%] h-full m-auto flex flex-row justify-between items-center">
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='text-3xl'>Shortn</h1>
                    <img src='img.png' className='w-[100px]' alt="" />
                </div>
                <a href="https://github.com/karthikeyaspace/shortn/" target='_blank'>
                    <FaGithub color='white' className='cursor-pointer hover:opacity-80' size={40} />
                </a>
            </div>
        </div>
    )
}

export default Navbar