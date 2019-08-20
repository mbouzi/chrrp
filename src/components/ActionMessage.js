import React from 'react'
import trash from "../styles/assets/trash.svg"

import styled from '@emotion/styled';
import {fontSizes, colors} from '../styles/defaultTheme'

const ActionMessage = styled('div')`
  background: ${props => props.error ? "red" : colors.green};
  box-shadow: 0px 0px 14px rgba(15, 28, 45, 0.25);
  border-radius: 10px;
  position: absolute;
  bottom: 10px;
  opacity: ${props => props.visible ? 1 : 0};
  width: ${props => props.visible ? "678px" : 0};
  height: ${props => props.visible ? "70px" : 0};
  transition: ${props => props.visible ? "width 0.5s, height 0.5s, opacity 0.5s 0.5s" : "width 0.5s 0.5s, height 0.5s 0.5s, opacity 0.5s"};
  @media screen and (max-width: 690px) {
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    width: 90%;
  }
`

const ActionMessageButton = styled('button')`
  border: 1px solid #FFF;
  font-size: ${fontSizes.md};
  line-height: ${fontSizes.sm};
  border-radius: 20px;
  background: transparent;
  color: #FFF;
  padding: 10px;
  width: 92px;
  height: 33px;
  float: right;
  cursor: pointer;
  position: relative;
  top: 18px;
  right: 20px;
  :hover {
    border: 1px solid #FFF;
    background: #FFF;
    color: ${props => props.error ? "red" : colors.green};
  }
`

const ActionMessageIcon = styled('img')`
  float: left;
  left: 25px;
  top: 24px;
  position: relative;
`
const Message = styled('p')`
  font-size: ${fontSizes.default};
  align-items: center;
  text-align: center;
  color: #FFF;
  position: relative;
  left: 40px;
  top: 10px;
  float: left;
`

const renderMessage = (message, closeMessage, undoEdit, error) => {
  // handle edit or delete actions
  if(message) {
    return (
      <div>
        <Message>{message}</Message>
        <ActionMessageButton error={error} onClick={() => closeMessage()}>Dismiss</ActionMessageButton>
      </div>
    )
  } else {
    return (
      <div>
        <ActionMessageIcon alt="trash" src={trash} />
        <Message>Post successfully deleted</Message>
        <ActionMessageButton onClick={() => closeMessage()}>Dismiss</ActionMessageButton>
        <ActionMessageButton onClick={() => undoEdit()} style={{marginRight: "5px"}}>Undo</ActionMessageButton>
      </div>
    )
  }
}

const AccountInfo = ({message, closeMessage, undoEdit, visible, error}) => {
  return (
    <ActionMessage
      error={error}
      visible={visible}
    >
      {renderMessage(message, closeMessage, undoEdit, error)}
    </ActionMessage>
  )
}

export default AccountInfo
