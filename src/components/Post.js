import React from 'react'

const Post = ({post}) => {
  console.log("POST:", post)
  return (
    <div className="post">
      <div className="user-post-info">
        <div className="user-post-image"></div>
        <div className="user-post-details">
          <p className="user-post-username">{post.postedBy.name}</p>
          <p className="user-post-date">12m</p>
        </div>
      </div>
      <p className="post-content">{post.content}</p>
    </div>
  )
}

export default Post
