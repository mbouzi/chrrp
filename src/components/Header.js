import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import logo from '../styles/assets/logo.svg'

class Header extends Component {
  render() {
    return (
      <div className="header">
        <div >
        <Link to="/create" >
          <img src={logo} />
        </Link>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
