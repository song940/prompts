const Select = require('../elements/select');

const menu = new Select({
  name: 'color',
  message: 'Pick a color:',
  choices: [
    'Red',
    'Green',
    'Blue'
  ],
  symbol: '+'
});

menu.request().then(console.log)
