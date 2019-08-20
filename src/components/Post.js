import React,  { useState }  from 'react'
import { Link } from 'react-router-dom'

import { timeDifferenceForDate } from '../utils'
import edit from "../styles/assets/edit.svg"
import hoverEdit from "../styles/assets/hover-edit.svg"
import cancel from "../styles/assets/cancel.svg"

import styled from '@emotion/styled';
import {fontSizes, colors} from '../styles/defaultTheme'

import CreatePost from './CreatePost'

const PostWrapper = styled('div')`
  min-height: 93px;
  border-bottom: 1px solid rgba(126, 139, 156, 0.24);
`

const EditDropdown = styled('div')`
  float: right;
  position: relative;
  right: 29px;
  bottom: 6px;
  cursor: pointer;
`

const Dropdown = styled('div')`
  position: absolute;
  border: 1px solid rgba(126, 139, 156, 0.6);
  border-bottom: none;
  border-radius: 3px;
  right: -40px;
  z-index: 1;
  top: 30px;
`

const DropdownOption = styled('div')`
  background: #FFFFFF;
  border-bottom: 1px solid rgba(126, 139, 156, 0.6);
  border-top: none;
  box-sizing: border-box;
  box-shadow: 0px 2px 11px rgba(126, 139, 156, 0.3);
  padding: 11px;
  color: ${colors.grey};
  display: flex;
  border-radius: 3px;
  :hover {
    background: ${colors.blue};
    color: #fff;
  }
`

const DropdownOptionName = styled('p')`
  margin: 0;
  margin-left: 5px;
`

const UserPostInfo = styled('div')`
  height: 32px;
  left: 25px;
  top: 25px;
  position: relative;
`

const UserPostImage = styled('div')`
  width: 32px;
  height: 32px;
  background: grey;
  border-radius: 50px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

const UserPostDetails = styled('div')`
  position: relative;
  left: 45px;
  bottom: 50px;
`

const UserPostUsername = styled('p')`
  font-weight: bold;
  font-size: ${fontSizes.md};
`

const UserPostDate = styled('p')`
  position: relative;
  bottom: 12px;
  font-size: ${fontSizes.sm};
  line-height: ${fontSizes.md};
  color:  ${colors.grey};
`

const PostContent = styled('p')`
  margin: 40px 0px 30px 26px;
  font-size: ${fontSizes.default};
  word-break: break-word;
  line-height: 19px;
  overflow: hidden;
  width: 80%;
`

const Arrow = styled('div')`
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 6px solid rgba(126, 139, 156, 0.6);
  position: absolute;
  left: 35px;
  bottom: 84px;
`

const UpdateModal = styled('div')`
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 2;
  left: 0;
  top: 0;
  background-color: rgba(0,0,0, 0.8705882352941177);
  overflow-x: hidden;
  transition: 0.5s;
  text-align: center;
  @media screen and (max-width: 690px) {
    margin: 30% auto;
  }
`


const renderEditModal = (editInput, setEditInput, post, updateStoreAfterPost, handleActionMessage, editPostMutation, setRenderMessage, setMessage, setActionMessageError) => {
  if(editInput) {
    return (
      <UpdateModal>
        <div style={{margin: "10% auto"}}>
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
            style={{margin: "0 auto"}}
          />
          <p style={{color: "#fff", cursor: "pointer"}} onClick={() => setEditInput(false)}>Cancel</p>
        </div>
      </UpdateModal>
    )
  }
}

const renderDropdown = (openDropdown, deletePostMutation, setEditInput, post, handleActionMessage, setRenderMessage, setMessage, setDeletedPostId, setActionMessageError) => {
  if(openDropdown) {
    return (
      <Dropdown>
        <Arrow></Arrow>
        <Arrow style={{borderBottom: "4px solid #FFF"}}> </Arrow>
        <DropdownOption onClick={() => setEditInput(true)}>
          <img alt="cancel" src={cancel} />
          <DropdownOptionName>Edit</DropdownOptionName>
        </DropdownOption>
        <DropdownOption
          onClick={
            () => deletePostMutation({variables: {id: post.id, postId: post.id, deleted: true}})
            .then(result => handleActionMessage(null, post.id, setRenderMessage, setMessage, setDeletedPostId))
            .catch((error) => {
              handleActionMessage("There was an error when deleteding your post", null, setRenderMessage, setMessage, setDeletedPostId, setActionMessageError)
              console.log("Error when updating post:", error)
            })
          }
        >
          <img alt="cancel" src={cancel} />
          <DropdownOptionName>Delete</DropdownOptionName>
        </DropdownOption>
      </Dropdown>
    )
  }
}

const formatLink = (user) => {
  let link = "/"
  if(user.name) {
    return link + user.name
  }
}

const Post = ({post, updateStoreAfterPost, handleActionMessage, deletePostMutation, editPostMutation, setRenderMessage, setMessage, setDeletedPostId, setActionMessageError}) => {

  const [editInput, setEditInput] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [hoverEditIcon, setHoverEditIcon] = useState(false);

  // would ideally want more real estate to click on dropdown
  return (
    <PostWrapper>
      {setRenderMessage && renderEditModal(editInput, setEditInput, post, updateStoreAfterPost, handleActionMessage, editPostMutation, setRenderMessage, setMessage, setActionMessageError)}
      <UserPostInfo>
        <Link to={formatLink(post.postedBy)}>
          <UserPostImage style={{backgroundImage: `url(${post.postedBy && post.postedBy.image})`}}>
          </UserPostImage>
        </Link>
        <UserPostDetails>
          <UserPostUsername>{post.postedBy.name}</UserPostUsername>
          <UserPostDate> {timeDifferenceForDate(post.createdAt)}</UserPostDate>
        </UserPostDetails>
      </UserPostInfo>
      { setRenderMessage &&
        <EditDropdown
          onMouseEnter={() => setHoverEditIcon(!hoverEditIcon)}
          onMouseLeave={() => setHoverEditIcon(!hoverEditIcon)}
          onClick={() => setOpenDropdown(!openDropdown)}
        >
          <img alt="edit" src={hoverEditIcon ? hoverEdit : edit} />
          {renderDropdown(openDropdown, deletePostMutation, setEditInput, post, handleActionMessage, setRenderMessage, setMessage, setDeletedPostId, setActionMessageError)}
        </EditDropdown>
      }
      <PostContent>{post.content}</PostContent>
    </PostWrapper>
  )
}

export default Post
