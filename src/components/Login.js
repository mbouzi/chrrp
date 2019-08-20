import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { AUTH_TOKEN } from '../constants'

import logo from '../styles/assets/logo.svg'
import chrrp from'../styles/assets/chrrp.svg'
import styled from '@emotion/styled';
import {fontSizes, colors} from '../styles/defaultTheme'


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

const LoginWrapper = styled('div')`
  margin: 10% auto;
  width: 40%;
  text-align: center;
  background: #FFFFFF;
  box-shadow: 0px 4px 60px rgba(26, 40, 60, 0.14);
  border-radius: 10px;
  padding: 2px 0 30px 0;
  min-width: 360px;
  @media screen and (max-width: 700px) {
    margin: 25% auto;
  }
`

const LoginInput = styled('input')`
  display: block;
  margin: 0 auto;
  width: 60%;
  border: none;
  outline: none;
  padding: 7px 0 7px 15px;
  border-radius: 10px;
  margin-top: 15px;
  font-size: ${fontSizes.default};
`

const LoginButton = styled('button')`
  width: 70px;
  height: 30px;
  background: ${colors.blue};
  border-radius: 55px;
  color: #FFF;
  font-weight: bold;
  cursor: pointer;
  border: none;
  margin: 15px 0;
`

const LoginHeader = styled('h4')`
  font-size: ${fontSizes.lg};
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
      <LoginWrapper>
        <div style={{marginTop: "25px"}}>
          <img alt="logo" src={logo} />
          <img alt="chrrp" src={chrrp} />
          <LoginHeader>{login ? 'Login' : 'Sign Up'}</LoginHeader>
        </div>
        <div >
          <LoginInput
            value={name}
            onChange={e => this.setState({ name: e.target.value })}
            type="text"
            placeholder="Your name"
          />
          <LoginInput
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
              <LoginButton onClick={mutation}>
                {login ? 'login' : 'create'}
              </LoginButton>
            )}
          </Mutation>
          <div
            onClick={() => this.setState({ login: !login })}
          >
            <p style={{cursor: "pointer"}}>{login
              ? 'need to create an account?'
              : 'already have an account?'}</p>
          </div>
        </div>
      </LoginWrapper>
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
