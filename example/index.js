const prompts = require('..');

const questions = [
  {
    type: 'input',
    name: 'username',
    message: 'Type your username:',
  },
  {
    type: 'hidden',
    name: 'password',
    message: 'Type your password:',
  },
  {
    type: 'confirm',
    name: 'pizza',
    message: 'Do you like pizza ?'
  },
  {
    type: 'select',
    name: 'color',
    message: 'Pick a color:',
    choices: [
      'Red',
      'Green',
      'Blue'
    ]
  }
];

(async () => {
  const answers = await prompts(questions)
  console.log(answers);
})();
