import { Link } from 'react-router-dom'
import type { Pet } from '@/types/pets'

interface PetCardProps {
  pet: Pet
}

const PetCard = ({ pet }: PetCardProps) => {
  const primaryImage = pet.images?.find((image) => image.isPrimary) ?? pet.images?.[0]

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/40 shadow-lg shadow-emerald-500/5 transition hover:border-emerald-500/60">
      <Link to={`/pets/${pet.id}`} className="flex h-full flex-col">
        <div className="relative aspect-[4/3] overflow-hidden">
          {primaryImage ? (
            <img
              src={primaryImage.imageUrl}
              alt={primaryImage.altText ?? pet.name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-emerald-500/20 to-slate-900 text-emerald-200">
              <span className="text-lg font-semibold">{pet.species}</span>
            </div>
          )}
          <span className="absolute left-4 top-4 rounded-full bg-slate-950/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
            {pet.status}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-3 px-5 py-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">{pet.name}</h3>
            {pet.age != null && (
              <span className="text-sm font-medium text-emerald-300">{pet.age} anos</span>
            )}
          </div>
          <p className="text-sm text-slate-300">
            {pet.breed ?? 'Mestizo'} - {pet.gender ?? 'Sin definir'} - {pet.size ?? 'Tamano mediano'}
          </p>
          <div className="mt-auto flex items-center justify-between text-sm text-slate-400">
            <span>{pet.city ?? 'Ciudad no registrada'}</span>
            <span className="font-medium text-emerald-300">{'Ver detalle ->'}</span>
          </div>
        </div>
      </Link>
    </article>
  )
}

export default PetCard
