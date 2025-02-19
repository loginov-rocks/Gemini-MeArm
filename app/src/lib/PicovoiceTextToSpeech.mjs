import { Orca } from '@picovoice/orca-node';
import { unlinkSync } from 'fs';
import PlaySound from 'play-sound';

export class PicovoiceTextToSpeech {
  static VOICES = {
    FEMALE: './node_modules/@picovoice/orca-node/lib/common/orca_params_female.pv',
    MALE: './node_modules/@picovoice/orca-node/lib/common/orca_params_male.pv',
  };

  constructor({ accessKey, logAlignments, outputDir, persistOutput, voice }) {
    this.accessKey = accessKey;
    this.logAlignments = logAlignments;
    this.outputDir = outputDir;
    this.persistOutput = persistOutput;
    this.voice = voice;
  }

  buildFilePath() {
    return `${this.outputDir}/${Date.now()}.wav`;
  }

  generateAudioFile(text, filePath) {
    console.log(`[PicovoiceTextToSpeech] Generating audio file ${filePath} with text: "${text}"...`);

    const orca = new Orca(this.accessKey, { modelPath: this.voice });
    const sanitizedText = this.sanitizeText(text, orca.validCharacters);

    console.log(`[PicovoiceTextToSpeech] Sanitized text: "${sanitizedText}"`);

    // @see https://picovoice.ai/docs/api/orca-nodejs/#orcasynthesizetofile
    // TODO: Split text into chunks in case longer than orca.maxCharacterLimit.
    const alignments = orca.synthesizeToFile(sanitizedText, filePath);
    orca.release();

    if (this.logAlignments) {
      console.log(`[PicovoiceTextToSpeech] Alignments: ${JSON.stringify(alignments)}`);
    }

    console.log('[PicovoiceTextToSpeech] Finished generating');

    return alignments;
  }

  playAudioFile(filePath) {
    console.log(`[PicovoiceTextToSpeech] Playing audio file ${filePath}`);

    return new Promise((resolve, reject) => {
      const player = PlaySound();

      player.play(filePath, (error) => {
        if (error) {
          return reject(error);
        }

        console.log('[PicovoiceTextToSpeech] Finished playing');

        resolve();
      })
    });
  }

  sanitizeText(text, validCharacters) {
    const validCharactersSet = new Set(validCharacters);
    const sanitized = text.split('').map((character) => validCharactersSet.has(character) ? character : ' ').join('');

    return sanitized.replace(/\s+/g, ' ').trim();
  }

  async speak(text) {
    console.log(`[PicovoiceTextToSpeech] Speaking text: "${text}"...`);

    const filePath = this.buildFilePath();
    /* const alignments = */ this.generateAudioFile(text, filePath);
    await this.playAudioFile(filePath);

    if (!this.persistOutput) {
      unlinkSync(filePath);

      console.log(`[PicovoiceTextToSpeech] File ${filePath} deleted`);
    }

    console.log('[PicovoiceTextToSpeech] Finished speaking');
  }
}
