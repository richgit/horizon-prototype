import cookie from "js-cookie";

export const setCookie = (key, value) => {
    if (process.browser) {
        console.log('setCookie, in browser so setting, key=' + key + 'value=' + value);
        cookie.set(key, value, {
            expires: 1,
            path: "/"
        });
    } else {
        console.log('setCookie, NOT in browser so NOT setting')
    }
};

export const removeCookie = key => {
    if (process.browser) {
        cookie.remove(key, {
            expires: 1
        });
    }
};

export const getCookie = (key, req) => {
    return process.browser ?
        getCookieFromBrowser(key) :
        getCookieFromServer(key, req);
};

const getCookieFromBrowser = key => {
    console.log('grabbing key from browser')
    return cookie.get(key);
};

const getCookieFromServer = (key, req) => {
    console.log('grabbing key from server')
    if (!req.headers.cookie) {
        return undefined;
    }
    const rawCookie = req.headers.cookie
        .split(";")
        .find(c => c.trim().startsWith(`${key}=`));
    if (!rawCookie) {
        return undefined;
    }
    return rawCookie.split("=")[1];
};