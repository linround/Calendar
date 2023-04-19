import request from '../request'
import { generateChatMessage } from '../utils/chatGPT'

const domain = 'https://api.ai100.ai'

const createOpenaiRequest = function (url:string) {
  const api = `${domain}${url}`
  return function (input:any) {
    return  request<any, any>({
      url: api,
      method: 'GET',
      params: input,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SjBkQ0k2TkN3aVlYVmtJam9pWXpnMFpEVmpaVEkzTXpGaU5ESTVNamhtTXprME16YzROMkl6TWpjMU9Ea2lMQ0pzZFNJNklteHBibkp2ZFc1a0lpd2laWGh3SWpveE5qZzFOVFE0TnprNUxDSjFjaUk2TWl3aWFuUnBJam9pUVZCSlgxUlBTMFZPWDJNNE5HUTFZMlV5TnpNeFlqUXlPVEk0WmpNNU5ETTNPRGRpTXpJM05UZzVMVFFpZlEuZkNYM2NOMUo0U3JpT1dHZlRPVGxZdmNWSlNxczhrRkJ1alkzZGtEMnNvRQ==',
      },
    })
  }
}
const chatRequest = createOpenaiRequest('/ai/api/ai/chat')




export function handleSendChatMessage(input:string) {
  return chatRequest(generateChatMessage(input))
}
