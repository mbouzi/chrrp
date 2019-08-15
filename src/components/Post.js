import React from 'react'

const Post = ({post}) => {

  return (
    <div className="post">
      {post.content}
    </div>
  )
}

export default Post
