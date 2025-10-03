const AppFooter = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/90 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-slate-400 sm:flex-row">
        <p>© {new Date().getFullYear()} PetFriendly. Construido con amor por las mascotas.</p>
        <div className="flex gap-4">
          <a className="transition hover:text-emerald-300" href="mailto:hello@petfriendly.dev">
            Contacto
          </a>
          <a className="transition hover:text-emerald-300" href="https://petfriendly.dev" target="_blank" rel="noreferrer">
            Website
          </a>
        </div>
      </div>
    </footer>
  )
}

export default AppFooter
