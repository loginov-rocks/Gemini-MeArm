import { LLM } from './lib/LLM.mjs';

const chat = async (messages) => {
  const llm = new LLM({ model: 'llama3.2' });

  for (let i = 0; i < messages.length; i++) {
    const message = messages[i];
    console.log(`Message ${i + 1}: "${message}"`);

    const { data } = await llm.chat(message);
    console.log(`Response ${i + 1}: "${data}"`);
  }
};

chat([
  'Hello, world!',
  'How are things?',
  'What was my first message?',
  'Bye!',
]);
