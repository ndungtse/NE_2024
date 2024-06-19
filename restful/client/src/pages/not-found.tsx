import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className='w-full flex flex-col items-center h-screen justify-center'>
            <h1 className=' text-7xl text-primary font-semibold'>404</h1>
            <h1 className='text-3xl font-bold'>Page Not Found</h1>
            <p className='text-lg'>The page you are looking for doesn't exist.</p>
            <Link to={'/'} className='text-lg font-semibold text-primary'>Back to Home</Link>
        </div>
    )
}

export default NotFound