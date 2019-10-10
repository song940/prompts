'use strict';
const readline = require('readline');
const Text = require('./text');

class Input extends Text {
  _echoStr(text) {
    return text;
  }
  _displayInputStr(text) {
    const str = this._echoStr(text);
    this._output.write(str);
  }

  _removeLastChar(x) {
    return x.slice(0, x.length - 1);
  }

  _clearLastChar(text) {
    this._clearChars(text.length);
  }

  request() {
    var text = '';
    const prompt = this._createPrompt();
    const onkeypress = (char, key) => {
      const { ctrl, name } = key;
      if (key && ctrl && name === 'c') {
        this._input.pause();
      }
      switch (name) {
        case 'return':
          this._input.pause();
          break;

        case 'backspace':
          this._clearChars(text.length);
          text = this._removeLastChar(text);
          this._displayInputStr(text);
          break;

        default:
          if (!char || char.length > 2) return;
          text += prompt.line;
          prompt.line = '';
          this._clearLastChar(text);
          this._displayInputStr(text);
          break;
      }
    };
    return new Promise(resolve => {
      const result = {};
      readline.emitKeypressEvents(this._input);
      this._input.on('keypress', onkeypress);
      prompt.question(this._formatQuery(), () => {
        result[this._handle] = text;
        this._input.removeListener('keypress', onkeypress);
        prompt.close();
        resolve(result);
      });
    });
  }
}

module.exports = Input;
