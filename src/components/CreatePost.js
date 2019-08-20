import React,  { useState } from 'react'

import styled from '@emotion/styled';
import {fontSizes, colors} from '../styles/defaultTheme'

const CreatePostWrapper = styled('div')`
  max-width: 392px;
  max-height: 87px;
  background: #FFFFFF;
  box-shadow: 0px 4px 60px rgba(26, 40, 60, 0.14);
  border-radius: 10px;
  padding: 24px;
  @media screen and (max-width: 690px) {
    max-width: 100%;
    width: 83%;
    margin: 20px auto;
    justify-content: space-evenly;
    display: flex;
  }
`

const CreatePostImage = styled('div')`
  width: 40px;
  height: 40px;
  background: grey;
  display: inline-block;
  border-radius: 50px;
  vertical-align: middle;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

const CreatePostInput = styled('input')`
  margin: 0px 24px;
  width: 180px;
  height: 28px;
  border: none;
  font-size: ${fontSizes.default};
  outline: none;
  resize: none;
  ::placeholder {
    color: ${colors.grey};
    opacity: 1;
  }
  :-ms-input-placeholder {
    color: ${colors.grey};
  }
  ::-ms-input-placeholder {
    color: ${colors.grey};
  }
  @media screen and (max-width: 690px) {
    width: 60%;
    margin-top: 5px;
  }
`

const CreatePostButton= styled('button')`
  width: 69.75px;
  height: 30px;
  background: ${colors.blue};
  border-radius: 55px;
  color: #FFF;
  font-weight: bold;
  cursor: pointer;
  border: none;
  @media screen and (max-width: 690px) {
    margin-top: 5px;
  }
`


const CreatePost = ({editContent, createPostMutation, editPostMutation, postId, updateStoreAfterPost, closeModal, handleActionMessage, setRenderMessage, setMessage, setActionMessageError, currentUser, style}) => {

  const postMutation = createPostMutation ? createPostMutation : editPostMutation;
  const [content, setContent] = useState('');

  return (
    <CreatePostWrapper style={style}>
      <CreatePostImage style={{  backgroundImage: `url(${currentUser && currentUser.image})`}}>
      </CreatePostImage>
      <CreatePostInput
        value={editContent & !content ? editContent : content}
        onChange={e => setContent(e.target.value)}
        type="text"
        placeholder="What's happening?"
      />
     <CreatePostButton onClick={() => postMutation({variables: postId ? { id: postId, content, deleted: false, postId: postId } : { content, deleted: false } })
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
       closeModal()
       console.log("Error when updating post:", error)
       handleActionMessage("There was an error with your post", null, setRenderMessage, setMessage, null, setActionMessageError)
       setContent("")
      })}
     >
      Post
     </CreatePostButton>
    </CreatePostWrapper>
  )

}

export default CreatePost
