'use strict';

const _ = require('lodash');
const Dotenv = require('dotenv');
const Fs = require('fs');
const Path = require('path');

const read = (filename) => {

    const filePath = `${process.cwd()}${Path.sep}${filename}`;
    const content = Fs.readFileSync(filePath);
    return Dotenv.parse(content);
};

const hasMissingVariables = (filename) => {

    const parsed = read(filename);
    const diff = _.difference(Object.keys(parsed), Object.keys(process.env));
    return _.size(diff) > 0 ? diff : false;
};

module.exports = { read, hasMissingVariables };
