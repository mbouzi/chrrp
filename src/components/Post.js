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

const editPost = (setEditPost, content, deleted) => {
  setEditPost({variables: {content: content, deleted: deleted}})
  .then(result => window.location.reload())
  .catch(error => console.log("Error when updating post:", error))
}

const renderEditModal = (editInput, setEditInput, post, updateStoreAfterPost) => {
  if(editInput) {
    return (
      <div className="update-modal">
        <CreatePost
          updateStoreAfterPost={updateStoreAfterPost}
          editContent={post.content}
          editMutation={EDIT_POST}
          postId={post.id}
        />
        <p onClick={() => setEditInput(false)}>Cancel</p>
      </div>
      // <div className="update-modal">
      //   <div>
      //     <input
      //       placeholder="edit input"
      //     />
      //     <button
      //       text="Post"
      //     />
      //     <p onClick={() => setEditInput(false)}>Cancel</p>
      //   </div>
      // </div>
    )
  }
}

const renderDropdown = (openDropdown, setEditPost, setEditInput, post) => {
  if(openDropdown) {
    return (
      <div className="dropdown">
        <div
          onClick={
            () => setEditPost({variables: {postId: post.id, deleted: true}})
            .then(result => window.location.reload())
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

const Post = ({post, updateStoreAfterPost}) => {

  const [setEditPost, { data }] = useMutation(EDIT_POST);

  const [content, setContent] = useState('');
  const [deleted, setDeleted] = useState(false);
  const [editInput, setEditInput] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);


  return (
    <div className="post">
      {renderEditModal(editInput, setEditInput, post, updateStoreAfterPost)}
      <div className="user-post-info">
        <div className="user-post-image"></div>
        <div className="user-post-details">
          <p className="user-post-username">{post.postedBy.name}</p>
          <p className="user-post-date"> {timeDifferenceForDate(post.createdAt)}</p>
        </div>
      </div>
      <div onClick={() => setOpenDropdown(!openDropdown)} className="edit-dropdown">
        <img src={edit} />
        {renderDropdown(openDropdown, setEditPost, setEditInput, post)}
      </div>
      <p className="post-content">{post.content}</p>
    </div>
  )
}

export default Post
