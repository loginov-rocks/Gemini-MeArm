import { HandSolo } from './lib/HandSolo.mjs';
import { LLM } from './lib/LLM.mjs';
import { PicovoiceSpeechToText } from './lib/PicovoiceSpeechToText.mjs';
import { PicovoiceTextToSpeech } from './lib/PicovoiceTextToSpeech.mjs';

const PICOVOICE_ACCESS_KEY = 'PICOVOICE_ACCESS_KEY';

const llm = new LLM({ model: 'llama3.2' });

const speechToText = new PicovoiceSpeechToText({
  accessKey: PICOVOICE_ACCESS_KEY,
});

const textToSpeech = new PicovoiceTextToSpeech({
  accessKey: PICOVOICE_ACCESS_KEY,
  logAlignments: false,
  outputDir: './synthesized',
  persistOutput: true,
  voice: PicovoiceTextToSpeech.VOICES.MALE,
});

const handSolo = new HandSolo(llm, speechToText, textToSpeech, {
  name: 'Hand Solo',
});

handSolo.start();
