import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class Header extends Component {
  render() {
    return (
      <div>
        <div >
          <div className="fw7 mr1">chrrp</div>
          <Link to="/">
            new
          </Link>
          <div className="ml1">|</div>
          <Link to="/create" >
            submit
          </Link>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
