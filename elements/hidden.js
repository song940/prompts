'use strict';
const Input = require('./Input');

class Hidden extends Input {
  constructor(opts = {}) {
    super(opts);
    const { symbol } = Object.assign({
      symbol: '*'
    }, opts);
    this._symbol = symbol;
  }

  _clearLastChar(text) {
    this._clearChars(this._symbol ? text.length : 1);
  }

  _echoStr(text) {
    return this._symbol.repeat(text.length);
  }
}

module.exports = Hidden;
