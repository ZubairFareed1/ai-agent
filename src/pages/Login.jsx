import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react'

export default function Login() {
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const submitLoginForm = (e) => {
        e.preventDefault()
        if(email === '' || password === ''){
            alert('Please fill all the fields')
            return
        }
        if(email !== 'zubairahmed@gmail.com' || password !== 'admin123'){
            alert('Invalid credentials')
            return
        }
        navigate('/')

        
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
      };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
      };

  return (
    <div className='h-screen bg-no-repeat bg-cover bg-center' style={{backgroundImage:'url(login-bg.jpg)',}}>
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
                <form onSubmit={submitLoginForm}>

                <div className='flex flex-column p-4 gap-4'>
                    <div className={` border-round-md overflow-hidden`} style={{outline: emailFocused ? "2px solid #007bff" : 'none'}} >
                        <input type="text" placeholder='Email' className='w-full py-3 px-3 border-none text-xl '
                        style={{
                            outline:'none',
                            border:'none'
                          }} 
                          onFocus={()=>setEmailFocused(true)}
                          onBlur={()=>setEmailFocused(false)}
                          onChange={handleEmailChange}
                          value={email}
                          />
                    </div>
                     <div className={` border-round-md overflow-hidden`} style={{outline: passwordFocused ? "2px solid #007bff" : 'none'}} >
                        <input type="text" placeholder='Password' className='w-full py-3 px-3 border-none text-xl '
                        style={{
                            outline:'none',
                            border:'none'
                          }} 
                          onFocus={()=>setPasswordFocused(true)}
                          onBlur={()=>setPasswordFocused(false)}
                          onChange={handlePasswordChange}
                          value={password}
                          />
                    </div>
                    <div className={` border-round-md overflow-hidden`} >
                      <button className='p-3 w-full text-base bg-blue-400 border-none text-white cursor-pointer font-semibold' type='submit'>Sign in</button>
                    </div>

                   
                </div>
                          </form>
            </div>

        </div>

      </div>
    </div>
  )
}
