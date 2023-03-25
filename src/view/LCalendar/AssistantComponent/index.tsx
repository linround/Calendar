import { handleSendChatMessage } from '../../../api/chatGPT'
import React, { useState } from 'react'
import style from './style.module.less'
import classnames from 'classnames'
import dayStyle from '../components/day.module.less'
interface IMessage {
  role: 'self'|'assistant'
  content: string
}
const allMessage:IMessage[] = []

export function AssistantComponent() {
  const [value, setInput] = useState<string>('')
  const [messages, setMessages] = useState<IMessage[]>(allMessage)
  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value)
  }
  const clear = () => {
    console.log('清空输入')
    setInput('')
  }
  const handleAddMessage = () => {
    setMessages([...allMessage])
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
    <div className={classnames({
      [style.floatingChat]: true,
      [style.expand]: true,
    })}>
      <div className={style.chat}>
        <div className={style.chatHeader}>
          <span className={style.chatHeaderTitle}>
                你想问什么？
          </span>
          <button className={style.chatHeaderButton}>
            X
          </button>
        </div>
        <ul className={classnames({
          [dayStyle.scrollContainer]: true,
          [style.chatMessage]: true,
        })}>
          {messages.map((message, index) => (
            <li key={index} className={classnames({
              [style.chatMessageItem]: true,
              [style.chatMessageSelf]: message.role === 'self',
              [style.chatMessageOther]: message.role === 'assistant',
            })}>
              {message.content}
            </li>
          ))}
        </ul>
        <div className={style.chatFooter}>
          <input
            className={style.chatFooterTextBox}
            value={value} onChange={onChange} />
          <button
            className={style.chatFooterButton}
            onClick={handleSendMessage}>send</button>
        </div>
      </div>
    </div>
  )
}
