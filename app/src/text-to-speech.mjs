import { Orca } from '@picovoice/orca-node';
import { unlinkSync } from 'fs';
import PlaySound from 'play-sound';

const PICOVOICE_ACCESS_KEY = '';
const SYNTHESIZED_KEEP = true;
const SYNTHESIZED_DIR = './synthesized';

const TEXT = 'Hello, world!';

const outputPath = `${SYNTHESIZED_DIR}/${Date.now()}.wav`;

const orca = new Orca(PICOVOICE_ACCESS_KEY);
const player = PlaySound();

const play = (what) => new Promise((resolve, reject) => {
  player.play(what, (error) => {
    if (error) {
      return reject(error);
    }

    resolve();
  })
});

const synthesize = async () => {
  console.log('Synthesizing...');

  const alignments = orca.synthesizeToFile(TEXT, outputPath);

  orca.release();

  console.log('Alignments:', JSON.stringify(alignments));
  console.log('Playing...');

  await play(outputPath);

  if (!SYNTHESIZED_KEEP) {
    unlinkSync(outputPath);
  }

  console.log('Complete!');
};

synthesize();
