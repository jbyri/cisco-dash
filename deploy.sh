#!/bin/bash
# Runs the install script, then links node moduls
rm -R /var/www/html/* && npm install && gulp deployRelease && ln -s ~/git/cisco-dash/node_modules /var/www/html/node_modules
