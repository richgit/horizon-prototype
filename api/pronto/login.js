var fetch = require('isomorphic-unfetch');

module.exports = (req, res) => {

    console.log('login api: user=', req.headers['x-pronto-username']);
    const LOGIN_URL = 'https://aquaheat-xi-03.prontohosted.com.au/pronto/rest/t15.customerportal/login';

    fetch(LOGIN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Pronto-Username': req.headers['x-pronto-username'],
                'X-Pronto-Password': req.headers['x-pronto-password']
            }
        }
    )
        .then(function (response) {
            // console.log('api getJobs: response', response);
            return response.text();
        })
        .then(function (xmlData) {
            console.log('xmlData- login', xmlData);
            res.setHeader('Content-Type', 'application/xml')
            res.end(xmlData)
        })
        .catch(err => {
            console.log("Promise Rejected");
            res.end('Error in API', err);
        });

}
