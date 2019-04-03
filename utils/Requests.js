
export const getBaseApiUrl = (req) => {
    let protocol = 'https:'
    let host = req ? req.headers.host : window.location.hostname
    if (host.indexOf('localhost') > -1) {
        host = 'localhost:8004'
        protocol = 'http:'
    }
    return `${protocol}//${host}`;
};
