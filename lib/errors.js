'use strict';

const _ = require('lodash');
const chalk = require('chalk');
const empty = '';

const get = (envs) => {

    const keys = envs ? _.join(envs, ', ') : empty;
    const error = chalk.red(`Environment variables ${keys} are not defined. Aborting.`);
    return new Error(error);
};

module.exports = { get };
