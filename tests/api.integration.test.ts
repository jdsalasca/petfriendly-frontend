import nock from 'nock'
import { afterEach, beforeAll, beforeEach, describe, expect, test } from 'vitest'
import { fetchPets, fetchPetById } from '@/api/pets'
import { fetchFoundations } from '@/api/foundations'
import { login, register } from '@/api/auth'
import { sendContactMessage } from '@/api/contact'
import { submitAdoptionRequest } from '@/api/adoptions'

const apiBaseUrl = process.env.VITE_API_BASE_URL ?? 'https://pets-adoption-h8e6.onrender.com/api/v1'
const apiUrl = new URL(apiBaseUrl)
const apiOrigin = `${apiUrl.protocol}//${apiUrl.host}`
const apiPrefix = apiUrl.pathname === '/' ? '' : apiUrl.pathname

describe('API clients', () => {
  beforeAll(() => {
    nock.disableNetConnect()
  })

  beforeEach(() => {
    nock.cleanAll()
  })

  afterEach(() => {
    if (!nock.isDone()) {
      throw new Error(`Pending HTTP mocks: ${nock.pendingMocks().join(', ')}`)
    }
  })

  test('fetches pets list with filters', async () => {
    nock(apiOrigin)
      .get(`${apiPrefix}/pets`)
      .query({ size: '12', page: '0', status: 'Available' })
      .reply(200, {
        content: [
          {
            id: 'pet-123',
            name: 'Luna',
            status: 'Available'
          }
        ],
        totalElements: 1,
        totalPages: 1,
        number: 0,
        size: 12
      })

    const result = await fetchPets({ status: 'Available' })
    expect(result.content).toHaveLength(1)
    expect(result.content[0].name).toBe('Luna')
  })

  test('fetches individual pet', async () => {
    nock(apiOrigin)
      .get(`${apiPrefix}/pets/pet-999`)
      .reply(200, { id: 'pet-999', name: 'Toby', status: 'Available' })

    const pet = await fetchPetById('pet-999')
    expect(pet.name).toBe('Toby')
  })

  test('fetches foundations and normalizes array response', async () => {
    nock(apiOrigin)
      .get(`${apiPrefix}/foundations`)
      .query({ size: '20', page: '0' })
      .reply(200, [
        { id: 'foundation-1', name: 'Huellas', city: 'Bogotá' }
      ])

    const result = await fetchFoundations()
    expect(result.content).toHaveLength(1)
    expect(result.content[0].name).toBe('Huellas')
    expect(result.totalElements).toBe(1)
  })

  test('logs in user against backend', async () => {
    nock(apiOrigin)
      .post(`${apiPrefix}/auth/login`, {
        email: 'demo.user@petfriendly.dev',
        password: 'DemoPa55!'
      })
      .reply(200, { accessToken: 'token', tokenType: 'Bearer' })

    const response = await login({ email: 'demo.user@petfriendly.dev', password: 'DemoPa55!' })
    expect(response.accessToken).toBe('token')
  })

  test('registers user and returns message', async () => {
    nock(apiOrigin)
      .post(`${apiPrefix}/auth/register`, (body) => 'email' in body && 'password' in body)
      .reply(200, { message: 'Registered' })

    const response = await register({
      firstName: 'Ana',
      lastName: 'Perez',
      email: 'ana@example.com',
      password: 'Secr3t!',
      city: 'Lima'
    })

    expect(response.message).toBe('Registered')
  })

  test('sends contact message to foundation', async () => {
    nock(apiOrigin)
      .post(`${apiPrefix}/contact-messages`, (body) => body.foundation?.id === 'foundation-1')
      .reply(200, { message: 'OK' })

    const response = await sendContactMessage({
      foundationId: 'foundation-1',
      senderName: 'Carlos',
      senderEmail: 'carlos@example.com',
      message: 'Hola'
    })

    expect(response.message).toBe('OK')
  })

  test('submits adoption request', async () => {
    nock(apiOrigin)
      .post(`${apiPrefix}/adoption-requests`, {
        petId: 'pet-123',
        message: 'Quiero adoptar',
        experience: 'Tengo otras mascotas'
      })
      .reply(201, { message: 'Created' })

    const response = await submitAdoptionRequest({
      petId: 'pet-123',
      message: 'Quiero adoptar',
      experience: 'Tengo otras mascotas'
    })

    expect(response.message).toBe('Created')
  })
})
