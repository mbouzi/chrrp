import React,  { useState }  from 'react'
import { timeDifferenceForDate } from '../utils'
import edit from "../styles/assets/edit.svg"
import hoverEdit from "../styles/assets/hover-edit.svg"
import cancel from "../styles/assets/cancel.svg"


import CreatePost from './CreatePost'

const renderEditModal = (editInput, setEditInput, post, updateStoreAfterPost, handleActionMessage, editPostMutation, setRenderMessage, setMessage, setActionMessageError) => {
  if(editInput) {
    return (
      <div className="update-modal">
        <div className="update-post-wrapper">
          <CreatePost
            updateStoreAfterPost={updateStoreAfterPost}
            editContent={post.content}
            postId={post.id}
            closeModal={() => setEditInput(false)}
            handleActionMessage={handleActionMessage}
            setRenderMessage={setRenderMessage}
            setMessage={setMessage}
            editPostMutation={editPostMutation}
            setActionMessageError={setActionMessageError}
          />
          <p onClick={() => setEditInput(false)}>Cancel</p>
        </div>
      </div>
    )
  }
}

const renderDropdown = (openDropdown, deletePostMutation, setEditInput, post, handleActionMessage, setRenderMessage, setMessage, setDeletedPostId, setActionMessageError) => {
  if(openDropdown) {
    return (
      <div className="dropdown">
        <div className="arrow"> </div>
        <div className="inner-arrow"> </div>
        <div
          onClick={() => setEditInput(true)}
          className="delete"
        >
          <img alt="cancel" src={cancel} />
          <p>Edit</p>
        </div>
        <div
          onClick={
            () => deletePostMutation({variables: {id: post.id, postId: post.id, deleted: true}})
            .then(result => handleActionMessage(null, post.id, setRenderMessage, setMessage, setDeletedPostId))
            .catch((error) => {
              handleActionMessage("There was an error when deleteding your post", null, setRenderMessage, setMessage, setDeletedPostId, setActionMessageError)
              console.log("Error when updating post:", error)
            })
          }
          className="delete"
        >
          <img alt="cancel" src={cancel} />
          <p>Delete</p>
        </div>
      </div>
    )
  }
}

const Post = ({post, updateStoreAfterPost, handleActionMessage, deletePostMutation, editPostMutation, setRenderMessage, setMessage, setDeletedPostId, setActionMessageError}) => {

  const [editInput, setEditInput] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [hoverEditIcon, setHoverEditIcon] = useState(false);

  return (
    <div  className="post">
      {setRenderMessage && renderEditModal(editInput, setEditInput, post, updateStoreAfterPost, handleActionMessage, editPostMutation, setRenderMessage, setMessage, setActionMessageError)}
      <div className="user-post-info">
        <div className="user-post-image"></div>
        <div className="user-post-details">
          <p className="user-post-username">{post.postedBy.name}</p>
          <p className="user-post-date"> {timeDifferenceForDate(post.createdAt)}</p>
        </div>
      </div>
      { setRenderMessage &&
        <div
          onMouseEnter={() => setHoverEditIcon(!hoverEditIcon)}
          onMouseLeave={() => setHoverEditIcon(!hoverEditIcon)}
          onClick={() => setOpenDropdown(!openDropdown)}
          className="edit-dropdown"
        >
          <img alt="edit" src={hoverEditIcon ? hoverEdit : edit} />
          {renderDropdown(openDropdown, deletePostMutation, setEditInput, post, handleActionMessage, setRenderMessage, setMessage, setDeletedPostId, setActionMessageError)}
        </div>
      }
      <p className="post-content">{post.content}</p>
    </div>
  )
}

export default Post
