import React from 'react'
import trash from "../styles/assets/trash.svg"


const renderMessage = (message, closeMessage, undoEdit, error) => {
  if(message) {
    return (
      <div>
        <p>{message}</p>
        <button className={error ? "error-action-button" : "action-button"}  onClick={() => closeMessage()}>Dismiss</button>
      </div>
    )
  } else {
    return (
      <div>
        <img alt="trash" src={trash} />
        <p>Post successfully deleted</p>
        <button onClick={() => closeMessage()}>Dismiss</button>
        <button onClick={() => undoEdit()} style={{marginRight: "5px"}}>Undo</button>
      </div>
    )
  }
}

const AccountInfo = ({message, closeMessage, undoEdit, visible, error}) => {
  console.log("ERROR:", error)
  return (
    <div
      style={{
        background: error && "red"
      }}
      className={visible ? "action-message" :  "action-message hide"}
    >
      {renderMessage(message, closeMessage, undoEdit, error)}
    </div>
  )
}

export default AccountInfo
