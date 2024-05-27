import toast from 'react-hot-toast'

const Toast = {
    Success: (msg: string) =>{
        toast.success(msg,{
            duration: 2500,
            position: 'top-right',
            style: {
                backgroundColor: 'green',
                color: 'white',
                padding: '10px',
                fontSize: '1.5rem',
            }
        })
    },
    Error: (msg: string) =>{
        toast.error(msg,{
            duration: 2500,
            position: 'top-right',
            style: {
                backgroundColor: 'red',
                color: 'white   ',
                padding: '10px',
                fontSize: '1.5rem',
            },
        })
    },
    Info: (msg: string) =>{
        toast(msg,{
            duration: 2500,
            position: 'top-right',
            style: {
                backgroundColor: 'blue',
                color: 'white',
                padding: '10px',
                fontSize: '1.5rem',
            }
        })
    }

}

export default Toast