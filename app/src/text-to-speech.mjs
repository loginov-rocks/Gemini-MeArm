import { PicovoiceTextToSpeech } from './lib/PicovoiceTextToSpeech.mjs';

const textToSpeech = new PicovoiceTextToSpeech({
  accessKey: 'PICOVOICE_ACCESS_KEY',
  outputDir: './synthesized',
  persistOutput: true,
  voice: PicovoiceTextToSpeech.VOICES.FEMALE,
});

textToSpeech.speak('Hello, world!');
