import React from 'react'

import Post from './Post'



const Feed = ({posts}) => {
  return (
    <div className="feed">
      {posts.map(post => <Post key={post.id} post={post} />)}
    </div>

  )
}

export default Feed
