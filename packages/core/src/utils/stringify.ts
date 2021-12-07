import fastJson from './fastJson';

export const stringifyRpc = fastJson({
  type: 'object',
  properties: {
    jsonrpc: {
      type: 'string',
      default: '2.0',
    },
    id: {
      anyOf: [{ type: 'string' }, { type: 'number' }],
    },
    method: {
      type: 'string',
    },
    params: {
      type: 'array',
      items: {
        anyOf: [
          { type: 'string' },
          { type: 'number' },
          {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        ],
      },
    },
  },
});

export default stringifyRpc;
