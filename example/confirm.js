const Confirm = require('../elements/confirm');

const confirm = new Confirm({
  name: 'yn',
  message: 'Are you sure ?'
});

confirm.request().then(console.log);
