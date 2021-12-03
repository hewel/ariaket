import fastJson from 'fast-json-stringify';

const ws = new WebSocket('ws://localhost:6800/jsonrpc');

const stringify = fastJson({
  title: 'Example Schema',
  type: 'object',
  properties: {
    firstName: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    },
    age: {
      description: 'Age in years',
      type: 'integer',
    },
    reg: {
      type: 'string',
    },
  },
});

console.log(
  stringify({
    firstName: 'Matteo',
    lastName: 'Collina',
    age: 32,
    reg: /"([^"]|\\")*"/,
  }),
);

export default ws;
