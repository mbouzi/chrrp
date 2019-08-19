import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import logo from '../styles/assets/logo.svg'

import { AUTH_TOKEN } from '../constants'

class Header extends Component {

  render() {

    const authToken = localStorage.getItem(AUTH_TOKEN)

    return (
      <div className="header">
        <div className="logo">
          <Link to="/" >
            <img alt="logo" src={logo} />
          </Link>
        </div>
        <div>
          {authToken ? (
           <div
             className="ml1 pointer black"
             onClick={() => {
               localStorage.removeItem(AUTH_TOKEN)
               this.props.history.push(`/login`)
               window.location.reload();
             }}
           >
             logout
           </div>
         ) : (
           <Link to="/login" className="ml1 no-underline black">
             login
           </Link>
         )}
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
