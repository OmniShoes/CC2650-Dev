# Nginx Configuration

This document shows how to set up a Nginx reverse proxy on an Android device.

1. Install [Termux app](https://termux.com/) on your Android device.
2. Install Nginx in Termux with `pkg install nginx` command.
3. Add the server block below to your `/data/data/com.termux/files/etc/nginx/nginx.conf` file.
4. Start Nginx with `nginx` command.

The server block:

```
server {
 listen 3000;
 server_name dev_server;
 location / {
   proxy_pass http://pc.ip.address:3000;
   proxy_http_version 1.1;
   proxy_set_header Upgrade $http_upgrade;
   proxy_set_header Connection "Upgrade";
   proxy_set_header Host $host;
 }
}
```
