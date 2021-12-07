import { stringifyRpc } from './utils/stringify';

const ws = new WebSocket('ws://localhost:6800/jsonrpc');

console.log(
  stringifyRpc({
    id: 'fgg',
    method: 'aria2.tellActive',
    params: ['token:4444'],
  }),
);

export default ws;
