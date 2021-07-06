import React from 'react'

import { SaveAsIcon } from '@heroicons/react/solid'
import { useForm } from 'react-hook-form'
import { useAsyncState } from 'just-hook'
import { TextField } from '@components/fields'
import theme from '@styles/theme'
import { useRouter } from 'next/router'
import { ROUTES } from '@constants/routes'
import { postCompany } from '@services/company'
import { ICompanyData } from '@services/company/types'
import toast, { Toaster } from 'react-hot-toast'

const SignUpForm: React.FC = () => {
  const { register, handleSubmit } = useForm()
  const { loading, setLoading } = useAsyncState()
  const { push } = useRouter()

  const onSubmit = async ({
    password,
    phone,
    nif,
    email,
    designation
  }: ICompanyData) => {
    setLoading(true)
    try {
      await postCompany({
        designation,
        email,
        nif,
        password,
        phone
      })

      toast.success('Empresa adicionado com sucesso.', {
        duration: 4000,
        position: 'top-right'
      })

      setTimeout(() => push(ROUTES.SIGN_IN).then())
    } catch (error) {
      toast.error(error.message, {
        duration: 4000,
        position: 'top-right',
        style: {
          background: '#d85959',
          color: '#fff'
        }
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <Toaster />
      <input type="hidden" {...register('remember')} name="remember" />
      <div className="rounded-md shadow-sm -space-y-px">
        <TextField
          id="designation"
          name="designation"
          type="text"
          {...register('designation')}
          required
          className="rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="Denominação  "
        />
        <TextField
          id="nif"
          name="nif"
          type="text"
          {...register('nif')}
          required
          className="rounded relative block w-full my-3 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="NIF"
        />
        <TextField
          id="phone"
          name="phone"
          type="text"
          {...register('phone')}
          required
          className="rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="Telefone"
        />
        <TextField
          id="email"
          name="email"
          type="text"
          {...register('email')}
          required
          className="rounded relative block w-full my-3 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="Email"
        />
        <TextField
          id="password"
          name="password"
          type="password"
          {...register('password')}
          required
          className="rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="Password"
        />
      </div>

      <div className="flex items-center justify-end">
        <div className="text-sm">
          <a
            href="#"
            className="font-medium text-indigo-600 hover:text-indigo-500"
            onClick={() => push(ROUTES.SIGN_IN).then()}
          >
            Já possui uma conta?
          </a>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
          style={{
            background: theme.colors.primary
          }}
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <SaveAsIcon
              className="h-5 w-5 text-indigo-400 group-hover:text-indigo-400"
              aria-hidden="true"
            />
          </span>
          {loading ? 'laoding...' : 'Cadastrar'}
        </button>
      </div>
    </form>
  )
}

export default SignUpForm
