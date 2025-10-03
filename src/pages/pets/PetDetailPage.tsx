import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { usePetDetailQuery } from '@/hooks/usePetsQuery'

const PetDetailPage = () => {
  const { petId } = useParams()
  const { data: pet, isLoading, isError, refetch } = usePetDetailQuery(petId)
  const [selectedImage, setSelectedImage] = useState(0)

  const images = useMemo(() => pet?.images ?? [], [pet?.images])

  if (isLoading) {
    return (
      <div className="grid gap-8 lg:grid-cols-[3fr_2fr]">
        <div className="space-y-4">
          <div className="aspect-square animate-pulse rounded-3xl bg-slate-800/80" />
          <div className="grid grid-cols-4 gap-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="aspect-square animate-pulse rounded-2xl bg-slate-800/80" />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-12 w-3/4 animate-pulse rounded-full bg-slate-800/80" />
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="h-4 w-full animate-pulse rounded-full bg-slate-800/80" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (isError || !pet) {
    return (
      <div className="rounded-3xl border border-red-500/40 bg-red-500/10 p-6 text-red-200">
        <h1 className="text-xl font-semibold">No pudimos cargar esta mascota.</h1>
        <p className="mt-2 text-sm">Verifica tu conexion con el backend o intenta nuevamente.</p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-4 rounded-full border border-red-400/40 px-4 py-2 text-sm font-semibold text-red-100 transition hover:border-red-300"
        >
          Reintentar
        </button>
      </div>
    )
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[3fr_2fr]">
      <div className="space-y-6">
        <div className="overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/40">
          {images.length ? (
            <img
              key={images[selectedImage]?.id ?? 'main-image'}
              src={images[selectedImage]?.imageUrl}
              alt={images[selectedImage]?.altText ?? pet.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex aspect-square items-center justify-center bg-gradient-to-br from-emerald-500/20 to-slate-900 text-emerald-200">
              <span className="text-xl font-semibold">Sin fotografia</span>
            </div>
          )}
        </div>
        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-3">
            {images.map((image, index) => (
              <button
                key={image.id}
                type="button"
                onClick={() => setSelectedImage(index)}
                className={`overflow-hidden rounded-2xl border ${
                  selectedImage === index ? 'border-emerald-400' : 'border-transparent'
                }`}
              >
                <img src={image.imageUrl} alt={image.altText ?? pet.name} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <aside className="space-y-6 rounded-3xl border border-slate-800/80 bg-slate-900/40 p-8 shadow-lg shadow-emerald-500/5">
        <div className="space-y-2">
          <span className="text-sm uppercase tracking-[0.3em] text-emerald-300">Ficha de adopcion</span>
          <h1 className="text-3xl font-semibold text-white">{pet.name}</h1>
          <p className="text-sm text-slate-300">
            {pet.species} - {pet.breed ?? 'Mestizo'} - {pet.gender ?? 'Sin definir'} - {pet.size ?? 'Mediano'}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-5 text-sm leading-relaxed text-slate-300">
          <p>{pet.description ?? 'Esta mascota aun no tiene descripcion. La fundacion la agregara muy pronto.'}</p>
        </div>

        <dl className="grid gap-4 text-sm text-slate-300">
          <div className="flex items-center justify-between">
            <dt className="text-slate-400">Ciudad</dt>
            <dd className="font-semibold text-white">{pet.city ?? 'No registrada'}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-slate-400">Estado</dt>
            <dd className="font-semibold text-emerald-300">{pet.status}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-slate-400">Fundacion</dt>
            <dd className="font-semibold text-white">{pet.foundationId}</dd>
          </div>
        </dl>

        <div className="space-y-3 rounded-3xl border border-emerald-400/30 bg-emerald-400/10 p-6 text-emerald-100">
          <h2 className="text-lg font-semibold text-white">Listo para adoptar?</h2>
          <p className="text-sm text-emerald-100">
            Completa el formulario de adopcion y el equipo de la fundacion te contactara para continuar el proceso.
          </p>
          <Link
            to={`/pets/${pet.id}/apply`}
            className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-emerald-400"
          >
            Quiero adoptar a {pet.name}
          </Link>
        </div>
      </aside>
    </div>
  )
}

export default PetDetailPage
