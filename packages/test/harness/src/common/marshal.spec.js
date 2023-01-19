const marshal = require('./marshal');

const ERROR = new Error('message');

ERROR.stack = 'stack';

describe('Marshalling value of', () => {
  test('error', () => {
    expect(marshal(ERROR)).toMatchInlineSnapshot(`
      {
        "__type": "error",
        "message": "message",
        "stack": "stack",
      }
    `);
  });

  test('object', () => {
    expect(
      marshal({
        boolean: true,
        error: ERROR,
        number: 123,
        null: null,
        string: 'string',
        undef: undefined
      })
    ).toMatchInlineSnapshot(`
      {
        "boolean": true,
        "error": {
          "__type": "error",
          "message": "message",
          "stack": "stack",
        },
        "null": null,
        "number": 123,
        "string": "string",
        "undef": {
          "__type": "undefined",
        },
      }
    `);
  });

  test('array', () => {
    // eslint-disable-next-line no-magic-numbers
    expect(marshal([true, ERROR, 123, null, 'string', undefined])).toMatchInlineSnapshot(`
      [
        true,
        {
          "__type": "error",
          "message": "message",
          "stack": "stack",
        },
        123,
        null,
        "string",
        {
          "__type": "undefined",
        },
      ]
    `);
  });
});
