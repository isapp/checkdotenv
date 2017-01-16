'use strict';

const _ = require('lodash');
const chalk = require('chalk');
const empty = '';

const get = (envs) => {

    const keys = envs ? _.join(envs, ', ') : empty;
    let message = chalk.red(`Environment variables ${keys} are not defined. Aborting.`);
    message = message.replace(/\s{2,}/, ' ');

    return new Error(message);
};

module.exports = { get };
