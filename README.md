# CC2650-Dev

[![build](https://github.com/OmniShoes/CC2650-Dev/workflows/ci/badge.svg)](https://github.com/OmniShoes/CC2650-Dev/actions/workflows/ci.yml)

## Develop

Please use the latest Chrome browser for development since it has good support for the Web Bluetooth API.

Note that Web Bluetooth APIs are available only in secure contexts (which means `http://127.0.0.1`, `http://localhost`, `http://*.localhost`, `file://` and `https://`). Therefore, we cannot simply start an HTTP dev server on the PC and access it from a smartphone using the PC's IP address. One way to get around this is to use a reverse proxy on the smartphone (e.g. [Nginx running on Termux](https://github.com/OmniShoes/CC2650-Dev/blob/master/docs/nginx_conf.md)).

It would be much simpler to debug on the PC itself if it supports bluetooth. :)

To start the dev server:

```bash
yarn dev
```

## Build

```bash
yarn build
yarn serve
```
