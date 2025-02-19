import { PicovoiceSpeechToText } from './lib/PicovoiceSpeechToText.mjs';

const speechToText = new PicovoiceSpeechToText({
  accessKey: 'PICOVOICE_ACCESS_KEY',
});

const text = await speechToText.recordAndTranscribe();

console.log(`Text: "${text}"`);
