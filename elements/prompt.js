'use strict';
const EventEmitter = require('events');

class Prompt extends EventEmitter {
  constructor(opts = {}) {
    super();
    this._type = opts.type;
    this._handle = opts.name;
    this._query = opts.message;
    this._prefix = opts.prefix;
    this._underline = opts.underline || false;
    this._input = opts.input || process.stdin;
    this._output = opts.output || process.stdout;
  }

  get _cursor() {
    return {
      hide: () => {
        if (!this._output.isTTY) return;
        this._output.write('\u001B[?25l');
        return this;
      },
      show: () => {
        if (!this._output.isTTY) return;
        this._output.write('\u001B[?25h');
        return this;
      }
    };
  }

  clearScreen() {
    this._output.cursorTo(0, 0);
    this._output.clearScreenDown();
    return this;
  }

  _underlineText(x) {
    return `\u001B[4m${x}\u001B[24m`;
  }

  _formatQuery() {
    const query = [];

    if (this._prefix) {
      query.push(this._prefix);
    }
    query.push(this._underline ? this._underlineText(this._query) : this._query);
    return query.join(' ') + ' ';
  }
}

module.exports = Prompt;
