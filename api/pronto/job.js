var fetch = require('isomorphic-unfetch');
const { parse } = require("url");

module.exports = (req, res) => {

    const { query } = parse(req.url, true);
    const { id } = query;

    console.log('id', id);

    fetch('https://aquaheat-xi-03.prontohosted.com.au/pronto/rest/t15.customerportal/api/ServiceGetServiceCalls', {
        method: "POST",
        headers: {
            'X-Pronto-Token': req.headers['x-pronto-token'],
            'Content-Type': 'application/xml'
        },
        body: '<ServiceGetServiceCallsRequest>\n' +
            '<Parameters>\n' +
            '   <CallNo> ' + id + '</CallNo>\n' +
            '</Parameters>\n' +
            '    <RequestFields>\n' +
            '        <ServiceCalls>\n' +
            '            <ServiceCall>\n' +
            '                <CallNo />\n' +
            '                <Action />\n' +
            '                <CallDescription />\n' +
            '                <RequiredDate />\n' +
            '                <CustomerName />\n' +
            '                <CustomerCode />\n' +
            '                <Status />\n' +
            '                <Priority />\n' +
            '                <Operator />\n' +
            '            </ServiceCall>\n' +
            '        </ServiceCalls>\n' +
            '    </RequestFields>\n' +
            '</ServiceGetServiceCallsRequest>'
    }).then(function (response) {
        // console.log('api getJobs: response', response);
        return response.text();
    })
        .then(function (xmlData) {
            // console.log('xmlData', xmlData);
            res.setHeader('Content-Type', 'application/xml')
            res.end(xmlData)
        })
        .catch(err => {
            console.log("Promise Rejected");
            res.end('Error in API', err);
        });


}
