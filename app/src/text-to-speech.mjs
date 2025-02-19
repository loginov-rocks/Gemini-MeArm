import { PicovoiceTextToSpeech } from './lib/PicovoiceTextToSpeech.mjs';

const textToSpeech = new PicovoiceTextToSpeech({
  accessKey: '',
  outputDir: './synthesized',
  persistOutput: true,
  voice: PicovoiceTextToSpeech.VOICES.FEMALE,
});

textToSpeech.speak('Hello, world!');
