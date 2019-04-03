const request = require("request");
var fetch = require('isomorphic-unfetch');

module.exports = (req, res) => {

    console.log(req.headers['x-pronto-token']);
    console.log(req.headers['x-pronto-token'] != 'QpwL5tke4Pnpja7X');
    if (req.headers['x-pronto-token'] != 'QpwL5tke4Pnpja7X') {
        res.end('incorrect token');
    }
    fetch('https://api.tvmaze.com/search/shows?q=batman', {
        method: "GET",
        headers: {
            'X-Pronto-Token': req.headers['x-pronto-token']
        },
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonData) {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(jsonData))
        })
        .catch(err => {
            console.log("Promise Rejected");
            res.end('Error in API');
        });


}
