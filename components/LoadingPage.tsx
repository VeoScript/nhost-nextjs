import React from 'react'
import Head from 'next/head'

const LoadingPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Loading...</title>
      </Head>
      <div className="flex flex-col items-center justify-center w-full h-screen space-y-3">
        <h1 className="font-bold text-3xl">Checking Security</h1>
        <span className="font-medium text-xl text-zinc-500">Loading...</span>
      </div>
    </React.Fragment>
  )
}

export default LoadingPage