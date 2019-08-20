import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import logo from '../styles/assets/logo.svg'
import chrrp from'../styles/assets/chrrp.svg'

import { AUTH_TOKEN } from '../constants'

import styled from '@emotion/styled';
import {fontSizes, colors} from '../styles/defaultTheme'

const HeaderWrapper = styled('div')`
  width: 660px;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 690px) {
    width: 91%;
  }
`

const Action = styled('div')`
  right: 240px;
  position: relative;
  color: ${colors.blue};
  cursor: pointer;
  font-size: ${fontSizes.md};
  top: 2px;
`

const Logo = styled('img')`
  position: relative;
  bottom: 1px;
  left: 2px;
`


class Header extends Component {

  render() {

    const authToken = localStorage.getItem(AUTH_TOKEN)

    return (
      <HeaderWrapper>
        <div>
          <Link to="/" >
            <img alt="logo" src={logo} />
            <Logo alt="chrrp" src={chrrp} />
          </Link>
        </div>
        <div>
          {authToken ? (
           <Action
             onClick={() => {
               localStorage.removeItem(AUTH_TOKEN)
               this.props.history.push(`/login`)
               window.location.reload();
             }}
           >
             logout
           </Action>
         ) : (
           <Link to="/login">
            <Action>
              login
             </Action>
           </Link>
         )}
        </div>
      </HeaderWrapper>
    )
  }
}

export default withRouter(Header)
