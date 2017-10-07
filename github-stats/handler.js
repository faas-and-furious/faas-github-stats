"use strict"

const GithubHelper = require('./lib/github-helper');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

module.exports = (context, callback) => {
    const org = JSON.parse(context).org;
    const helper = new GithubHelper(org, GITHUB_TOKEN)

    helper.createReport()
        .then(r => callback(undefined, r))
        .catch(err => callback(err, undefined));
}