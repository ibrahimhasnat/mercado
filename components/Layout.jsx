import React from 'react'
import Head from 'next/head'

import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <div className='layout'>

      <Head>
        <title>Mercado</title>
      </Head>

      <Header />

      <main className='container'>
        {children}
      </main>

      <Footer />

    </div>
  )
}

export default Layout