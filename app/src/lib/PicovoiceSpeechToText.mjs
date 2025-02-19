import { Cheetah } from '@picovoice/cheetah-node';
import { PvRecorder } from '@picovoice/pvrecorder-node';

export class PicovoiceSpeechToText {
  constructor({ accessKey }) {
    this.accessKey = accessKey;
  }

  async recordAndTranscribe() {
    console.log('[PicovoiceTextToSpeech] Starting recording...');

    const cheetah = new Cheetah(this.accessKey, { enableAutomaticPunctuation: true });
    const pvRecorder = new PvRecorder(512);

    pvRecorder.start();
    let isPaused = false;
    let transcript = '';

    while (!isPaused) {
      const frame = await pvRecorder.read();
      const [partialTranscript, isEndpoint] = cheetah.process(frame);

      if (partialTranscript) {
        transcript += partialTranscript;

        console.log(`[PicovoiceTextToSpeech] Partial transcript: "${partialTranscript}"...`);
      }

      if (isEndpoint) {
        const lastTranscript = cheetah.flush();
        isPaused = true;
        transcript += lastTranscript;

        console.log(`[PicovoiceTextToSpeech] Last transcript: "${lastTranscript}"`);
      }
    }

    cheetah.release();
    pvRecorder.release();

    console.log('[PicovoiceTextToSpeech] Finished recording');

    return transcript;
  }
}
