import { HandSolo } from './lib/HandSolo.mjs';
import { LLM } from './lib/LLM.mjs';
import { PicovoiceTextToSpeech } from './lib/PicovoiceTextToSpeech.mjs';

const llm = new LLM({ model: 'llama3.2' });

const textToSpeech = new PicovoiceTextToSpeech({
  accessKey: '',
  outputDir: './synthesized',
  persistOutput: true,
  voice: PicovoiceTextToSpeech.VOICES.MALE,
});

const handSolo = new HandSolo(llm, textToSpeech, {
  name: 'Hand Solo',
});

handSolo.start();
