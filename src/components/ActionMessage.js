import React from 'react'
import trash from "../styles/assets/trash.svg"


const renderMessage = (message, closeMessage, undoEdit) => {
  if(message) {
    return (
      <div>
        <p>{message}</p>
        <button onClick={() => closeMessage()}>Dismiss</button>
      </div>
    )
  } else {
    return (
      <div>
        <img src={trash} />
        <p>Post successfully deleted</p>
        <button>Undo</button>
        <button onClick={() => closeMessage()}>Dismiss</button>
      </div>
    )
  }
}

const AccountInfo = ({message, closeMessage, undoEdit, visible}) => {
  return (
    <div className={visible ? "action-message" :  "action-message hide"}>
      {renderMessage(message, closeMessage, undoEdit)}
    </div>
  )
}

export default AccountInfo
