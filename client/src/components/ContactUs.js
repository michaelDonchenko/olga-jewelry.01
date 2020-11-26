import React from 'react'

const ContactUs = () => {
  return (
    <div
      className='my-3'
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <div className='iconDiv'>
        <a
          target='_blank'
          href='https://www.instagram.com/o.d.art/'
          className='myIcons'
        >
          {' '}
          <i className='fab fa-instagram '></i>
        </a>
      </div>

      <div className='iconDiv'>
        <a
          target='_blank'
          href='https://www.facebook.com/olga.donchenko.1'
          className='myIcons'
        >
          {' '}
          <i className='fab fa-facebook-square '></i>
        </a>
      </div>
      <div className='iconDiv'>
        <i class='fab fa-whatsapp'></i>
      </div>
      <span>054-665-9069</span>
    </div>
  )
}

export default ContactUs
