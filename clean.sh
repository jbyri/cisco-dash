cd /var/www/html/ && stop-server.sh && stop-mongod.sh && cd ~/git/cisco-dash
echo "finished stopping services"
rm -R /var/www/html/*
echo "cleaned HTTP Root Directory"
