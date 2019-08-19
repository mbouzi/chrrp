import React,  { useState } from 'react'
import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag'
import { useAlert } from 'react-alert'

const CreatePost = ({editContent, createPostMutation, editPostMutation, postId, updateStoreAfterPost, closeModal, handleActionMessage, setRenderMessage, setMessage, setDeletedPostId}) => {

  const postMutation = createPostMutation ? createPostMutation : editPostMutation;
  const [content, setContent] = useState('');
  const [deleted, setDeleted] = useState(false);

  return (
    <div className="create-post">
      <div className="create-post-image"> </div>
      <input
        value={editContent & !content ? editContent : content}
        onChange={e => setContent(e.target.value)}
        type="text"
        placeholder="What's happening?"
      />
     <button onClick={() => postMutation({variables: postId ? { id: postId, content, deleted, postId: postId } : { content, deleted } })
     .then((result) => {
       if(!createPostMutation) {
         closeModal()
         handleActionMessage("You have edited the post succeessfully!", null, setRenderMessage, setMessage, setDeletedPostId)
       } else {
         handleActionMessage("You have posted succeessfully!", null, setRenderMessage, setMessage, setDeletedPostId)
       }
     })
     .catch((error) => console.log("Error when updating post:", error))}
     >
      Post
     </button>
    </div>
  )

}

export default CreatePost
