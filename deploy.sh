#!/bin/bash
# Runs the install script, then links node moduls
rm -R /var/www/html/* && npm install && gulp deployRelease && ln -s ./node_modules /var/www/html/node_modules
