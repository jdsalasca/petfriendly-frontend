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

const loginSchema = z.object({
  email: z.string().email('Ingresa un correo valido'),
  password: z.string().min(6, 'La contrasena debe tener al menos 6 caracteres')
})

type LoginValues = z.infer<typeof loginSchema>

const LoginPage = () => {
  const { login, isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/pets', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const onSubmit = async (values: LoginValues) => {
    try {
      setError(null)
      await login(values.email, values.password)
      navigate('/pets', { replace: true })
    } catch (err) {
      console.error(err)
      setError('Credenciales invalidas. Verifica tus datos e intenta nuevamente.')
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <Card className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold text-white">Bienvenido de nuevo</h1>
          <p className="text-sm text-slate-400">Accede al panel de adopciones con tu cuenta PetFriendly.</p>
        </div>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="email">Correo electronico</Label>
            <Input id="email" type="email" autoComplete="email" {...form.register('email')} />
            {form.formState.errors.email && (
              <p className="text-xs text-red-300">{form.formState.errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contrasena</Label>
            <Input id="password" type="password" autoComplete="current-password" {...form.register('password')} />
            {form.formState.errors.password && (
              <p className="text-xs text-red-300">{form.formState.errors.password.message}</p>
            )}
          </div>
          {error && <p className="text-sm text-red-300">{error}</p>}
          <Button type="submit" className="w-full" isLoading={isLoading}>
            Ingresar
          </Button>
        </form>
        <p className="text-center text-sm text-slate-400">
          No tienes cuenta?{' '}
          <Link className="text-emerald-300 hover:text-emerald-200" to="/auth/register">
            Registrate aqui
          </Link>
        </p>
      </Card>
    </div>
  )
}

export default LoginPage
