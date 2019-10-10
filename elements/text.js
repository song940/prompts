'use strict';
const { createInterface } = require('readline');
const Prompt = require('./prompt');

class Text extends Prompt {
  constructor(opts = {}) {
    super(opts);
    this._historySize = 0;
    this._promptSymbol = '';
  }

  get _promptOpts() {
    return {
      input: this._input,
      output: this._output,
      prompt: this._promptSymbol,
      historySize: this._historySize
    };
  }

  _createPrompt() {
    return createInterface(this._promptOpts);
  }

  _clearChars(n) {
    this._output.moveCursor(-n, 0);
    this._output.clearLine(1);
  }

  request() {
    return new Promise(resolve => {
      const result = {};
      const prompt = this._createPrompt();
      prompt.question(this._formatQuery(), answer => {
        result[this._handle] = answer;
        prompt.close();
        resolve(result);
      });
    });
  }
}

module.exports = Text;
