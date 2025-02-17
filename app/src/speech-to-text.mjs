import { Cheetah } from '@picovoice/cheetah-node';
import { PvRecorder } from '@picovoice/pvrecorder-node';

const PICOVOICE_ACCESS_KEY = '';

const PVRECORDER_FRAME_LENGTH = 512;

const cheetah = new Cheetah(PICOVOICE_ACCESS_KEY, { enableAutomaticPunctuation: true });
const pvRecorder = new PvRecorder(PVRECORDER_FRAME_LENGTH);

const transcribe = async () => {
  console.log('Starting recording...');

  pvRecorder.start();

  let isPaused = false;

  while (!isPaused) {
    const frame = await pvRecorder.read();

    const [partialTranscript, isEndpoint] = cheetah.process(frame);

    if (partialTranscript) {
      console.log(`Partial transcript: "${partialTranscript}"`);
    }

    if (isEndpoint) {
      isPaused = true;
      const finalTranscript = cheetah.flush();
      console.log(`Final transcript: "${finalTranscript}"`);
    }
  }

  console.log('Stopping recording, releasing resources...');

  pvRecorder.release();
  cheetah.release();

  console.log('Complete!');
};

transcribe();
