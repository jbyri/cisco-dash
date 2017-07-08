# Backend Services Deployment
`TODO - @wnamen, @barcher`


## AWS Information
### Host
ec2-34-201-69-1.compute-1.amazonaws.com

## AWS Tools for Windows
[Download Powershell Tools](https://aws.amazon.com/powershell/)

### Keys
`server-key.pem` allows ssh into the app server
key phrase: cisco!
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
2. Here is a history of the setup steps.

```
$ sudo apt-get update
$ cd /lib/systemd/system
$ sudo apt-get install -y mongodb
$ sudo nano /lib/systemd/system/mongodb.service
$ sudo systemctl daemon-reload
$ sudo mkdir /data
$ cd /data
$ sudo mkdir db
$ sudo nano /etc/mongodb.conf
$ sudo mongod &
$ sudo service mongod stop
$ sudo apt-get npm
$ sudo apt-get install -y npm
$ npm --version
$ curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
$ sudo apt-get install nodejs
$ npm -v
$ cd ~/
$ mkdir git
$ cd git/
$ git clone https://github.com/wnamen/cisco-dash.git
$ cd cisco-dash/
$ git status
$ sudo npm install
$ sudo npm install forever
$ ./start.sh &
$ sudo apt-get install apache2
$ ls -la /var/www/html
$ cd /etc/apache2/
$ ls
$ sudo nano apache2.conf
$ sudo service apache2 stop
$ sudo service apache2 start
$ cd ~/git/cisco-dash/
$ npm install -g gulp
$ sudo npm install -g gulp
$ sudo gulp default fullDistro copyToServer
$ cd /var/www/html/
$ ./start.sh
$ sudo gulp default copyToServer
```
