export class HandSolo {
  constructor(llm, { name }) {
    this.llm = llm;

    // Options
    this.name = name;
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
      ],
    });

    const { data, isJson } = await this.llm.chat(this.buildSystemPromp());

    console.log(`[HandSolo] Response to system prompt received: "${isJson ? data.response : data}"`);
  }

  buildSystemPromp() {
    return 'Behave like a robotic arm with four degrees of freedom, capable of moving along three axes: ' +
      'X (-100 to 100), Y (50 to 200), and Z (-50 to 100), and open or close its claw. ' +
      `You can go by the name ${this.name}. ` +
      'Keep the conversation casual and brief, and remember to embody a humorous robot arm inspired by Han Solo from Star Wars. ' +
      'Greet the user and ask what they would like to do next.';
  }
}
