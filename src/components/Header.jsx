import {Button} from 'primereact/button'

import { useTheme } from '../ThemeContext.jsx';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`flex justify-content-between align-items-center py-2 px-4 border-bottom-1 ${theme === 'light' ? 'border-300' : ''} `}>
        <div>
            <h1 className={`m-0 ${theme === 'light' ? 'text-900' : 'text-100'}`}><span className='text-blue-500'>S</span>mart ai</h1>
        </div>
        <div>
            <Button icon={`pi ${theme === 'light' ? 'pi-moon' : 'pi-sun'}`} rounded outlined security='secondary' aria-label="moon" onClick={toggleTheme}/>
        </div>
      
    </div>
  )
}
