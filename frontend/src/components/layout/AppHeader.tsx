import { NavLink } from 'react-router-dom'

const navLinkBase =
  'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400'

const AppHeader = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <NavLink to="/" className="text-base font-semibold text-white">
          PetFriendly
        </NavLink>
        <nav className="flex items-center gap-2 text-slate-300">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              [navLinkBase, isActive ? 'bg-emerald-500 text-slate-900' : 'hover:text-white'].join(' ')
            }
          >
            Inicio
          </NavLink>
          <NavLink
            to="/pets"
            className={({ isActive }) =>
              [navLinkBase, isActive ? 'bg-emerald-500 text-slate-900' : 'hover:text-white'].join(' ')
            }
          >
            Mascotas
          </NavLink>
          <NavLink
            to="/foundations"
            className={({ isActive }) =>
              [navLinkBase, isActive ? 'bg-emerald-500 text-slate-900' : 'hover:text-white'].join(' ')
            }
          >
            Fundaciones
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default AppHeader
