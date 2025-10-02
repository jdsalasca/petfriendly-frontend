import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className="flex flex-col gap-20 pb-20">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent px-6 py-20 sm:px-12">
        <div className="mx-auto flex max-w-5xl flex-col gap-10">
          <div className="max-w-3xl space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
              PetFriendly
            </span>
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Tecnologia y empatia para conectar hogares con mascotas que necesitan una segunda oportunidad.
            </h1>
            <p className="text-lg text-slate-300">
              Descubre mascotas disponibles, conoce las fundaciones que las cuidan y sigue un proceso de adopcion claro, seguro y humano.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/pets"
                className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-emerald-400"
              >
                Ver mascotas disponibles
              </Link>
              <a
                href="#como-funciona"
                className="inline-flex items-center justify-center rounded-full border border-emerald-400/40 px-6 py-3 text-sm font-semibold text-emerald-300 transition hover:border-emerald-300"
              >
                Como funciona PetFriendly
              </a>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl" />
      </section>

      <section id="como-funciona" className="mx-auto grid w-full max-w-5xl gap-8 px-6 sm:grid-cols-2">
        <article className="rounded-2xl border border-slate-700/60 bg-slate-900/40 p-8 shadow-2xl shadow-emerald-500/5">
          <h2 className="text-xl font-semibold text-white">Adopciones transparentes</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            Sigue cada paso del proceso: aplica, responde el formulario inteligente y realiza seguimiento hasta la entrega.
          </p>
        </article>
        <article className="rounded-2xl border border-slate-700/60 bg-slate-900/40 p-8 shadow-2xl shadow-emerald-500/5">
          <h2 className="text-xl font-semibold text-white">Fundaciones conectadas</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            Las organizaciones administran fichas de mascotas, reciben solicitudes y organizan sus campanas en un solo lugar.
          </p>
        </article>
      </section>
    </div>
  )
}

export default HomePage
