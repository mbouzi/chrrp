import React, { useState } from 'react'
import { useQuery, useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag'

import CreatePost from './CreatePost'
import AccountInfo from './AccountInfo'
import Post from './Post'
import ClipLoader from 'react-spinners/ClipLoader';
import ActionMessage from './ActionMessage'

import { css } from '@emotion/core';
import styled from '@emotion/styled';
import {fontSizes, colors} from '../styles/defaultTheme'
import searchIcon from '../styles/assets/search-icon.svg'

const FEED_QUERY = gql`
  query feed($filter: String!){
    feed(filter: $filter) {
      id
      content
      deleted
      createdAt
      postedBy {
        name
        image
      }
    }
  }
`

const POST_MUTATION = gql`
  mutation PostMutation($content: String!, $deleted: Boolean!) {
    post(content: $content, deleted: $deleted) {
      id
      content
      deleted
      createdAt
      postedBy {
        name
        image
      }
    }
  }
`

const EDIT_POST = gql`
  mutation updatePost($postId: ID!, $content: String, $deleted: Boolean){
    updatePost(postId: $postId, content: $content, deleted: $deleted) {
      id
      content
      deleted
      createdAt
      postedBy {
        name
        image
      }
    }
  }
`

const USER_QUERY = gql`
  query user($name: String) {
    user(name: $name) {
      id
      name
      image
      posts {
        id
        content
        deleted
        createdAt
        postedBy {
          name
          image
        }
      }
    }
  }
`

const LoadingStyle = css`
    margin: 0 auto;
    position: relative;
    left: 40%;
    top: 100px;
`;

const ProfileWrapper = styled('div')`
  width: 660px;
  margin: 0 auto;
  @media screen and (max-width: 690px) {
    width: 100%;
  }
`

const Feed = styled('div')`
  background: #FFFFFF;
  box-shadow: 0px 4px 60px rgba(26, 40, 60, 0.14);
  border-radius: 10px;
  margin: 20px 0;
  @media screen and (max-width: 690px) {
    width: 91%;
    margin: 0 auto;
  }
`

const SearchBarWrapper = styled('div')`
  width: 660px;
  margin: 0 auto;
  position: absolute;
  @media screen and (max-width: 690px) {
    right: 4%;
  }
`

const SearchBarInput = styled('input')`
  float: right;
  bottom: 48px;
  position: relative;
  border-radius: 55px;
  border: 1px solid #B2B9C4;
  box-sizing: border-box;
  width: 227px;
  height: 30px;
  padding-left: 22px;
  font-size: ${fontSizes.md};
  ::placeholder {
    color: ${colors.grey};
    opacity: .6;
  }
  ::-ms-input-placeholder {
    color: ${colors.grey};
    opacity: .6;
  }
  ::-ms-input-placeholder {
    color: ${colors.grey};
    opacity: .6;
  }
`

const PostActions = styled('div')`
  width: 392px;
  float: right;
  @media screen and (max-width: 690px) {
    width: 100%;
    margin: 0 auto;
    float: none;
  }
`

const _updateCacheAfterPost = (store, post, filter, deleteMutation) => {
  if(deleteMutation) {
    const data = store.readQuery({ query: FEED_QUERY, variables: {filter: filter} })
    store.writeQuery({
      query: FEED_QUERY,
      data: {
        feed: data.feed.filter((filteredPost, index) => {
          return filteredPost.id !== post.id
        })
      },
      variables: {filter: filter}
    })
  } else {
    const data = store.readQuery({ query: FEED_QUERY, variables: {filter: filter} })
    data.feed.unshift(post)
    store.writeQuery({
      query: FEED_QUERY,
      data
    })
  }
}


const handleActionMessage = (message, postId, setRenderMessage, setMessage, setDeletedPostId, setActionMessageError) => {
  if(setActionMessageError) {
    setActionMessageError(true)
    setTimeout( function(){
      setActionMessageError(false)
    }, 4000 );
  }
  setMessage(message ? message : "")
  setRenderMessage(true)
  setTimeout( function(){
    setRenderMessage(false)
  }, 4000 );
  if(postId && setDeletedPostId) {
    setDeletedPostId(postId ? postId : "")
  }
}


const renderFeed = (posts, loading, error, deletePostMutation, editPostMutation, setRenderMessage, setMessage, setDeletedPostId, setActionMessageError) => {

  if (loading) {
    return (
      <ClipLoader
        css={LoadingStyle}
        sizeUnit={"px"}
        size={50}
        color="#2582FF"
        loading={loading}
      />
    )
  }
  if (error) {
    console.log("ERROR:", error)
  }

  if(posts) {
    return (
      <Feed>
        {posts.map((post, index) =>
          <Post
            key={index}
            updateStoreAfterPost={_updateCacheAfterPost}
            post={post}
            handleActionMessage={handleActionMessage}
            setRenderMessage={setRenderMessage}
            setMessage={setMessage}
            setDeletedPostId={setDeletedPostId}
            editPostMutation={editPostMutation}
            deletePostMutation={deletePostMutation}
            setActionMessageError={setActionMessageError}
          />
        )}
      </Feed>
    )
  } else {
    return <p>No Posts</p>
  }
}

const Profile = ({match, currentUser}) => {

  const username = match.params.name;

  const [renderMessage, setRenderMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [deletedPostId, setDeletedPostId] = useState("");
  const [filter, setFilter] = useState("");
  const [actionMessageError, setActionMessageError] = useState(false);



  const [createPostMutation] = useMutation(POST_MUTATION,{
    update(store, { data: { post } }) {
        if(post) {
          _updateCacheAfterPost(store, post, filter)
        }
      }
  });

  const [editPostMutation] = useMutation(EDIT_POST);

  const [deletePostMutation] = useMutation(EDIT_POST,{
    update(store, { data: dataTwo }) {
        _updateCacheAfterPost(store, dataTwo.updatePost,filter, "true")
      }
  });

  const [undoDeletePostMutation] = useMutation(EDIT_POST,{
    update(store, { data: dataThree }) {
      if(dataThree) {
        _updateCacheAfterPost(store, dataThree.updatePost, filter)
      }
    }
  });

  const { data: dataFour, loading, error} = useQuery(FEED_QUERY,
    {variables: {filter: filter}}
  );

  const { data: dataFive, loading: loadingTwo, error: errorTwo} = useQuery(USER_QUERY,
    {variables: {name: username}}
  );

  // missing searchbar icon
  return (
    <ProfileWrapper>
      <SearchBarWrapper>
        <SearchBarInput
          value={filter}
          onChange={e => setFilter(e.target.value)}
          type="text"
          placeholder="Search"
        />
      </SearchBarWrapper>
      <AccountInfo user={dataFive && dataFive.user ? dataFive.user : currentUser}/>
      <PostActions >
        <CreatePost
          updateStoreAfterPost={_updateCacheAfterPost}
          handleActionMessage={handleActionMessage}
          setRenderMessage={setRenderMessage}
          setMessage={setMessage}
          createPostMutation={createPostMutation}
          setActionMessageError={setActionMessageError}
          currentUser={currentUser}
        />
          {username && dataFive && dataFive.user && dataFive.user.id !== currentUser.id ? renderFeed(dataFive && dataFive.user.posts, loadingTwo, errorTwo) :
            renderFeed(dataFour && dataFour.feed, loading, error, deletePostMutation, editPostMutation, setRenderMessage, setMessage, setDeletedPostId, setActionMessageError)}
      </PostActions>
      <ActionMessage
        error={actionMessageError}
        visible={renderMessage}
        message={message}
        closeMessage={() => setRenderMessage(false)}
        undoEdit={ () => undoDeletePostMutation({variables: { id: deletedPostId, deleted: false, postId: deletedPostId }}).then((result) => {
          handleActionMessage("You have succeessfully undone your delete!", null, setRenderMessage, setMessage)
        })
        .catch((error) => {
          console.log("Error when updating post:", error)
          handleActionMessage("There was an error when undoing your delete", null, setRenderMessage, setMessage, null, setActionMessageError)
        })}
      />
    </ProfileWrapper>
  )
}

export default Profile
