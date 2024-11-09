import React, { useState } from 'react'

export default function Login() {
    const [focused, setFocused] = useState(false);
  return (
    <div className='h-screen bg-no-repeat bg-cover bg-center' style={{backgroundImage:'url(login-bg.jpg)'}}>
      <div className='h-full bg-black-alpha-70 flex justify-content-center align-items-center ' style={{backdropFilter:'blur(2px)'}}>
        <div className=' w-full h-full sm:border-round-lg sm:w-25rem sm:h-30rem border-1 bg-white-alpha-80 ' style={{backdropFilter:'blur(5px)'}}>
            <div>
                <div className='flex justify-content-center align-items-center'>
                    <h2 className='text-4xl'>SenseiAi</h2>
                </div>
                <div className='flex justify-content-center align-items-center'>
                    <span className='text-center'>
                    Sign in to continue to you SenceAi dashboard
                    </span>

                </div>
                <div className='flex flex-column p-4'>
                    <div className={` border-round-md overflow-hidden`} style={{outline: focused ? "2px solid #007bff" : 'none'}} >
                        <input type="text" placeholder='Email' className='w-full py-3 px-3 border-none text-xl '
                        style={{
                            outline:'none',
                            border:'none'
                        }} 
                        onFocus={()=>setFocused(true)}
                        onBlur={()=>setFocused(false)}
                        />
                    </div>
                   
                </div>
            </div>

        </div>

      </div>
    </div>
  )
}
