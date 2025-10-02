import { Outlet } from 'react-router-dom'
import AppFooter from '@/components/layout/AppFooter'
import AppHeader from '@/components/layout/AppHeader'

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <AppHeader />
      <main className="mx-auto w-full max-w-6xl px-6 py-12">
        <Outlet />
      </main>
      <AppFooter />
    </div>
  )
}

export default MainLayout
