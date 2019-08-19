import React,  { useState } from 'react'
import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag'
import { useAlert } from 'react-alert'


const POST_MUTATION = gql`
  mutation PostMutation($content: String!, $deleted: Boolean!) {
    post(content: $content, deleted: $deleted) {
      id
      content
      deleted
      createdAt
      postedBy {
        name
      }
    }
  }
`

const CreatePost = ({editMutation, editContent, postId, updateStoreAfterPost, closeModal, handleActionMessage}) => {

  const postMutation = editMutation ? editMutation : POST_MUTATION;
  const [content, setContent] = useState('');
  const [deleted, setDeleted] = useState(false);
  const [createPost, { data }] = useMutation(postMutation,{
    update(store, { data: { post } }) {
        if(post) {
          updateStoreAfterPost(store, post)
        }
      }
  });


  return (
    <div className="create-post">
      <div className="create-post-image"> </div>
      <input
        value={editContent & !content ? editContent : content}
        onChange={e => setContent(e.target.value)}
        type="text"
        placeholder="What's happening?"
      />
     <button onClick={() => createPost({variables: postId ? { id: postId, content, deleted, postId: postId } : { content, deleted } })
     .then((result) => {
       if(editMutation) {
         closeModal()
         handleActionMessage("You have edited the post succeessfully!")
       } else {
         handleActionMessage("You have posted succeessfully!")
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
