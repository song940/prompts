'use strict';
const readline = require('readline');
const Nav = require('./nav');

class Select extends Nav {
  constructor(opts) {
    const { choices, name, message, symbol } = opts;
    super(Object.assign({
      name,
      symbol,
      message,
      menu: choices
    }));
  }
  request() {
    const answer = {};
    const onkeypress = (_, key) => {
      const { name, ctrl } = key;
      if (key && ctrl && name === 'c') {
        this._cursor.show();
        this._input.pause();
      }
      switch (name) {
        case 'up':
        case 'k':
          this._moveUpwards();
          break;
        case 'down':
        case 'j':
          this._moveDownwards();
          break;
        case 'return':
          this.emit('selection', this._idx, this._menu);
          break;
        default:
          const n = Number(name);
          if (n >= 1 && n <= this._menu.length) {
            this.emit('selection', n - 1, this._menu);
          }
          break;
      }
    };
    return new Promise(resolve => {
      this._cursor.hide();
      this._displayQuestion();
      this._input.resume();
      this._input.setRawMode(true);
      readline.emitKeypressEvents(this._input);
      this._input.on('keypress', onkeypress);
      this.on('selection', (idx, menu) => {
        answer[this._handle] = menu[idx];
        this._cursor.show();
        this._input.pause();
        this._input.setRawMode(false);
        this._input.removeListener('keypress', onkeypress);
        this._displaySelection(answer[this._handle]);
        resolve(answer);
      });
    });
  }
}

module.exports = Select;
