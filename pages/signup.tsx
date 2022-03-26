import type { NextPage } from 'next'
import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import Link from 'next/link'
import CustomToast from '../utils/CustomToast'
import { useForm } from 'react-hook-form'
import { Toaster, toast } from 'react-hot-toast'

interface FormData {
  email: string
  password: string
  repassword: string
}

const SignUp: NextPage = () => { 
  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting }
  } = useForm<FormData>()
  
  const onSignUp = async (formData: FormData) => {
    const email = formData.email
    const password = formData.password
    const repassword = formData.repassword

    if (password !== repassword) {
      toast.custom((t) => (
        <CustomToast
          t={t}
          toast={toast}
          toastMessage="Password didn't match. Try again."
          toastType="Error"
        />
      ))
      return
    }

    const nhostSignUp = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    if (!nhostSignUp.ok) {
      const json = await nhostSignUp.json()
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

    toast.custom((t) => (
      <CustomToast
        t={t}
        toast={toast}
        toastMessage="Successfull! Thank you for signing up."
        toastType="Success"
      />
    ))

    reset()
    Router.push('/signin')
  }

  return (
    <React.Fragment>
      <Head>
        <title>Sign Up</title>
      </Head>
      <div className="inline-flex justify-center w-full h-screen">
        <Toaster />
        <div className="flex flex-col items-center justify-center w-full max-w-md h-full space-y-5">
          <h1 className="font-bold text-2xl">Sign Up</h1>
          <form
            onSubmit={handleSubmit(onSignUp)}
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
              placeholder="Create Password"
              {...register('password', { required: true })}
              className="outline-none w-full p-3 rounded-lg border-2 border-zinc-500 text-xl"
            />
            <input
              type="password"
              placeholder="Re-enter Password"
              {...register('repassword', { required: true })}
              className="outline-none w-full p-3 rounded-lg border-2 border-zinc-500 text-xl"
            />
            {!isSubmitting && (
              <button
                type="submit"
                className="outline-none w-full p-3 rounded-lg text-xl text-white bg-blue-700 transition ease-in-out duration-150 hover:bg-opacity-80"
              >
                Register
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
            <Link href="/signin">
              <a className="font-bold text-base text-zinc-600 hover:underline">Sign in</a>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default SignUp