import { BrowserRouter } from 'react-router-dom'
import { AdminProvider } from '@/context/AdminContext'
import { AdminDataProvider } from '@/context/AdminDataContext'
import { AppRoutes } from '@/routes'

function App() {
  return (
    <AdminProvider>
      <AdminDataProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AdminDataProvider>
    </AdminProvider>
  )
}

export default App
