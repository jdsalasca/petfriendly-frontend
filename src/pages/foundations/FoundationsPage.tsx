import { useState } from 'react'
import { FoundationCard } from '@/components/foundations/FoundationCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { useFoundationsQuery } from '@/hooks/useFoundationsQuery'

const FoundationsPage = () => {
  const [city, setCity] = useState('')

  const { data, isLoading, isFetching, isError, refetch } = useFoundationsQuery({
    city: city || undefined
  })

  const foundations = data?.content ?? []

  return (
    <div className="flex flex-col gap-10">
      <section className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Fundaciones aliadas</p>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">Organizaciones que confian en PetFriendly</h1>
          <p className="text-base text-slate-300">
            Encuentra la fundacion ideal para apadrinar, adoptar o apoyar con voluntariado.
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-4 rounded-3xl border border-slate-800/80 bg-slate-900/40 p-6 shadow-lg shadow-emerald-500/5 sm:flex-row sm:items-end">
        <div className="w-full sm:w-1/2">
          <label className="text-sm font-medium text-slate-300">Ciudad</label>
          <Input
            placeholder="Medellin, Bogota, Quito..."
            value={city}
            onChange={(event) => setCity(event.target.value)}
            className="mt-2"
          />
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => refetch()}>
            Buscar
          </Button>
          <Button variant="outline" onClick={() => setCity('')}>
            Limpiar
          </Button>
        </div>
      </section>

      {isError ? (
        <div className="rounded-3xl border border-red-500/40 bg-red-500/10 p-6 text-red-200">
          <p className="text-sm font-semibold">No pudimos cargar las fundaciones.</p>
          <Button variant="outline" className="mt-3" onClick={() => refetch()}>
            Reintentar
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {isLoading || isFetching ? (
            Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} className="h-48 w-full" />)
          ) : (
            foundations.map((foundation) => <FoundationCard key={foundation.id} foundation={foundation} />)
          )}
        </div>
      )}
    </div>
  )
}

export default FoundationsPage
