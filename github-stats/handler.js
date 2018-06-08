"use strict"

const GithubHelper = require('./lib/github-helper');
const fs = require("fs");

const API_KEY_NAME = process.env.API_KEY_NAME;

const token = fs
  .readFileSync(`/var/openfaas/secrets/${API_KEY_NAME}`)
  .toString();

module.exports = (context, callback) => {
    const org = JSON.parse(context).org;
    const helper = new GithubHelper(org, token)

    helper.createReport()
        .then(r => callback(undefined, r))
        .catch(err => callback(err, undefined));
}