import React from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth'

const HomePage = () => {
  const [auth]= useAuth("");
  return (
    <Layout>
        <h1>HomePage</h1>
        <p> {JSON.stringify(auth)}</p>
    </Layout>
  )
}

export default HomePage