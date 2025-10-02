import { useMemo, useState } from 'react'
import PetCard from '@/components/pets/PetCard'
import { usePetsQuery } from '@/hooks/usePetsQuery'
import type { Pet } from '@/types/pets'

const speciesOptions = ['Dog', 'Cat', 'Rabbit', 'Bird', 'Hamster', 'Guinea Pig', 'Reptile', 'Other']

const PetsListPage = () => {
  const [city, setCity] = useState('')
  const [species, setSpecies] = useState('')

  const { data, isLoading, isError, refetch, isFetching } = usePetsQuery({
    city: city || undefined,
    species: species || undefined,
    status: 'Available'
  })

  const pets: Pet[] = data?.content ?? []

  const subtitle = useMemo(() => {
    if (isLoading || isFetching) {
      return 'Cargando mascotas disponibles...'
    }

    if (!pets.length) {
      return 'No encontramos mascotas con estos filtros. Intenta ajustar la busqueda.'
    }

    return `${pets.length} mascotas listas para conquistar un nuevo hogar.`
  }, [isFetching, isLoading, pets.length])

  return (
    <div className="flex flex-col gap-10">
      <section className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Mascotas</p>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">Descubre a tu proximo companero</h1>
          <p className="text-base text-slate-300">{subtitle}</p>
        </div>
      </section>

      <section className="grid gap-4 rounded-3xl border border-slate-800/80 bg-slate-900/40 p-6 shadow-lg shadow-emerald-500/5 md:grid-cols-4">
        <label className="flex flex-col gap-2 text-sm text-slate-300 md:col-span-2">
          Ciudad
          <input
            value={city}
            onChange={(event) => setCity(event.target.value)}
            placeholder="Medellin, Bogota, Lima..."
            className="rounded-2xl border border-slate-700/60 bg-slate-950 px-4 py-3 text-base text-white outline-none transition focus:border-emerald-400"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-300">
          Especie
          <select
            value={species}
            onChange={(event) => setSpecies(event.target.value)}
            className="rounded-2xl border border-slate-700/60 bg-slate-950 px-4 py-3 text-base text-white outline-none transition focus:border-emerald-400"
          >
            <option value="">Todas</option>
            {speciesOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={() => {
            setCity('')
            setSpecies('')
          }}
          className="self-end rounded-2xl border border-emerald-400/40 bg-transparent px-4 py-3 text-sm font-semibold text-emerald-300 transition hover:border-emerald-300 hover:text-emerald-200"
        >
          Limpiar filtros
        </button>
      </section>

      {isError ? (
        <div className="rounded-3xl border border-red-500/40 bg-red-500/10 p-6 text-red-200">
          <p className="text-sm font-semibold">No pudimos cargar las mascotas.</p>
          <button
            type="button"
            className="mt-3 rounded-full border border-red-400/40 px-4 py-2 text-sm font-semibold text-red-100 transition hover:border-red-300"
            onClick={() => refetch()}
          >
            Reintentar
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {isLoading || isFetching ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-full animate-pulse rounded-3xl border border-slate-800/80 bg-slate-900/60"
              >
                <div className="aspect-[4/3] rounded-t-3xl bg-slate-800/80" />
                <div className="space-y-3 p-6">
                  <div className="h-6 w-3/4 rounded-full bg-slate-800/80" />
                  <div className="h-4 w-1/2 rounded-full bg-slate-800/80" />
                  <div className="h-4 w-full rounded-full bg-slate-800/80" />
                </div>
              </div>
            ))
          ) : (
            pets.map((pet: Pet) => <PetCard key={pet.id} pet={pet} />)
          )}
        </div>
      )}
    </div>
  )
}

export default PetsListPage
