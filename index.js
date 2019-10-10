'use strict';
const Input = require('./elements/input');
const Hidden = require('./elements/hidden');
const Select = require('./elements/select');
const Confirm = require('./elements/confirm');

const $ = async (questions, options) => {
  const answers = {};
  for (const question of from(questions)) {
    const { type } = question;
    const x = Object.assign({}, question, options);
    const answer = await $[type](x);
    Object.assign(answers, answer);
  }
  return answers;
};

const from = x => {
  if (Array.isArray(x))
    return x;
  if (x.type && x.name)
    return [x];
  return Object.keys(x).reduce((questions, name) => {
    const question = x[name];
    question.name = name;
    questions.push(question);
    return questions;
  }, []);
}

$.text = x => {
  return new Input(x).request();
};

$.confirm = x => {
  return new Confirm(x).request();
};

$.hidden = x => {
  return new Hidden(x).request();
};

$.select = x => {
  return new Select(x).request();
};

$.input = x => {
  return new Input(x).request();
};

function Prompts(x, y) {
  if (this instanceof Prompts) {
    Object.assign(this, x);
  } else {
    return $(x, y);
  }
}

Prompts.prototype.prompt = function (x, y) {
  return $(x, Object.assign({}, y, this));
}

module.exports = Object.assign(Prompts, $);
