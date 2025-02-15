"use client"

import { useUser } from '@/context/UserContex'
import React from 'react'

const HomePage =  () => {
const user = useUser()
console.log(user)

  return (
    <div>HomePage</div>
  )
}

export default HomePage