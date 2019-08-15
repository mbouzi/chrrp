import React, { Component } from 'react'
import Feed from './Feed'
import '../styles/profile.css'

class Profile extends Component {
  state = {
    description: '',
    url: '',
  }

  render() {
    const { content } = this.state
    return (
      <div className="profile">
        <div className="account-info">

        </div>
        <div className="post-actions">
          <div className="new-post"></div>
          <Feed />
        </div>
      </div>
    )
  }
}

export default Profile
