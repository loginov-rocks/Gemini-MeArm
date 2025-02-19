import ollama from 'ollama';

export class LLM {
  format = null;
  messages = [];

  constructor({ model }) {
    this.model = model;
  }

  setFormat(format) {
    this.format = format;

    console.log(`[LLM] Format set: ${JSON.stringify(this.format)}`);
  }

  async chat(requestContent) {
    console.log(`[LLM] Sending request content: "${requestContent}"...`);

    this.messages.push({ role: 'user', content: requestContent });

    const response = await ollama.chat({
      format: this.format ? this.format : undefined,
      messages: this.messages,
      model: this.model,
    });

    this.messages.push(response.message);

    const { content: responseContent } = response.message;

    console.log(`[LLM] Response content received: "${responseContent}"`);

    const result = {
      data: responseContent,
      isJson: false,
    };

    if (this.format) {
      try {
        result.data = JSON.parse(responseContent);
        result.isJson = true;

        return result;
      } catch (error) {
        console.error('[LLM] Error parsing JSON, returning response as plain text!');

        return result;
      }
    }

    return result;
  }
}
