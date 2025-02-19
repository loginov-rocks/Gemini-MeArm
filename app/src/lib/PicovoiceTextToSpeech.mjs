import { Orca } from '@picovoice/orca-node';
import { unlinkSync } from 'fs';
import PlaySound from 'play-sound';

export class PicovoiceTextToSpeech {
  constructor({ accessKey, outputDir, persistOutput, voice }) {
    this.orca = new Orca(accessKey, { modelPath: voice });
    this.outputDir = outputDir;
    this.persistOutput = persistOutput;

    this.player = PlaySound();
  }

  static VOICES = {
    FEMALE: './node_modules/@picovoice/orca-node/lib/common/orca_params_female.pv',
    MALE: './node_modules/@picovoice/orca-node/lib/common/orca_params_male.pv',
  };

  buildFilePath() {
    return `${this.outputDir}/${Date.now()}.wav`;
  }

  generateAudioFile(text, filePath) {
    console.log(`[PicovoiceTextToSpeech] Generating audio file ${filePath} with text: "${text}"...`);

    // @see https://picovoice.ai/docs/api/orca-nodejs/#orcasynthesizetofile
    const alignments = this.orca.synthesizeToFile(text, filePath);
    this.orca.release();

    console.log(`[PicovoiceTextToSpeech] Alignments: ${JSON.stringify(alignments)}`);

    return alignments;
  }

  playAudioFile(filePath) {
    console.log(`[PicovoiceTextToSpeech] Playing audio file ${filePath}`);

    return new Promise((resolve, reject) => {
      this.player.play(filePath, (error) => {
        if (error) {
          return reject(error);
        }

        resolve();
      })
    });
  }

  async speak(text) {
    console.log(`[PicovoiceTextToSpeech] Speaking text: "${text}"...`);

    const filePath = this.buildFilePath();
    /* const alignments = */ this.generateAudioFile(text, filePath);
    await this.playAudioFile(filePath);

    if (!this.persistOutput) {
      console.log(`[PicovoiceTextToSpeech] Deleting file ${filePath}`);

      unlinkSync(filePath);
    }

    console.log('[PicovoiceTextToSpeech] Finished speaking');
  }
}
