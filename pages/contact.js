import React from 'react'
import Link from 'next/link'

import { FiSmile } from 'react-icons/fi'

const contact = () => {
  return (
    <section className='page-wrapper'>
      <FiSmile size={75} />
      <h1>No content is available for the <span>Contact Page</span> right now.</h1>
      <Link href='/'><button>Go to the shopping page</button></Link>
    </section>
  )
}

export default contact