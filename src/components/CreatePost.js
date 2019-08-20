import React,  { useState } from 'react'


const CreatePost = ({editContent, createPostMutation, editPostMutation, postId, updateStoreAfterPost, closeModal, handleActionMessage, setRenderMessage, setMessage, setActionMessageError}) => {

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
         handleActionMessage("You have edited the post succeessfully!", null, setRenderMessage, setMessage)
         setContent("")
       } else {
         handleActionMessage("You have posted succeessfully!", null, setRenderMessage, setMessage)
         setContent("")
       }
     })
     .catch((error) => {
       console.log("Error when updating post:", error)
       handleActionMessage("There was an error with your post", null, setRenderMessage, setMessage, null, setActionMessageError)
       setContent("")
      })}
     >
      Post
     </button>
    </div>
  )

}

export default CreatePost
