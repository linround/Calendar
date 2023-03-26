import request from '../request'
import { generateChatMessage } from '../utils/chatGPT'
const domain = 'https://api.openai.com'

const createOpenaiRequest = function (url:string) {
  const api = `${domain}${url}`
  return function (input:any) {
    return  request<any, any>({
      url: api,
      method: 'POST',
      data: input,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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',
      },
    })
  }
}
const chatRequest = createOpenaiRequest('/v1/chat/completions')




export function handleSendChatMessage(input:string) {
  return chatRequest(generateChatMessage(input))
}
