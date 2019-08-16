import React from 'react'
import { timeDifferenceForDate } from '../utils'
import location from "../styles/assets/location.svg"
import link from "../styles/assets/link.svg"
import date from "../styles/assets/date.svg"



const AccountInfo = ({user}) => {
  return (
    <div className="account-info">
      <div className="account-info-main">
        <div className="account-info-image"></div>
        <p className="account-info-username">KidCudi</p>
        <p className="account-info-bio">Musical anarchist/the originator</p>
      </div>
      <ul className="account-info-sub">
        <li><span><img src={location} /></span>Some Place Higher</li>
        <li><span><img src={link} /></span>kidcudi.com</li>
        <li><span><img src={date} /></span>July 2019</li>
      </ul>
    </div>
  )
}

export default AccountInfo
