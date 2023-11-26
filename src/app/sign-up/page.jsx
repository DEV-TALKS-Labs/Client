import { SignUp } from '@clerk/nextjs'
import React from 'react'

function Signup() {
  return (
    <div className='flex justify-center items-center h-screen'>
        <SignUp />
    </div>
  )
}

export default Signup