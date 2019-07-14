var fetch = require('isomorphic-unfetch');

module.exports = (req, res) => {

    fetch('https://aquaheat-xi-03.prontohosted.com.au/pronto/rest/t15.customerportal/api/ServiceGetServiceCalls', {
        method: "POST",
        headers: {
            'X-Pronto-Token': req.headers['x-pronto-token'],
            'Content-Type': 'application/xml'
        },
        body: '<ServiceGetServiceCallsRequest>\n' +
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
            '                <CustomerReference />\n' +
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
