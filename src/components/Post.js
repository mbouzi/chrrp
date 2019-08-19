import React,  { useState }  from 'react'
import { timeDifferenceForDate } from '../utils'
import edit from "../styles/assets/edit.svg"
import cancel from "../styles/assets/cancel.svg"
import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';

import CreatePost from './CreatePost'

const EDIT_POST = gql`
  mutation updatePost($postId: ID!, $content: String, $deleted: Boolean){
    updatePost(postId: $postId, content: $content, deleted: $deleted) {
      id
      content
      deleted
    }
  }
`

// const editPost = (setEditPost, content, deleted) => {
//   setEditPost({variables: {content: content, deleted: deleted}})
//   .then(result => window.location.reload())
//   .catch(error => console.log("Error when updating post:", error))
// }

const renderEditModal = (editInput, setEditInput, post, updateStoreAfterPost, handleActionMessage) => {
  if(editInput) {
    return (
      <div className="update-modal">
        <div className="update-post-wrapper">
          <CreatePost
            updateStoreAfterPost={updateStoreAfterPost}
            editContent={post.content}
            editMutation={EDIT_POST}
            postId={post.id}
            closeModal={() => setEditInput(false)}
            handleActionMessage={handleActionMessage}
          />
          <p onClick={() => setEditInput(false)}>Cancel</p>
        </div>
      </div>
    )
  }
}

const renderDropdown = (openDropdown, setEditPost, setEditInput, post, handleActionMessage) => {
  if(openDropdown) {
    return (
      <div className="dropdown">
        <div
          onClick={
            () => setEditPost({variables: {id: post.id, postId: post.id, deleted: true}})
            .then(result => handleActionMessage())
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

const Post = ({post, updateStoreAfterPost, handleActionMessage}) => {

  const [setEditPost, { data }] = useMutation(EDIT_POST,{
    update(store, { data }) {
        updateStoreAfterPost(store, data.updatePost, "true")
      }
  });

  const [content, setContent] = useState('');
  const [deleted, setDeleted] = useState(false);
  const [editInput, setEditInput] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);


  return (
    <div className="post">
      {renderEditModal(editInput, setEditInput, post, updateStoreAfterPost, handleActionMessage)}
      <div className="user-post-info">
        <div className="user-post-image"></div>
        <div className="user-post-details">
          <p className="user-post-username">{post.postedBy.name}</p>
          <p className="user-post-date"> {timeDifferenceForDate(post.createdAt)}</p>
        </div>
      </div>
      <div onClick={() => setOpenDropdown(!openDropdown)} className="edit-dropdown">
        <img src={edit} />
        {renderDropdown(openDropdown, setEditPost, setEditInput, post, handleActionMessage)}
      </div>
      <p className="post-content">{post.content}</p>
    </div>
  )
}

export default Post
