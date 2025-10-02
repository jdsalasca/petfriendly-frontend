import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import FoundationsPage from '@/pages/foundations/FoundationsPage'
import FoundationDetailPage from '@/pages/foundations/FoundationDetailPage'
import HomePage from '@/pages/home/HomePage'
import LoginPage from '@/pages/auth/LoginPage'
import RegisterPage from '@/pages/auth/RegisterPage'
import AdoptionRequestPage from '@/pages/pets/AdoptionRequestPage'
import FoundationDashboardPage from '@/pages/dashboard/FoundationDashboardPage'
import PetDetailPage from '@/pages/pets/PetDetailPage'
import PetsListPage from '@/pages/pets/PetsListPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'pets',
        element: <PetsListPage />
      },
      {
        path: 'pets/:petId',
        element: <PetDetailPage />
      },
      {
        path: 'pets/:petId/apply',
        element: <AdoptionRequestPage />
      },
      {
        path: 'foundations',
        element: <FoundationsPage />
      },
      {
        path: 'foundations/:foundationId',
        element: <FoundationDetailPage />
      },
      {
        path: 'dashboard/foundation',
        element: <FoundationDashboardPage />
      },
      {
        path: 'auth/login',
        element: <LoginPage />
      },
      {
        path: 'auth/register',
        element: <RegisterPage />
      }
    ]
  }
])
