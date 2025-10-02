import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/context/AuthContext'

const registerSchema = z
  .object({
    firstName: z.string().min(2, 'Ingresa al menos 2 caracteres'),
    lastName: z.string().min(2, 'Ingresa al menos 2 caracteres'),
    email: z.string().email('Ingresa un correo valido'),
    password: z.string().min(6, 'La contrasena debe tener al menos 6 caracteres'),
    phone: z.string().optional(),
    city: z.string().optional()
  })

type RegisterValues = z.infer<typeof registerSchema>

const RegisterPage = () => {
  const { register: registerUser, isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phone: '',
      city: ''
    }
  })

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/pets', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const onSubmit = async (values: RegisterValues) => {
    try {
      setError(null)
      await registerUser(values)
      navigate('/pets', { replace: true })
    } catch (err) {
      console.error(err)
      setError('No fue posible crear la cuenta. Intenta nuevamente en unos minutos.')
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <Card className="w-full max-w-2xl space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold text-white">Registrate en PetFriendly</h1>
          <p className="text-sm text-slate-400">
            Crea tu cuenta para iniciar solicitudes de adopcion y seguir el proceso en tiempo real.
          </p>
        </div>
        <form className="grid gap-4 sm:grid-cols-2" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="firstName">Nombre</Label>
            <Input id="firstName" {...form.register('firstName')} />
            {form.formState.errors.firstName && (
              <p className="text-xs text-red-300">{form.formState.errors.firstName.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Apellido</Label>
            <Input id="lastName" {...form.register('lastName')} />
            {form.formState.errors.lastName && (
              <p className="text-xs text-red-300">{form.formState.errors.lastName.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Correo electronico</Label>
            <Input id="email" type="email" autoComplete="email" {...form.register('email')} />
            {form.formState.errors.email && (
              <p className="text-xs text-red-300">{form.formState.errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contrasena</Label>
            <Input id="password" type="password" autoComplete="new-password" {...form.register('password')} />
            {form.formState.errors.password && (
              <p className="text-xs text-red-300">{form.formState.errors.password.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telefono (opcional)</Label>
            <Input id="phone" placeholder="Ej: +573001112233" {...form.register('phone')} />
            {form.formState.errors.phone && (
              <p className="text-xs text-red-300">{form.formState.errors.phone.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">Ciudad</Label>
            <Input id="city" placeholder="Ciudad principal" {...form.register('city')} />
            {form.formState.errors.city && (
              <p className="text-xs text-red-300">{form.formState.errors.city.message}</p>
            )}
          </div>
          {error && <p className="sm:col-span-2 text-sm text-red-300">{error}</p>}
          <div className="sm:col-span-2">
            <Button type="submit" className="w-full" isLoading={isLoading}>
              Crear cuenta
            </Button>
          </div>
        </form>
        <p className="text-center text-sm text-slate-400">
          Ya tienes cuenta?{' '}
          <Link className="text-emerald-300 hover:text-emerald-200" to="/auth/login">
            Inicia sesion
          </Link>
        </p>
      </Card>
    </div>
  )
}

export default RegisterPage
