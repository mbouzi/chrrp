import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { AUTH_TOKEN } from '../constants'

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($password: String!, $name: String!) {
    signup(password: $password, name: $name) {
      token
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation LoginMutation($name: String!, $password: String!) {
    login(name: $name, password: $password) {
      token
    }
  }
`

class Login extends Component {
  state = {
    login: true, // switch between Login and SignUp
    password: '',
    name: '',
  }

  render() {
    const { login, password, name } = this.state
    return (
      <div>
        <h4 >{login ? 'Login' : 'Sign Up'}</h4>
        <div >
          <input
            value={name}
            onChange={e => this.setState({ name: e.target.value })}
            type="text"
            placeholder="Your name"
          />
          <input
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
            type="password"
            placeholder="Choose a safe password"
          />
        </div>
        <div >
          <Mutation
            mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
            variables={{ password, name }}
            onCompleted={data => this._confirm(data)}
          >
            {mutation => (
              <div onClick={mutation}>
                {login ? 'login' : 'create account'}
              </div>
            )}
          </Mutation>
          <div
            onClick={() => this.setState({ login: !login })}
          >
            {login
              ? 'need to create an account?'
              : 'already have an account?'}
          </div>
        </div>
      </div>
    )
  }

  _confirm = async data => {
    const { token } = this.state.login ? data.login : data.signup
    this._saveUserData(token)
    this.props.history.push(`/`)
  }

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }
}

export default Login
