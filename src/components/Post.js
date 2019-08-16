import React from 'react'
import { timeDifferenceForDate } from '../utils'
import edit from "../styles/assets/edit.svg"
import cancel from "../styles/assets/cancel.svg"


const Post = ({post}) => {
  console.log("POST:", post)
  return (
    <div className="post">
      <div className="user-post-info">
        <div className="user-post-image"></div>
        <div className="user-post-details">
          <p className="user-post-username">{post.postedBy.name}</p>
          <p className="user-post-date"> {timeDifferenceForDate(post.createdAt)}</p>
        </div>
      </div>
      <div className="edit-dropdown">
        <img src={edit} />
        <div className="dropdown">
            <p><span><img src={cancel} /></span>Delete</p>
        </div>
      </div>
      <p className="post-content">{post.content}</p>
    </div>
  )
}

export default Post
