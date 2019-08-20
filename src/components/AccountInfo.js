import React from 'react'
import location from "../styles/assets/location.svg"
import link from "../styles/assets/link.svg"
import date from "../styles/assets/date.svg"
import styled from '@emotion/styled';
import {fontSizes, colors} from '../styles/defaultTheme'

const AccountInfoWrapper = styled('div')`
  min-width: 165px;
  float: left;
  background: #FFFFFF;
  box-shadow: 0px 4px 60px rgba(26, 40, 60, 0.14);
  border-radius: 10px;
  padding: 33px;
  @media screen and (max-width: 690px) {
    width: 80%;
    position: relative;
    height: 34px;
    float: none;
    margin: 0 auto;
    justify-content: space-evenly;
    display: flex;
  }
`

const AccountInfoImage = styled('div')`
  width: 58px;
  height: 58px;
  background: grey;
  box-sizing: border-box;
  border-radius: 50px;
  display: inline-block;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  @media screen and (max-width: 690px) {
    width: 40px;
    height: 40px;
  }
`

const AccountInfoUsername = styled('p')`
  font-size: ${fontSizes.lg};
  font-weight: bold;
  display: inline-block;
  margin-bottom: 0;
  position: relative;
  bottom: 20px;
  left: 15px;
  @media screen and (max-width: 690px) {
    bottom: 13px
  }
`

const AccountInfoBio = styled('p')`
  font-size: ${fontSizes.sm};
  line-height: ${fontSizes.md};
`

const AccountInfoListItem = styled('li')`
  font-size: ${fontSizes.sm};
  line-height: ${fontSizes.md};
  color: #7E8B9C;
  margin-bottom: 10px;
`

const AccountInfoListItemIcon = styled('span')`
  margin-right: 10px;
  position: relative;
  top: 2px;
`

const AccountInfoMain = styled('div')`
  @media screen and (max-width: 690px) {
    position: relative;
    bottom: 20px;
  }
`

const AccountInfoSub = styled('div')`
  list-style-type: none;
  padding: 0;
  @media screen and (max-width: 690px) {
    float: right;
    position: relative;
    bottom: 18px;
    margin-bottom: 0;
  }
`

const renderListItem = (alt, src, content) => {
  return (
    <AccountInfoListItem>
      <AccountInfoListItemIcon>
        <img alt={alt} src={src} />
      </AccountInfoListItemIcon>
      {content}
    </AccountInfoListItem>
  )
}

const AccountInfo = ({currentUser}) => {
  return (
    <AccountInfoWrapper>
      <AccountInfoMain>
        <AccountInfoImage style={{backgroundImage: `url(${currentUser && currentUser.image})`}}  >
        </AccountInfoImage>
        <AccountInfoUsername>{currentUser.name}</AccountInfoUsername>
        <AccountInfoBio>Musical anarchist/the originator</AccountInfoBio>
      </AccountInfoMain>
      <AccountInfoSub>
        {renderListItem("location", location, "Some Place Higher")}
        {renderListItem("website", link, "kidcudi.com")}
        {renderListItem("date", date, "July 2019")}
      </AccountInfoSub>
    </AccountInfoWrapper>
  )
}

export default AccountInfo
