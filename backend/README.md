# Backend Services Deployment

## AWS Information
### Host
ec2-34-201-69-1.compute-1.amazonaws.com

## AWS Tools for Windows
[Download Powershell Tools](https://aws.amazon.com/powershell/)

### Keys
`server-key.pem` allows ssh into the app server
key phrase (for ppk keys on PuTTY): cisco!
example: `ssh -i "server-key.pem" ubuntu@ec2-34-201-69-1.compute-1.amazonaws.com`


with putty:
Download [PuTTy](https://www.chiark.greenend.org.uk/~sgtatham/putty/)
Follow [PuTTy AWS Connection Doc](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/putty.html)

### Mac Deployment

1. Download `mongodb` via brew:
```
$ brew install mongodb
```

2. Set the `mongodb` environment:
```
$ sudo mkdir -p /data/db
```

3. Run `mongodb`:
```
$ mongod
```
For more information on setup, please reference the mongodb community edition documentation: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/

### Setting up the EC2 instance
1. Follow the steps on Amazon EC2 and setup an UBUNTU instance (These steps may be different on other AWS hosts).
2. Connect to the EC2 Instance
   1. [Using Putty](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/putty.html?icmpid=docs_ec2_console)
   2. [Using SSH]
2. Here is a history of the setup steps.

Update apt-get
```
$ sudo apt-get update
```

Install and Start mongodb
```
$ cd /lib/systemd/system
$ sudo apt-get install -y mongodb
$ sudo nano /lib/systemd/system/mongodb.service
$ sudo systemctl daemon-reload
$ sudo mkdir /data
$ cd /data
$ sudo mkdir db
$ sudo nano /etc/mongodb.conf
$ sudo mongod &
```

Install NPM and NodeJS
```
$ sudo apt-get npm
$ sudo apt-get install -y npm
$ npm --version
$ curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
$ sudo apt-get install nodejs
$ npm -v
```

Clone the Git Repo (into a safe dir)
```
$ cd ~/
$ mkdir git
$ cd git/
$ git clone https://github.com/wnamen/cisco-dash.git
$ cd cisco-dash/
$ git status
```

Update NPM and Node Modules
```
$ sudo npm install
$ sudo npm install -g forever
```
Install and configure Apache 2 Http server
```
$ sudo apt-get install apache2
$ cd /etc/apache2/
$ sudo nano apache2.conf
$ sudo service apache2 stop
$ sudo service apache2 start
```

Build and deploy the site.
```
$ cd ~/git/cisco-dash/
$ npm install -g gulp
$ sudo npm install -g gulp
$ sudo gulp default fullDistro copyToServer
$ cd /var/www/html/
```

Start the Server using forever
```
$ ./start.sh &
```

### Deploying to Production
1. Connect to your AWS EC2 instance (see instructions above)
2. Update the prod repo
   ```
   cd ~/git/cisco-dash && git pull origin master
   ```
3. Build, distribute, and copy to prod
   ```
   gulp default fullDistro copyToServer
   ```
4. Start MongoDB
   ```
   mongod &
   ```
5. Start Passport
   ```
   cd /var/www/html && ./start.sh &
   ```
