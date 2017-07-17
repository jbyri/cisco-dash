cd /var/www/html/ && ./stop-server.sh && ./stop-mongod.sh && cd ~/git/cisco-dash
echo "finished stopping services"
rm -r /var/www/html/*
echo "cleaned HTTP Root Directory"
