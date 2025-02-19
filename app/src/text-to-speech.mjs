import { PicovoiceTextToSpeech } from './lib/PicovoiceTextToSpeech.mjs';

const textToSpeech = new PicovoiceTextToSpeech({
  accessKey: 'PICOVOICE_ACCESS_KEY',
  logAlignments: true,
  outputDir: './synthesized',
  persistOutput: false,
  voice: PicovoiceTextToSpeech.VOICES.FEMALE,
});

await textToSpeech.speak('Hello, world!');
await textToSpeech.speak('* How are things? *');
