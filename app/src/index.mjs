import { HandSolo } from './lib/HandSolo.mjs';
import { LLM } from './lib/LLM.mjs';

const llm = new LLM({ model: 'llama3.2' });

const handSolo = new HandSolo(llm, {
  name: 'Hand Solo',
});

handSolo.start();
