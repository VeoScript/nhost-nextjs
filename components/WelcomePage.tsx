import React from 'react'
import Link from 'next/link'

const WelcomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen space-y-5">
      <h1 className="font-bold text-3xl">Welcome to Nhost + NextJS Integration</h1>
      <h1 className="font-bold text-2xl text-red-600">You are not Authenticated</h1>
      <Link href="/signin">
        <a className="p-3 w-[10rem] rounded-xl fon-bold text-xl text-center text-white bg-blue-600">Sign In</a>
      </Link>
    </div>
  )
}

export default WelcomePage