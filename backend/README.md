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
