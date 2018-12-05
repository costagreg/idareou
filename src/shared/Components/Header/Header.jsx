import React from 'react'
import classNames from 'classnames'

import SideBar from '../common/SideBar'

if(process.browser) {
  require('./Header.scss')
}

const Header = ({ context = {}, linskMarkUp, showSideBar, setShowSideBar } = {}) =>
  <header className='header'>
    <div className='topnav'>
      {
        !context.isDesktop &&
          <i onClick={setShowSideBar} className={classNames('fa fa-bars', 'topnav__icon', { rotate: showSideBar })}></i>
      }
      <div className='topnav__logo'>
        IdareOu
      </div>
      {
        context.isDesktop
          ? <ul className='topnav__navigation'>{linskMarkUp}</ul>
          : <SideBar
              linskMarkUp={linskMarkUp}
              showSideBar={showSideBar}
              setShowSideBar={setShowSideBar}
            />
      }
    </div>
  </header>

export default Header
