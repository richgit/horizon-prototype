
const express = require("express");
const router = express.Router();

router.get("/getJobs", (req, res) => {
    console.log('server.js: api/pronto')

    fetch('https://api.tvmaze.com/search/shows?q=batman', {
        method: "GET",
        headers: {
            'X-Pronto-Token': req.get('X-Pronto-Token')
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
            res.redirect('/error');
        });
});

module.exports = router;