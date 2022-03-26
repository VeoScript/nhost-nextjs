import type { NextPage } from 'next'
import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import Link from 'next/link'
import LoadingPage from '../components/LoadingPage'
import CustomToast from '../utils/CustomToast'
import { useForm } from 'react-hook-form'
import { Toaster, toast } from 'react-hot-toast'
import { useAuthLoading, useAuthenticated } from '@nhost/react'

interface FormData {
  email: string
  password: string
}

const SignIn: NextPage = () => {

  const isLoading = useAuthLoading()
  const isAuthenticated = useAuthenticated()
  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting }
  } = useForm<FormData>()

  React.useEffect(() => {
    if (isAuthenticated) {
      Router.push('/')
    }
  })

  if (isLoading) {
    return (
      <LoadingPage />
    )
  }

  const onSignIn = async (formData: FormData) => {
    const email = formData.email
    const password = formData.password

    const nhostSignIn = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    if (!nhostSignIn.ok) {
      const json = await nhostSignIn.json()
      toast.custom((t) => (
        <CustomToast
          t={t}
          toast={toast}
          toastMessage={json.message.message}
          toastType="Error"
        />
      ))
      return
    }

    reset()
    Router.push('/')
  }

  return (
    <React.Fragment>
      <Head>
        <title>Sign In</title>
      </Head>
      <div className="inline-flex justify-center w-full h-screen">
        <Toaster />
        <div className="flex flex-col items-center justify-center w-full max-w-md h-full space-y-5">
          <h1 className="font-bold text-2xl">Sign In</h1>
          <form
            onSubmit={handleSubmit(onSignIn)}
            className="inline-block items-center w-full space-y-1"
          >
            <input
              type="email"
              placeholder="Enter Email"
              {...register('email', { required: true })}
              className="outline-none w-full p-3 rounded-lg border-2 border-zinc-500 text-xl"
            />
            <input
              type="password"
              placeholder="Enter Password"
              {...register('password', { required: true })}
              className="outline-none w-full p-3 rounded-lg border-2 border-zinc-500 text-xl"
            />
            {!isSubmitting && (
              <button
                type="submit"
                className="outline-none w-full p-3 rounded-lg text-xl text-white bg-blue-700 transition ease-in-out duration-150 hover:bg-opacity-80"
              >
                Login
              </button>
            )}
            {isSubmitting && (
              <div className="outline-none w-full p-3 rounded-lg text-xl text-center text-white bg-blue-700">
                Loading...
              </div>
            )}
          </form>
          <div className="inline-flex items-center w-full space-x-2">
            <span className="font-light text-sm">Don&apos;t have an account?</span>
            <Link href="/signup">
              <a className="font-bold text-base text-zinc-600 hover:underline">Sign up</a>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default SignIn