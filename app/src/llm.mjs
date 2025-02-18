import ollama from 'ollama';

const MESSAGES = [
  'Hello, world!',
  'How are things?',
  'What was my first message?',
  'Bye!',
];

const MODEL = 'llama3.2';

class ChatSession {
  messages = [];

  async chat(message) {
    // @see https://github.com/ollama/ollama/blob/main/docs/api.md#chat-request-with-history
    this.messages.push({ role: 'user', content: message });

    const response = await ollama.chat({
      model: MODEL,
      messages: this.messages,
    });

    this.messages.push(response.message);

    return response.message.content;
  }
}

const chat = async (messages) => {
  const session = new ChatSession();

  for (let i = 0; i < messages.length; i++) {
    const message = messages[i];
    console.log(`Message ${i + 1}: "${message}"`);

    const response = await session.chat(message);
    console.log(`Response ${i + 1}: "${response}"`);
  }
};

chat(MESSAGES);
