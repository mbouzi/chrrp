import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import logo from '../styles/assets/logo.svg'
import chrrp from'../styles/assets/chrrp.svg'

import { AUTH_TOKEN } from '../constants'

import '../styles/header.css'

class Header extends Component {

  render() {

    const authToken = localStorage.getItem(AUTH_TOKEN)

    return (
      <div className="header">
        <div className="logo">
          <Link to="/" >
            <img alt="logo" src={logo} />
            <img className="logo" alt="chrrp" src={chrrp} />
          </Link>
        </div>
        <div>
          {authToken ? (
           <div
             className="logout"
             onClick={() => {
               localStorage.removeItem(AUTH_TOKEN)
               this.props.history.push(`/login`)
               window.location.reload();
             }}
           >
             logout
           </div>
         ) : (
           <Link to="/login" className="logout">
             login
           </Link>
         )}
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
