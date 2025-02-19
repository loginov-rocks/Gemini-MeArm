# Hand Solo

Project to control 4 DOF Robot Arm (such as MeArm) with LLM.

## LLM

Using Ollama with Llama 3.2.

1. Download app from https://ollama.com
2. Install app
3. Launch app
4. Run `ollama run llama3.2` in cmd to pull the model
5. Test request/response in cmd, exit.

## App

Developed with Node.js v20.

```
npm i
npm run test:llm
npm run test:serial
npm run test:stt
npm run test:tts
npm start
```

## Firmware

Arduino Mega is used, but it can be anything, including Uno, as long as it has 4 PWM pins to control servos and a
serial port.

## TODO

1. Support optional text-only mode when user responses are typed in the console.

## Reference

* https://serialport.io
* https://picovoice.ai/docs/quick-start/cheetah-nodejs/
* https://picovoice.ai/docs/api/cheetah-nodejs/
* https://picovoice.ai/docs/quick-start/pvrecorder-nodejs/
* https://picovoice.ai/docs/api/pvrecorder-nodejs/
* https://picovoice.ai/docs/quick-start/orca-nodejs/
* https://picovoice.ai/docs/api/orca-nodejs/
* https://www.npmjs.com/package/play-sound
* https://ollama.com
* https://github.com/ollama/ollama-js
* https://github.com/ollama/ollama/blob/main/docs/api.md#chat-request-no-streaming
* https://github.com/ollama/ollama/blob/main/docs/api.md#chat-request-structured-outputs
* https://github.com/ollama/ollama/blob/main/docs/api.md#chat-request-with-history
