import { Orca } from '@picovoice/orca-node';

const PICOVOICE_ACCESS_KEY = '';

const TEXT = 'Hello, world!';
const OUTPUT_PATH = 'output.wav';

const orca = new Orca(PICOVOICE_ACCESS_KEY);

const synthesize = async () => {
  console.log('Synthesizing...');

  const alignments = await orca.synthesizeToFile(TEXT, OUTPUT_PATH);

  console.log('Alignments:', JSON.stringify(alignments));

  orca.release();

  console.log('Complete!');
};

synthesize();
