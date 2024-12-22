import AdminSidebar from './AdminSidebar'
import { useTheme } from '../../ThemeContext'

export default function AdminLayout({children}) {
    const { theme } = useTheme();
  return (
    <div className='flex'> 
        <div>
            <AdminSidebar />
        </div>
        <div className={`flex-1 ${theme === 'light' ? 'bg-gray-200' : 'surface-900'}`}>
            {children}
        </div>

      
    </div>
  )
}
