import React,  { useState }  from 'react'
import { timeDifferenceForDate } from '../utils'
import edit from "../styles/assets/edit.svg"
import cancel from "../styles/assets/cancel.svg"
import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';


const EDIT_POST = gql`
  mutation updatePost($postId: ID!, $content: String, $deleted: Boolean){
    updatePost(postId: $postId, content: $content, deleted: $deleted) {
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

const Post = ({post, deletePost}) => {

  const [setEditPost, { data }] = useMutation(EDIT_POST);

  const [content, setContent] = useState('');
  const [deleted, setDeleted] = useState(false);


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
        </div>
      </div>
      <p className="post-content">{post.content}</p>
    </div>
  )
}

export default Post
