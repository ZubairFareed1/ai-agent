import Sidebar from './components/Sidebar'
import { useTheme } from './ThemeContext.jsx';
import { DialogProvider } from './context/DialogContext.jsx';

// eslint-disable-next-line react/prop-types
export default function MainLayout({children}) {
  const { theme } = useTheme();
  return (
    <DialogProvider>
    <div className='flex'>
        {/* Sidebar */}
        <div className=''>
                <Sidebar />
        </div>

        {/* Main Content */}
        <div className={`flex-1 ${theme === 'light' ? 'bg-gray-200' : 'surface-900'}`}>
                {children}
        </div>

      
    </div>
    </DialogProvider>
  )
}

