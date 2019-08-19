import React, { useState } from 'react'
import { useQuery, useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag'

import CreatePost from './CreatePost'
import AccountInfo from './AccountInfo'
import Post from './Post'
import ClipLoader from 'react-spinners/ClipLoader';
import ActionMessage from './ActionMessage'

import { css } from '@emotion/core';
import '../styles/profile.css'

const FEED_QUERY = gql`
  query feed($filter: String!){
    feed(filter: $filter) {
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

const EDIT_POST = gql`
  mutation updatePost($postId: ID!, $content: String, $deleted: Boolean){
    updatePost(postId: $postId, content: $content, deleted: $deleted) {
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

const LoadingStyle = css`
    margin: 0 auto;
    position: relative;
    left: 40%;
    top: 100px;
`;

const _updateCacheAfterPost = (store, post, deleteMutation) => {
  console.log("UPDATE HIT:")
  if(deleteMutation) {
    const data = store.readQuery({ query: FEED_QUERY, variables: {filter: ""} })
    store.writeQuery({
      query: FEED_QUERY,
      data: { feed: data.feed.filter((filteredPost) => {
         return filteredPost.id !== post.id
      })}
    })
  } else {
    const data = store.readQuery({ query: FEED_QUERY, variables: {filter: ""} })
    data.feed.unshift(post)
    store.writeQuery({
      query: FEED_QUERY,
      data
    })
  }
}


const handleActionMessage = (message, postId, setRenderMessage, setMessage, setDeletedPostId) => {
  setMessage(message ? message : "")
  setRenderMessage(true)
  setDeletedPostId(postId ? postId : "")
}


const renderFeed = (data, loading, error, deletePostMutation, editPostMutation, setRenderMessage, setMessage, setDeletedPostId) => {
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
    return <div>Error</div>
  }
  const posts = data.feed

  return (
    <div className="feed">
      {posts.map(post =>
        <Post
          key={post.id}
          updateStoreAfterPost={_updateCacheAfterPost}
          post={post}
          handleActionMessage={handleActionMessage}
          setRenderMessage={setRenderMessage}
          setMessage={setMessage}
          setDeletedPostId={setDeletedPostId}
          editPostMutation={editPostMutation}
          deletePostMutation={deletePostMutation}
        />
      )}
    </div>
  )
}

const Profile = () => {


  const [renderMessage, setRenderMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [deletedPostId, setDeletedPostId] = useState("");
  const [filter, setFilter] = useState("");


  const [createPostMutation] = useMutation(POST_MUTATION,{
    update(store, { data: { post } }) {
        if(post) {
          _updateCacheAfterPost(store, post)
        }
      }
  });

  const [editPostMutation] = useMutation(EDIT_POST);

  const [deletePostMutation] = useMutation(EDIT_POST,{
    update(store, { data: dataTwo }) {
        _updateCacheAfterPost(store, dataTwo.updatePost, "true")
      }
  });

  const [undoDeletePostMutation] = useMutation(EDIT_POST,{
    update(store, { data: dataThree }) {
      if(dataThree) {
        _updateCacheAfterPost(store, dataThree.updatePost)
      }
    }
  });

  const { data: dataFour, loading, error} = useQuery(FEED_QUERY,
    {variables: {filter: filter}}
  );

  return (
    <div className="profile">
      <div className="searchbar">
        <input
          value={filter}
          onChange={e => setFilter(e.target.value)}
          type="text"
          placeholder="Search"
        />
      </div>
      <AccountInfo />
      <div className="post-actions">
        <CreatePost
          updateStoreAfterPost={_updateCacheAfterPost}
          handleActionMessage={handleActionMessage}
          setRenderMessage={setRenderMessage}
          setMessage={setMessage}
          setDeletedPostId={setDeletedPostId}
          createPostMutation={createPostMutation}
        />
        {renderFeed(dataFour, loading, error, deletePostMutation, editPostMutation, setRenderMessage, setMessage, setDeletedPostId)}
      </div>
      <ActionMessage
        visible={renderMessage}
        message={message}
        closeMessage={() => setRenderMessage(false)}
        undoEdit={ () => undoDeletePostMutation({variables: { id: deletedPostId, deleted: true, postId: deletedPostId }}).then((result) => {
          handleActionMessage("You have succeessfully undone your delete!", null, setRenderMessage, setMessage, setDeletedPostId)
        })
        .catch((error) => console.log("Error when updating post:", error))}
      />
    </div>
  )
}

export default Profile
