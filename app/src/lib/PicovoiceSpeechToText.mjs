import { Cheetah } from '@picovoice/cheetah-node';
import { PvRecorder } from '@picovoice/pvrecorder-node';

export class PicovoiceSpeechToText {
  constructor({ accessKey }) {
    this.cheetah = new Cheetah(accessKey, { enableAutomaticPunctuation: true });
    this.pvRecorder = new PvRecorder(512);
  }

  async recordAndTranscribe() {
    console.log('[PicovoiceTextToSpeech] Starting recording...');

    this.pvRecorder.start();
    let isPaused = false;
    let transcript = '';

    while (!isPaused) {
      const frame = await this.pvRecorder.read();
      const [partialTranscript, isEndpoint] = this.cheetah.process(frame);

      if (partialTranscript) {
        transcript += partialTranscript;

        console.log(`[PicovoiceTextToSpeech] Partial transcript: "${partialTranscript}"...`);
      }

      if (isEndpoint) {
        const lastTranscript = this.cheetah.flush();
        isPaused = true;
        transcript += lastTranscript;

        console.log(`[PicovoiceTextToSpeech] Last transcript: "${lastTranscript}"`);
      }
    }

    this.cheetah.release();
    this.pvRecorder.release();

    console.log('[PicovoiceTextToSpeech] Finished recording');

    return transcript;
  }
}
