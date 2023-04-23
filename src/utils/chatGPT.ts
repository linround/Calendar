export function generateChatMessage(input:string) {
  return {
    // model: 'gpt-3.5-turbo',
    // temperature: 0.6,
    // messages: [{ role: 'user', 'content': input, }],
    question: input,
    prompt: '你是一个日历机器人',
    stream: false,
  }
}
