'use strict';
const Text = require('./text');

class Confirm extends Text {
  constructor(opts = {}) {
    super(opts);
    this._deny = opts.deny || 'n';
    this._accept = opts.accept || 'Y';
    this._default = opts.default || 'Y';
  }

  _responses() {
    return `[${this._accept}/${this._deny}] `;
  }

  _formatQuery(){
    return super._formatQuery() + this._responses();
  }

  async request() {
    const result = await super.request();
    const value = result[this._handle] || this._default;
    result[this._handle] = this._accept === value;
    return result;
  }
}

module.exports = Confirm;
