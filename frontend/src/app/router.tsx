import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import FoundationsPage from '@/pages/foundations/FoundationsPage'
import HomePage from '@/pages/home/HomePage'
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
        path: 'foundations',
        element: <FoundationsPage />
      }
    ]
  }
])
