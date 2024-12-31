import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const {login, isAuthenticated} = useAuth()

    const submitLoginForm = async (e) => {
        e.preventDefault()
        if(email === '' || password === ''){
          alert('Please fill all the fields')
          return
        }
        try{

          
          const response = await axios.post('http://localhost:3000/api/users/login',{email,password})

          console.log(response)
         
        if(response.status === 500){
          alert("Internal server error")
        }
        if(response.status === 401){
          alert("Invalid email or password")
        }
        const data = response.data;
        if(response.status === 200){
          sessionStorage.setItem('user_id', JSON.stringify(data.dashboardData.user.user_id))
          login(data.dashboardData, data.token)
        }
        if(isAuthenticated){
          navigate('/')
          
        }
        
        
      
      }catch(err){
        console.error(err.message)
      }
        
    }


  useEffect(() => {
    if (isAuthenticated) {
      navigate('/'); // Redirect to home page once authenticated
    }
  }, [isAuthenticated, navigate]);

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
                    <h2 className='text-4xl'>Smart ai</h2>
                </div>
                <div className='flex justify-content-center align-items-center'>
                    <span className='text-center'>
                    Sign in to continue Smart Ai dashboard
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
                        <input type="password" placeholder='Password' className='w-full py-3 px-3 border-none text-xl '
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
                    <div className='flex justify-content-center align-items-center'>
                        <span className='text-center'>
                        Don&apos;t have an account? <NavLink to='/register' className='text-blue-400 cursor-pointer'>Register</NavLink>
                        </span>
                    </div>

                   
                </div>
                          </form>
            </div>

        </div>

      </div>
    </div>
  )
}
