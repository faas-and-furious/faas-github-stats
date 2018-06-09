"use strict"

const fs = require("fs");

module.exports = (event, context) => {
    console.log('event', JSON.stringify(event))

    let err;

    let result = '';
    let contentType = '';
    if (event.query && event.query.path) {
        const {path} = event.query;

        result = fs
            .readFileSync(`${__dirname}/dist${path}`)
            .toString();

        if (path.endsWith('.js')) {
            contentType = 'text/javascript';
        } else if (path.endsWith('.css')) {
            contentType = 'text/css';
        }
    } else {
        result = fs
            .readFileSync(`${__dirname}/dist/index.html`)
            .toString()
        contentType = 'text/html';
    }

    context
        .status(200)
        .headers({'Content-Type': contentType})
        .succeed(result);
}
