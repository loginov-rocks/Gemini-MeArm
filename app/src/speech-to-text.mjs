import { PicovoiceSpeechToText } from './lib/PicovoiceSpeechToText.mjs';

const speechToText = new PicovoiceSpeechToText({
  accessKey: 'PICOVOICE_ACCESS_KEY',
});

const firstText = await speechToText.recordAndTranscribe();

console.log(`First text: "${firstText}"`);

const secondText = await speechToText.recordAndTranscribe();

console.log(`Second text: "${secondText}"`);
