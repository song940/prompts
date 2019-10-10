## prompts

> Minimal interactive command-line prompts

### Installation

```bash
$ npm install xprompt
```

### Example

#### Single Prompt

Prompt with a single prompt object. Returns object with the response.

```js
const prompts = require('xprompt');

(async () => {
  const response = await prompts({
    type: 'input',
    name: 'age',
    message: 'How old are you?',
  });

  console.log(response); // => { age: '24' }
})();

```

#### Prompt Chain

Prompt with a list of prompt objects. Returns object with response. Make sure to give each prompt a unique name property to prevent overwriting values.

```js
const Prompts = require('xprompt');

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
    menu: [
      'Red',
      'Green',
      'Blue'
    ]
  }
];

const prompts = new Prompts({
  prefix: '[Prompts]',
  underline: true
});

prompts.prompt(questions).then(console.log);
```

### API

* new Prompts(options?: Object)
* prompts(questions: Array | Object, options?: Object): Promise
* prompts.text(prompt: Object): Promise
* prompts.hidden(prompt: Object): Promise
* prompts.confirm(prompt: Object): Promise
* prompts.select(prompt: Object): Promise
* prompts.keypress(prompt: Object): Promise

### Contributing

- Fork this Repo first
- Clone your Repo
- Install dependencies by `$ npm install`
- Checkout a feature branch
- Feel free to add your features
- Make sure your features are fully tested
- Publish your local branch, Open a pull request
- Enjoy hacking <3

### MIT

This work is licensed under the [MIT license](./LICENSE).

---
