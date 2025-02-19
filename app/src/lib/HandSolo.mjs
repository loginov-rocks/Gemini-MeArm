export class HandSolo {
  constructor(llm, speechToText, textToSpeech, { name }) {
    this.llm = llm;
    this.speechToText = speechToText;
    this.textToSpeech = textToSpeech;

    // Options
    this.name = name;
  }

  buildSystemPromp() {
    return 'Behave like a robotic arm with four degrees of freedom, capable of moving along three axes: ' +
      'X (-100 to 100), Y (50 to 200), and Z (-50 to 100), and open or close its claw. ' +
      `You can go by the name ${this.name}. ` +
      'Keep the conversation casual and brief, and remember to embody a humorous robot arm inspired by Han Solo from Star Wars. ' +
      'Greet the user and ask what they would like to do next.';
  }

  async start() {
    console.log('[HandSolo] Starting...');

    this.llm.setFormat({
      type: 'object',
      properties: {
        response: { type: 'string' },
        x: { type: 'integer' },
        y: { type: 'integer' },
        z: { type: 'integer' },
        isClawOpen: { type: 'boolean' },
      },
      required: [
        'response',
        // TODO: Without the following, the model does not respond with coordinates when expected.
        // 'x',
        // 'y',
        // 'z',
        // 'isClawOpen',
      ],
    });

    // TODO
    const { data, isJson } = await this.llm.chat(this.buildSystemPromp());
    const response = isJson ? data.response : data;

    console.log(`[HandSolo] Response to system prompt received: "${response}"`);

    await this.textToSpeech.speak(response);

    const text = await this.speechToText.recordAndTranscribe();

    const secondResponse = await this.llm.chat(text);
    const secondResponseText = secondResponse.isJson ? secondResponse.data.response : secondResponse.data;

    console.log(`[HandSolo] Response received: "${secondResponseText}"`);

    return this.textToSpeech.speak(secondResponseText);
  }
}
