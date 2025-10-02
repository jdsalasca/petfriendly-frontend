import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useFoundationDetailQuery } from '@/hooks/useFoundationsQuery'
import { sendContactMessage } from '@/api/contact'

const contactSchema = z.object({
  senderName: z.string().min(2, 'Ingresa al menos 2 caracteres'),
  senderEmail: z.string().email('Ingresa un correo valido'),
  subject: z.string().optional(),
  message: z.string().min(10, 'Describe mejor tu mensaje')
})

type ContactValues = z.infer<typeof contactSchema>

const FoundationDetailPage = () => {
  const { foundationId } = useParams()
  const { data: foundation, isLoading, isError } = useFoundationDetailQuery(foundationId)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      senderName: '',
      senderEmail: '',
      subject: '',
      message: ''
    }
  })

  if (isLoading) {
    return <div className="h-64 animate-pulse rounded-3xl bg-slate-900/60" />
  }

  if (isError || !foundation || !foundationId) {
    return (
      <Card className="max-w-lg text-center text-slate-300">
        <p>No pudimos cargar la informacion de esta fundacion.</p>
        <Link className="mt-4 inline-flex" to="/foundations">
          <Button variant="secondary">Volver al listado</Button>
        </Link>
      </Card>
    )
  }

  const onSubmit = async (values: ContactValues) => {
    try {
      setError(null)
      await sendContactMessage({ foundationId, ...values })
      setFeedback('Mensaje enviado. La fundacion se contactara contigo pronto.')
      form.reset()
    } catch (err) {
      console.error(err)
      setError('No pudimos enviar el mensaje. Intenta nuevamente.')
    }
  }

  return (
    <div className="flex flex-col gap-10">
      <section className="space-y-3">
        <Link to="/foundations" className="text-sm text-emerald-300 hover:text-emerald-200">
          Volver a fundaciones
        </Link>
        <h1 className="text-3xl font-semibold text-white">{foundation.name}</h1>
        <p className="text-sm text-slate-300">
          {foundation.city ?? 'Ciudad no registrada'} {foundation.state ? `- ${foundation.state}` : ''}
        </p>
        {foundation.description && (
          <p className="text-base text-slate-300">{foundation.description}</p>
        )}
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
      </section>

      <Card className="max-w-3xl space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Contacta a la fundacion</h2>
          <p className="text-sm text-slate-300">
            Escribe tu mensaje para coordinar visitas, voluntariado o resolver dudas sobre el proceso.
          </p>
        </div>
        <form className="grid gap-4 sm:grid-cols-2" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300" htmlFor="senderName">
              Nombre completo
            </label>
            <Input id="senderName" {...form.register('senderName')} />
            {form.formState.errors.senderName && (
              <p className="text-xs text-red-300">{form.formState.errors.senderName.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300" htmlFor="senderEmail">
              Correo electronico
            </label>
            <Input id="senderEmail" type="email" {...form.register('senderEmail')} />
            {form.formState.errors.senderEmail && (
              <p className="text-xs text-red-300">{form.formState.errors.senderEmail.message}</p>
            )}
          </div>
          <div className="space-y-2 sm:col-span-2">
            <label className="text-sm font-medium text-slate-300" htmlFor="subject">
              Asunto (opcional)
            </label>
            <Input id="subject" {...form.register('subject')} />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <label className="text-sm font-medium text-slate-300" htmlFor="message">
              Mensaje
            </label>
            <Textarea id="message" rows={5} {...form.register('message')} />
            {form.formState.errors.message && (
              <p className="text-xs text-red-300">{form.formState.errors.message.message}</p>
            )}
          </div>
          {error && <p className="sm:col-span-2 text-sm text-red-300">{error}</p>}
          {feedback && <p className="sm:col-span-2 text-sm text-emerald-300">{feedback}</p>}
          <div className="sm:col-span-2">
            <Button type="submit" className="w-full" isLoading={form.formState.isSubmitting}>
              Enviar mensaje
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default FoundationDetailPage
