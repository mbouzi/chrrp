import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Feed from './Feed'
import CreatePost from './CreatePost'
import AccountInfo from './AccountInfo'

import '../styles/profile.css'

const FEED_QUERY = gql`
  {
    feed {
      id
      content
      deleted
      createdAt
      postedBy {
        name
      }
    }
  }
`


class Profile extends Component {
  // state = {
  //   description: '',
  //   url: '',
  // }

  _updateCacheAfterPost = (store, post) => {
    const data = store.readQuery({ query: FEED_QUERY, variables: {filter: ""} })
    data.feed.unshift(post)
    store.writeQuery({
      query: FEED_QUERY,
      data
    })
  }

  render() {
    // const { content } = this.state
    return (
      <div className="profile">
        <AccountInfo />
        <div className="post-actions">
          <CreatePost updateStoreAfterPost={this._updateCacheAfterPost}  />
          <Query query={FEED_QUERY}>
            {({ loading, error, data }) => {
              if (loading) return <div>Fetching</div>
              if (error) {
                console.log("ERROR:", error)
                return <div>Error</div>
              }
              const posts = data.feed

              return (
                <Feed posts={posts}  />
              )
            }}
          </Query>
        </div>
      </div>
    )
  }
}

export default Profile
