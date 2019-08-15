import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Post from './Post'

const FEED_QUERY = gql`
  {
    feed {
      id
      content
      deleted
      postedBy {
        name
      }
    }
  }
`

const Feed = () => {
  return (
    <Query query={FEED_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <div>Fetching</div>
        if (error) {
          console.log("ERROR:", error)
          return <div>Error</div>
        }
        const posts = data.feed

        return (
          <div className="feed">
            {posts.map(post => <Post key={post.id} post={post} />)}
          </div>
        )
      }}
    </Query>
  )
}

export default Feed
