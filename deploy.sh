#!/bin/bash
# Runs the install script, then links node moduls
rm -R /var/www/html/* && npm install && npm run deploy:release && cp -R ~/git/cisco-dash/dist/* /var/www/html/ && ln -s ~/git/cisco-dash/node_modules /var/www/html/node_modules
