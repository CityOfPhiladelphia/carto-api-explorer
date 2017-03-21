import React from 'react'

export default function Header () {
  return (
    <header data-swiftype-index='false' className='site-header'>
      <div className='row site-branding'>
        <div className='small-24 medium-24 columns'>
          <a href='https://beta.phila.gov' className='logo pam'>
            <img src='//cityofphiladelphia.github.io/patterns/images/city-of-philadelphia-white.png' alt='City of Philadelphia' />
          </a>
          <h1 className='site-title'>phila.gov</h1>
          <h2 className='site-description'>City of Philadelphia</h2>
        </div>
      </div>
      <div className='row expanded'>
        <div className='columns'>
          <div className='row'>
            <div className='large-24 columns'>
              <nav>
                <ul className='breadcrumbs'>
                  <li><a href='https://beta.phila.gov'>Home</a></li>
                  <li><a href='http://phila.gov/data/'>Data</a></li>
                  <li>API Explorer</li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
