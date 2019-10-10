const Hidden = require('../elements/hidden');

const hidden = new Hidden({
  symbol: '',
  name: 'password',
  message: 'Input Password:'
});

hidden.request().then(console.log)
