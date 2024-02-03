import React from 'react'
import Layout from '../components/Layout/Layout'
import '../App.css';
import List from './List';
const About = () => {
  return (
    <Layout>
      <div className='container my-2'>
        <h1 className='select-sr my-3 text-center'>About Us</h1>
        <List></List>
      </div>
    </Layout>
  )
}

export default About