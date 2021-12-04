import fastJson from './utils/fastJson';

const ws = new WebSocket('ws://localhost:6800/jsonrpc');

const stringify = fastJson({
  title: 'obj',
  type: 'object',
  properties: {
    make: {
      type: 'string',
    },
  },
});

console.log(
  stringify({
    make: 'ford',
  }),
);

export default ws;
