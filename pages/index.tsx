/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import React from 'react'
import Head from 'next/head'
import WelcomePage from '../components/WelcomePage'
import LoadingPage from '../components/LoadingPage'
import { useUserData, useAuthLoading, useAuthenticated, useSignOut } from '@nhost/react'
import { useAuthQuery } from '@nhost/react-apollo'
import { GET_USER } from '../graphql/query'

const Home: NextPage = () => {

  // initialize this nhost hooks
  const isLoading = useAuthLoading()
  const isAuthenticated = useAuthenticated()
  const userData = useUserData()
  const { signOut } = useSignOut()

  // get the logged in user id
  const getId = userData?.id

  // fetch the data using nhost useAuthQuery, same rani sila sa useQuery sa @apollo/client
  const { data: user, loading, error } = useAuthQuery(GET_USER, {
    variables: {
      getId
    }
  })

  // loading page...
  if (isLoading || loading) {
    return (
      <LoadingPage />
    )
  }

  // if there is an error in useAuthQuery...
  if (error) {
    console.log(error)
  }

  // if not authenticated...
  if (!isAuthenticated) {
    return (
      <WelcomePage />
    )
  }

  // set new user...
  const getUser = user ? user.user : ''
  
  return (
    <React.Fragment>
      <Head>
        <title>{ getUser.displayName}</title>
      </Head>
      <div className="inline-flex items-center justify-center w-full h-screen">
        <div className="flex flex-col items-center justify-center w-full max-w-xl h-full space-y-10">
          <h1 className="font-bold text-2xl">Welcome to Nhost with NextJS</h1>
          <div className="flex flex-col items-center w-full space-y-3">
            {/* <Image
              src={getUser.avatarUrl}
              width={250}
              height={250}
              className="rounded-full"
              layout="intrinsic"
              quality={100}
              alt={`${getUser.displayName} Avatar`}
            /> */}
            {/* img sa lang kay di pa nako ma set sa next.config.js ang mga domain.url */}
            <img
              className="rounded-full"
              src={getUser.avatarUrl}
              width={100}
              height={100}
              alt={`${getUser.displayName} Avatar`}
            />
            <h1 className="font-bold text-5xl">{ getUser.displayName }</h1>
            <h1 className="font-normal text-2xl text-zinc-500">{ getUser.email }</h1>
            <h1 className="font-light text-2xl text-zinc-500">{ getUser.id }</h1>
            <button
              type="button"
              className="w-[10rem] p-3 rounded-xl bg-red-600 text-white"
              onClick={signOut}
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Home
