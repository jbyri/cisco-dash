#!/bin/bash
npm install && gulp deployRelease && cp -R ./node_modules /var/www/html/
