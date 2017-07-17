#!/bin/bash
# Runs the install script, then links node moduls
npm install && gulp deployRelease
echo "Upgrade NPM and distribution completed"
cp -R ~/git/cisco-dash/dist/* /var/www/html/
echo "Copied all resources from dist to http root"
ln -sT ~/git/cisco-dash/node_modules /var/www/html/node_modules
echo "linked node modules"
cd /var/www/html/ && ./start-mongod.sh && ./start-server.sh
echo "restarted mongo and passport service."
