export const parseUrl = (url) => {
    const _url = new URL(url);
    const cloudName = _url.pathname.substring(1);
    const folder = _url.searchParams.get('folder');
    const serverUrl = new URL(_url.origin);
    serverUrl.protocol = _url.protocol;
    serverUrl.port = _url.port;
    return {
        serverUrl: serverUrl.toString(),
        host: _url.host,
        port: _url.port !== '' ? _url.port : null,
        apiKey: _url.username !== '' ? _url.username : null,
        apiSecret: _url.password !== '' ? _url.password : null,
        cloudName: cloudName !== '' ? cloudName : null,
        folder: folder !== '' ? folder : null
    };
};
