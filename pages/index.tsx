import type { NextPage } from 'next'
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useAccessToken, useAuthenticated, useUserData } from '@nhost/react'

const Home: NextPage = () => {

  const isAuthenticated = useAuthenticated()
  const user = useUserData()
  const accessToken = useAccessToken()

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen space-y-5">
        <h1 className="font-bold text-2xl">You are not Authenticated</h1>
        <Link href="/signin">
          <a className="p-3 w-[10rem] rounded-xl fon-bold text-xl text-center text-white bg-blue-600">Sign In</a>
        </Link>
      </div>
    )
  }
  
  return (
    <React.Fragment>
      <Head>
        <title>Nhost + NextJS</title>
      </Head>
      <div className="inline-flex items-center justify-center w-full h-screen">
        <h1 className="font-bold text-2xl">Welcome to Nhost with NextJS</h1>
      </div>
    </React.Fragment>
  )
}

export default Home
