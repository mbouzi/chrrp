import React from 'react'

import Post from './Post'



const Feed = ({posts, deletePost}) => {
  return (
    <div className="feed">
      {posts.map(post => <Post key={post.id} deletePost={deletePost} post={post} />)}
    </div>

  )
}

export default Feed
