import React, { Component } from 'react'
import Feed from './Feed'


class Profile extends Component {
  state = {
    description: '',
    url: '',
  }

  render() {
    const { content } = this.state
    return (
      <div>
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
