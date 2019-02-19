import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import Sidebar from '~src/shared/Components/common/Sidebar'

if(process.browser) {
  require('./Header.scss')
}

const Header = ({ context = {}, linskMarkUp, showSidebar, setShowSidebar } = {}) =>
  <header className='header'>
    <div className='topnav'>
      {
        !context.isDesktop &&
          <i onClick={setShowSidebar} className={classNames('fa fa-bars', 'topnav__icon', { rotate: showSidebar })}></i>
      }
      <div className='topnav__logo'>
        IdareOu
      </div>
      {
        context.isDesktop
          ? <ul className='topnav__navigation'>{linskMarkUp}</ul>
          : <Sidebar
              linskMarkUp={linskMarkUp}
              showSidebar={showSidebar}
              setShowSidebar={setShowSidebar}
            />
      }
    </div>
  </header>

Header.propTypes = {
  context: PropTypes.object,
  linskMarkUp: PropTypes.array,
  showSidebar: PropTypes.bool,
  setShowSidebar: PropTypes.func
}

export default Header
