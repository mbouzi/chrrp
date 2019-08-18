import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import CreatePost from './CreatePost'
import AccountInfo from './AccountInfo'
import Post from './Post'
import ClipLoader from 'react-spinners/ClipLoader';
import { useAlert } from 'react-alert'

import { css } from '@emotion/core';
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

const LoadingStyle = css`
    margin: 0 auto;
    position: relative;
    left: 40%;
    top: 100px;
`;


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
              if (loading) {
                return (
                  <ClipLoader
                    css={LoadingStyle}
                    sizeUnit={"px"}
                    size={50}
                    color="#2582FF"
                    loading={loading}
                  />
                )
              }
              if (error) {
                console.log("ERROR:", error)
                return <div>Error</div>
              }
              const posts = data.feed

              return (
                <div className="feed">
                  {posts.map(post => <Post key={post.id} updateStoreAfterPost={this._updateCacheAfterPost} post={post} />)}
                </div>
              )
            }}
          </Query>
        </div>
      </div>
    )
  }
}

export default Profile
