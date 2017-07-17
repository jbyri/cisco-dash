# AWS Deployment documentation
This outlines the steps needed to fully deploy all portions of the Dashboard app to production.

## AWS Information
### Host
This is a temporary host until transferred to cisco!

`ec2-34-201-69-1.compute-1.amazonaws.com`

## AWS Tools for Windows
[Download Powershell Tools](https://aws.amazon.com/powershell/)

### Keys
`server-key.pem` allows ssh into the app server
key phrase (for ppk keys on PuTTY): cisco!
example: `ssh -i "server-key.pem" ubuntu@ec2-34-201-69-1.compute-1.amazonaws.com`

with putty:
Download [PuTTy](https://www.chiark.greenend.org.uk/~sgtatham/putty/)
Follow [PuTTy AWS Connection Doc](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/putty.html)


## FIRST TIME SETUP [Important]
### Setting up the EC2 instance
1. Follow the steps on Amazon EC2 and setup an UBUNTU instance (These steps may be different on other AWS hosts).
2. Generate a Key File and download it. You'll need it to ssh or PuTTY into your server.
3. Connect to the EC2 Instance
   1. [Using Putty](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/putty.html?icmpid=docs_ec2_console)
   2. [Using SSH]

### Instance Configuration Steps

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

## Deploying to Production

### Updating to latest version, and deploying to EC2.

1. Connect to your AWS EC2 instance (see instructions above)
2. Update the prod repo

    ```
    cd ~/git/cisco-dash && git pull origin master
    ```
3. First Run:
    ```
    npm run deploy:nix
    ```
  
4. Subsequent Runs:
    Stop the Passport service and MongoD and re-deploy assets, and restart services.
    ```
    npm run clean:nix
    npm run deploy:nix
    ```
   
5. Build, distribute, and copy to prod
   ```
   npm run clean:nix
   npm run deploy:nix
   ```
4. Start the Passport Service and Mongo DB
   ```
   cd /var/www/html
   npm run start:nix
   ```
