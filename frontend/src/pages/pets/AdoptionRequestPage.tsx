import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from '@/context/AuthContext'
import { usePetDetailQuery } from '@/hooks/usePetsQuery'
import { submitAdoptionRequest } from '@/api/adoptions'

const adoptionSchema = z.object({
  message: z.string().min(10, 'Cuentalo con mas detalle (minimo 10 caracteres)'),
  experience: z.string().optional(),
  livingSituation: z.string().optional()
})

type AdoptionValues = z.infer<typeof adoptionSchema>

const AdoptionRequestPage = () => {
  const { petId } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [feedback, setFeedback] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const { data: pet } = usePetDetailQuery(petId)

  const form = useForm<AdoptionValues>({
    resolver: zodResolver(adoptionSchema),
    defaultValues: {
      message: '',
      experience: '',
      livingSituation: ''
    }
  })

  useEffect(() => {
    if (!petId) {
      navigate('/pets')
    }
  }, [navigate, petId])

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <Card className="max-w-lg space-y-4">
          <h2 className="text-xl font-semibold text-white">Inicia sesion para continuar</h2>
          <p className="text-sm text-slate-300">
            Debes ingresar a tu cuenta PetFriendly para enviar una solicitud de adopcion. Esto nos permite mantener el
            historial de comunicaciones y hacer seguimiento.
          </p>
          <div className="flex justify-center gap-3">
            <Link to="/auth/login">
              <Button>Ingresar</Button>
            </Link>
            <Link to="/auth/register">
              <Button variant="ghost">Crear cuenta</Button>
            </Link>
          </div>
        </Card>
      </div>
    )
  }

  const onSubmit = async (values: AdoptionValues) => {
    if (!petId) return

    try {
      setError(null)
      await submitAdoptionRequest({
        petId,
        message: values.message,
        experience: values.experience,
        livingSituation: values.livingSituation
      })
      setFeedback('Solicitud enviada con exito. La fundacion te contactara muy pronto.')
      form.reset()
    } catch (err) {
      console.error(err)
      setError('No pudimos enviar la solicitud. Intenta nuevamente en unos minutos.')
    }
  }

  return (
    <div className="flex flex-col gap-10">
      <section className="space-y-2">
        <Link to={`/pets/${petId}`} className="text-sm text-emerald-300 hover:text-emerald-200">
          Volver al perfil de la mascota
        </Link>
        <h1 className="text-3xl font-semibold text-white">Formulario de adopcion</h1>
        <p className="text-sm text-slate-300">
          Cuentalo a la fundacion sobre tu hogar, experiencia y motivaciones para adoptar.
        </p>
        {pet && (
          <Card className="flex items-center justify-between text-sm text-slate-300">
            <span>
              Estas aplicando por <strong className="text-white">{pet.name}</strong>
            </span>
            <span>{pet.city ?? 'Ciudad no registrada'}</span>
          </Card>
        )}
      </section>

      <Card className="max-w-3xl">
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300" htmlFor="message">
              Por que deseas adoptar a esta mascota?
            </label>
            <Textarea id="message" rows={6} {...form.register('message')} />
            {form.formState.errors.message && (
              <p className="text-xs text-red-300">{form.formState.errors.message.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300" htmlFor="experience">
              Tu experiencia previa con mascotas (opcional)
            </label>
            <Textarea id="experience" rows={4} {...form.register('experience')} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300" htmlFor="livingSituation">
              Describe tu hogar y quien vivira con la mascota (opcional)
            </label>
            <Textarea id="livingSituation" rows={4} {...form.register('livingSituation')} />
          </div>
          {error && <p className="text-sm text-red-300">{error}</p>}
          {feedback && <p className="text-sm text-emerald-300">{feedback}</p>}
          <Button type="submit" className="w-full" isLoading={form.formState.isSubmitting}>
            Enviar solicitud
          </Button>
        </form>
      </Card>
    </div>
  )
}

export default AdoptionRequestPage
