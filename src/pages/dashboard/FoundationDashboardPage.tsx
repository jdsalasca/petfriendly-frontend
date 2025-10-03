import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useAuth } from '@/context/AuthContext'
import { useAdoptionRequests } from '@/hooks/useAdoptionRequests'
import type { AdoptionStatus } from '@/types/adoption'

const statusFilters: Array<{ label: string; value: AdoptionStatus | 'ALL' }> = [
  { label: 'Todas', value: 'ALL' },
  { label: 'Pendientes', value: 'Pending' },
  { label: 'Aprobadas', value: 'Approved' },
  { label: 'Rechazadas', value: 'Rejected' },
  { label: 'Canceladas', value: 'Cancelled' }
]

const FoundationDashboardPage = () => {
  const { user } = useAuth()
  const [filter, setFilter] = useState<AdoptionStatus | 'ALL'>('ALL')
  const { data, isLoading, isError, refetch } = useAdoptionRequests(user?.role === 'Foundation Admin')

  const requests = useMemo(() => {
    if (!data) return []
    if (filter === 'ALL') return data
    return data.filter((request) => request.status === filter)
  }, [data, filter])

  if (!user || user.role !== 'Foundation Admin') {
    return (
      <Card className="max-w-xl text-center text-slate-300">
        <h2 className="text-xl font-semibold text-white">Acceso restringido</h2>
        <p className="mt-2 text-sm">
          Este panel esta disponible para administradores de fundaciones. Inicia sesion con un rol autorizado para ver las
          solicitudes de adopcion.
        </p>
      </Card>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold text-white">Panel de la fundacion</h1>
        <p className="text-sm text-slate-300">
          Revisa las solicitudes de adopcion recibidas y gestiona su estado.
        </p>
        <div className="flex flex-wrap gap-2">
          {statusFilters.map(({ label, value }) => (
            <Button
              key={value}
              variant={filter === value ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setFilter(value)}
            >
              {label}
            </Button>
          ))}
        </div>
      </section>

      {isError ? (
        <Card className="space-y-3 text-slate-300">
          <p>No pudimos cargar las solicitudes de adopcion.</p>
          <Button variant="outline" onClick={() => refetch()}>
            Reintentar
          </Button>
        </Card>
      ) : isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-20 animate-pulse rounded-3xl bg-slate-900/60" />
          ))}
        </div>
      ) : (
        <Card className="overflow-hidden">
          <table className="w-full min-w-[600px] table-auto border-collapse text-left text-sm text-slate-300">
            <thead className="bg-slate-900/60 text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-4 py-3">Solicitud</th>
                <th className="px-4 py-3">Mascota</th>
                <th className="px-4 py-3">Mensaje</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.id} className="border-t border-slate-800/60">
                  <td className="px-4 py-3 font-medium text-white">{request.id.slice(0, 8)}</td>
                  <td className="px-4 py-3">{request.petId.slice(0, 8)}</td>
                  <td className="px-4 py-3 text-slate-300">
                    {request.message.length > 80 ? `${request.message.slice(0, 77)}...` : request.message}
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-slate-800/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
                      {request.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-400">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {!requests.length && (
                <tr>
                  <td className="px-4 py-6 text-center text-slate-400" colSpan={5}>
                    Aun no tienes solicitudes en este filtro.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  )
}

export default FoundationDashboardPage
