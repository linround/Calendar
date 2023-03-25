import request from '../request'
import { generateChatMessage } from '../utils/chatGPT'
const domain = 'https://api.openai.com'

const createOpenaiRequest = function (url:string, input:any) {
  const api = `${domain}${url}`
  return request<any, any>({
    url: api,
    method: 'POST',
    data: input,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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',
    },
  })
}

export function handleSendChatMessage(input:string) {
  return createOpenaiRequest('/v1/chat/completions', generateChatMessage(input))
}
