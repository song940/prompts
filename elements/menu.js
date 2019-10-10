'use strict';
const Prompt = require('./prompt');

const { log } = console;

class Menu extends Prompt {
  constructor(opts = {}) {
    super(opts);
    this._menu = opts.menu || [];
  }

  get _menuItems(){
    return this._menu;
  }

  _clearLines(n) {
    for (let i = 0; i < n; i++) {
      this._output.moveCursor(0, -1);
      this._output.clearLine();
      this._output.cursorTo(0);
    }
  }

  _displayMenu() {
    log(this._menuItems.join('\n'));
  }

  _clearMenu() {
    this._clearLines(this._menu.length);
  }

  _refreshMenu() {
    this._clearMenu();
    this._displayMenu();
  }
}

module.exports = Menu;
