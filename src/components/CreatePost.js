import React,  { useState } from 'react'

const CreatePost = ({editContent, createPostMutation, editPostMutation, postId, updateStoreAfterPost, closeModal, handleActionMessage, setRenderMessage, setMessage, setDeletedPostId}) => {

  const postMutation = createPostMutation ? createPostMutation : editPostMutation;
  const [content, setContent] = useState('');

  return (
    <div className="create-post">
      <div className="create-post-image"> </div>
      <input
        value={editContent & !content ? editContent : content}
        onChange={e => setContent(e.target.value)}
        type="text"
        placeholder="What's happening?"
      />
     <button onClick={() => postMutation({variables: postId ? { id: postId, content, deleted: false, postId: postId } : { content, deleted: false } })
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
