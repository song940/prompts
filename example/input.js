const Input = require('../elements/input');

const input = new Input({
  name: 'text',
  message: 'Input Text:'
});

input.request().then(console.log)
