import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const POST_MUTATION = gql`
  mutation PostMutation($content: String!, $deleted: Boolean!) {
    post(content: $content, deleted: $deleted) {
      id
      createdAt
      content
      deleted
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
    return (
      <div className="create-post">
        <input
          value={content}
          onChange={e => this.setState({ content: e.target.value })}
          type="text"
          placeholder="What's happening?"
        />
        <Mutation mutation={POST_MUTATION} variables={{ content, deleted }}>
         {postMutation => <button onClick={postMutation}>Post</button>}
        </Mutation>
      </div>
    )
  }
}

export default CreatePost
