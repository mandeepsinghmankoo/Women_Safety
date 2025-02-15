import React from 'react'
import { Link } from 'react-router-dom'
function Home() {
    return (
        <>
            <div className='main w-full flex flex-row h-[90vh]'>
                <div className="left w-1/2 text-white flex flex-col justify-center items-strat mx-10 space-y-8  px-5">
                    <h1 className='text-6xl font-bold space-y-5'>Women Safety
                        <h1 className='text-[#f0bd6a]'>Analytics</h1>
                        <h3 className='text-xl '>Leveraging Real-Time Threat Detection for Enhanced Safety</h3>
                    </h1>
                    <div className=" space-x-10 flex justify-start items-start">
                        <Link to='/login' >
                            <button
                                className='bg-[#f0bd6a] px-10 py-2 rounded-xl p-9/2 font-bold text-xl py-3 btn hover:bg-[#b58c4a]'>

                                LOG IN
                            </button>
                        </Link>
                        <Link to='/signup' >
                            <button
                                className='bg-[#f0bd6a] px-10 py-2 rounded-xl p-9/2 font-bold text-xl py-3 btn hover:bg-[#b58c4a]'>
                                SIGN UP
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="right flex justify-center items-center w-1/2 mt-10">
                    <img className='h-[75vh] w-520' src="homepic.png" alt="" />
                </div>
            </div>

        </>
    )
}

export default Home