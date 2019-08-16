import React from 'react'
import { timeDifferenceForDate } from '../utils'


const AccountInfo = ({user}) => {
  return (
    <div className="account-info">
      <div className="account-info-main">
        <div className="account-info-image"></div>
        <p className="account-info-username">KidCudi</p>
        <p className="account-info-bio">Musical anarchist/the originator</p>
      </div>
      <ul className="account-info-sub">
        <li>Some Place Higher</li>
        <li>kidcudi.com</li>
        <li>July 2019</li>
      </ul>
    </div>
  )
}

export default AccountInfo
