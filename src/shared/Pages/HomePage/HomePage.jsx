import React from 'react'

if(process.browser){
  require('./HomePage.scss')
}

const HomePage = () =>
  <div className="homepage">
    <h1 className="homepage__title"> Home Page</h1>
  </div>

export default HomePage