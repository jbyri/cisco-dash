#!/bin/bash
# Runs the install script, then links node moduls
cd /var/www/html/ && stop-server.sh && stop-mongod.sh && cd ~/git/cisco-dash
echo "finished stopping services"
rm -R /var/www/html/*
echo "cleaned HTTP Root Directory"
npm install && gulp deployRelease
echo "Upgrade NPM and distribution completed"
cp -R ~git/cisco-dash/dist/* /var/www/html/
echo "Copied all resources from dist to http root"
ln -s ~/git/cisco-dash/node_modules /var/www/html/node_modules
echo "linked node modules"
cd /var/www/html/ && start-mongod.sh && start-server.sh && cd ~/git/cisco-dash
echo "restarted mongo and passport service."
