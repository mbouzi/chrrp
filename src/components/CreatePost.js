import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

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

class CreatePost extends Component {

  state = {
    content: '',
    deleted: false,
  }

  render() {
    const { content, deleted } = this.state

    const editMutation = this.props.editMutation

    return (
      <div className="create-post">
        <div className="create-post-image"> </div>
        <input
          value={this.props.editContent & !content ? this.props.editContent : content}
          onChange={e => this.setState({ content: e.target.value })}
          type="text"
          placeholder="What's happening?"
        />
        <Mutation
          mutation={editMutation ? editMutation : POST_MUTATION}
          variables={ this.props.postId ? { id: this.props.postId, content, deleted, postId: this.props.postId } : { content, deleted } }
          update={(store, { data: { post } }) => {
              if(post) {
                this.props.updateStoreAfterPost(store, post)
              }
            }
          }
        >
         {postMutation => <button onClick={postMutation}>Post</button>}
        </Mutation>
      </div>
    )
  }
}

export default CreatePost
