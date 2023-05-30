'use client'

import { useApiContext } from '../context/ApiContext'
import { useRouter } from 'next/navigation'
import Toaster from '@/components/Toaster'
import { FormEvent, useRef } from 'react'
import Cookies from 'universal-cookie'
import { toast } from 'react-toastify'

export default function Login() {
  const inputLogin = useRef<HTMLInputElement | null>(null)
  const inputPassword = useRef<HTMLInputElement | null>(null)

  const { login } = useApiContext()
  const router = useRouter()

  const handleSubmitLoginForm = async (e: FormEvent) => {
    e.preventDefault()
    const passwordValue = inputPassword.current?.value
    const loginValue = inputLogin.current?.value
    const cookies = new Cookies()

    if (!loginValue || !passwordValue) return

    const loginRequest = {
      login: loginValue,
      senha: passwordValue,
    }

    const token = await login(loginRequest)
    if (token && token.access_token) {
      cookies.remove('token:clickideia', { path: '/' })
      cookies.set('token:clickideia', token.access_token, { path: '/' })
      router.push('/')
      return
    }
    toast.error('Login ou senha incorretos')
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold mb-8">Login</h1>

        <form
          className="w-full flex flex-col gap-4 max-w-sm"
          onSubmit={handleSubmitLoginForm}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="login"
            >
              Login
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="login"
              type="text"
              placeholder="Digite seu login"
              ref={inputLogin}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Senha
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Digite sua senha"
              ref={inputPassword}
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </>
  )
}
