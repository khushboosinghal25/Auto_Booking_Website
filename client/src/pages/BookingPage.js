import React from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/Layout/Layout'

const BookingPage = () => {
  const {source,destination,providerId} = useParams();
  return (
    <Layout>
  <h1>Booking Page</h1>
  <p>Source: {source}</p>
      <p>Destination: {destination}</p>
      <p>Provider ID: {providerId}</p>
    </Layout>
  )
}

export default BookingPage