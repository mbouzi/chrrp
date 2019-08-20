import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { AUTH_TOKEN } from '../constants'

import logo from '../styles/assets/logo.svg'
import chrrp from'../styles/assets/chrrp.svg'
import '../styles/login.css'


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
      <div className="login">
        <div>
          <img alt="logo" src={logo} />
          <img className="logo" alt="chrrp" src={chrrp} />
          <h4>{login ? 'Login' : 'Sign Up'}</h4>
        </div>
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
            placeholder="Password"
          />
        </div>
        <div >
          <Mutation
            mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
            variables={{ password, name }}
            onCompleted={data => this._confirm(data)}
          >
            {mutation => (
              <button onClick={mutation}>
                {login ? 'login' : 'create'}
              </button>
            )}
          </Mutation>
          <div
            onClick={() => this.setState({ login: !login })}
          >
            <p>{login
              ? 'need to create an account?'
              : 'already have an account?'}</p>
          </div>
        </div>
      </div>
    )
  }

  _confirm = async data => {
    const { token } = this.state.login ? data.login : data.signup
    this._saveUserData(token)
    this.props.history.push(`/`)
    window.location.reload();
  }

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }
}

export default Login
