import React, { Component } from 'react'
import Feed from './Feed'
import CreatePost from './CreatePost'
import AccountInfo from './AccountInfo'

import '../styles/profile.css'

class Profile extends Component {
  // state = {
  //   description: '',
  //   url: '',
  // }

  render() {
    // const { content } = this.state
    return (
      <div className="profile">
        <AccountInfo />
        <div className="post-actions">
          <CreatePost />
          <Feed />
        </div>
      </div>
    )
  }
}

export default Profile
