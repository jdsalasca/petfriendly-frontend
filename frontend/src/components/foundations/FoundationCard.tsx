import type { Foundation } from '@/types/foundation'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

interface Props {
  foundation: Foundation
}

export const FoundationCard = ({ foundation }: Props) => {
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">{foundation.name}</h3>
          <p className="text-sm text-slate-300">{foundation.city ?? 'Ciudad no registrada'}</p>
        </div>
        {foundation.status && <Badge tone={foundation.status === 'Active' ? 'emerald' : 'slate'}>{foundation.status}</Badge>}
      </div>
      <p className="text-sm leading-relaxed text-slate-300">
        {foundation.description ?? 'Esta fundacion aun no ha completado su descripcion.'}
      </p>
      <div className="flex flex-wrap gap-3 text-sm text-slate-300">
        {foundation.email && <span className="rounded-full bg-slate-800/80 px-3 py-1">{foundation.email}</span>}
        {foundation.phone && <span className="rounded-full bg-slate-800/80 px-3 py-1">{foundation.phone}</span>}
        {foundation.website && (
          <a
            className="rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-200 transition hover:text-emerald-100"
            href={foundation.website}
            target="_blank"
            rel="noreferrer"
          >
            Sitio web
          </a>
        )}
      </div>
    </Card>
  )
}
