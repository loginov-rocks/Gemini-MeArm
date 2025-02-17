import { ReadlineParser } from '@serialport/parser-readline';
import { SerialPort } from 'serialport'

const SERIAL_PORT_PATH = '/dev/cu.usbserial-210';
const SERIAL_PORT_BAUDRATE = 9600;

const serialPort = new SerialPort({
  path: SERIAL_PORT_PATH,
  baudRate: SERIAL_PORT_BAUDRATE,
});

const readlineParser = serialPort.pipe(new ReadlineParser());

serialPort.on('open', () => {
  console.log('Serial port opened');

  serialPort.write('Hello from Node.js!\n');

  readlineParser.on('data', (data) => {
    console.log('Data from Arduino:', data);
  });
});

serialPort.on('error', (err) => {
  console.error('Error:', err);
});

serialPort.on('close', () => {
  console.log('Serial Port Closed');
});

setInterval(() => {
  serialPort.write('Another message!\n');
}, 2000);
