import { handleSendChatMessage } from '../../../api/chatGPT'
import React, { useState } from 'react'
import style from './style.module.less'
import classnames from 'classnames'
import dayStyle from '../components/day.module.less'
import SvgIcon from '../../../components/SvgIcon'
import { stopDefaultEvent } from '../utils/events'
interface IMessage {
  role: 'self'|'assistant'
  content: string
}
const allMessage:IMessage[] = []

export function AssistantComponent() {
  const [show, setShow] = useState(false)
  const [value, setInput] = useState<string>('')
  const [messages, setMessages] = useState<IMessage[]>(allMessage)
  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value)
  }
  const clear = () => {
    setInput('')
  }
  const handleAddMessage = () => {
    setMessages([...allMessage])
  }
  const onKeyDown = async (event:React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      await handleSendMessage()
    }
  }
  const showChatPopover = () => {
    setShow(true)
  }
  const closeChatPopover = () => {
    setShow(false)
  }
  const handleSendMessage = async () => {
    allMessage.push({
      role: 'self',
      content: value,
    })
    clear()
    handleAddMessage()
    const { choices, } = await handleSendChatMessage(value)
    allMessage.push({
      role: 'assistant',
      content: choices[0].message.content,
    })
    handleAddMessage()
  }
  return (
    <div onClick={showChatPopover} className={classnames({
      [style.floatingChat]: true,
      [style.floatingChatEnter]: true,
      [style.floatingChatExpand]: show,
    })}>
      <span  style={{ display: show ? 'none' : '', }} >
        <SvgIcon iconName='popover_message-circle' />
      </span>
      <div className={classnames({
        [style.floatingChatChat]: true,
        [style.floatingChatChatEnter]: show,
      })}>
        <div className={style.floatingChatChatHeader}>
          <span onClick={(event) => {
            stopDefaultEvent(event)
            closeChatPopover()
          }} className={style.floatingChatChatHeaderButton}>
            <SvgIcon iconName='popover_x' />
          </span>
        </div>
        <ul className={classnames({
          [dayStyle.scrollContainer]: true,
          [style.floatingChatChatMessages]: true,
        })}>
          {messages.map((message, index) => (
            <li key={index} className={classnames({
              [style.floatingChatChatMessagesItem]: true,
              [style.floatingChatChatMessagesItemAssistant]: message.role === 'assistant',
              [style.floatingChatChatMessagesItemSelf]: message.role === 'self',
            })}>
              {message.content}
            </li>
          ))}
        </ul>
        <div className={style.floatingChatChatFooter}>
          <input
            className={style.floatingChatChatFooterTextBox}
            onKeyDown={onKeyDown}
            value={value} onChange={onChange} />
          <button
            className={style.chatFooterButton}
            onClick={handleSendMessage}>
            <SvgIcon iconName='popover_message_send' />
          </button>
        </div>
      </div>
    </div>
  )
}
