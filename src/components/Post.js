import React,  { useState }  from 'react'
import { timeDifferenceForDate } from '../utils'
import edit from "../styles/assets/edit.svg"
import cancel from "../styles/assets/cancel.svg"
import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';

import CreatePost from './CreatePost'


const renderEditModal = (editInput, setEditInput, post, updateStoreAfterPost, handleActionMessage, editPostMutation, setRenderMessage, setMessage, setDeletedPostId) => {
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
            setDeletedPostId={setDeletedPostId}
            editPostMutation={editPostMutation}
          />
          <p onClick={() => setEditInput(false)}>Cancel</p>
        </div>
      </div>
    )
  }
}

const renderDropdown = (openDropdown, deletePostMutation, setEditInput, post, handleActionMessage, setRenderMessage, setMessage, setDeletedPostId) => {
  if(openDropdown) {
    return (
      <div className="dropdown">
        <div
          onClick={
            () => deletePostMutation({variables: {id: post.id, postId: post.id, deleted: true}})
            .then(result => handleActionMessage(null, post.id, setRenderMessage, setMessage, setDeletedPostId))
            .catch(error => console.log("Error when updating post:", error))
          }
          className="delete"
        >
          <img src={cancel} />
          <p>Delete</p>
        </div>
        <div
          onClick={() => setEditInput(true)}
          className="delete"
        >
          <img src={cancel} />
          <p>Edit</p>
        </div>
      </div>
    )
  }
}

const Post = ({post, updateStoreAfterPost, handleActionMessage, createPostMutation, deletePostMutation, editPostMutation, setRenderMessage, setMessage, setDeletedPostId}) => {

  const [content, setContent] = useState('');
  const [deleted, setDeleted] = useState(false);
  const [editInput, setEditInput] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);


  return (
    <div className="post">
      {renderEditModal(editInput, setEditInput, post, updateStoreAfterPost, handleActionMessage, editPostMutation, setRenderMessage, setMessage, setDeletedPostId)}
      <div className="user-post-info">
        <div className="user-post-image"></div>
        <div className="user-post-details">
          <p className="user-post-username">{post.postedBy.name}</p>
          <p className="user-post-date"> {timeDifferenceForDate(post.createdAt)}</p>
        </div>
      </div>
      <div onClick={() => setOpenDropdown(!openDropdown)} className="edit-dropdown">
        <img src={edit} />
        {renderDropdown(openDropdown, deletePostMutation, setEditInput, post, handleActionMessage, setRenderMessage, setMessage, setDeletedPostId)}
      </div>
      <p className="post-content">{post.content}</p>
    </div>
  )
}

export default Post
