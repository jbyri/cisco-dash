# Backend Services Deployment

### Windows Deployment
1. visit https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/#get-mongodb-community-edition
2. follow instructions to install mongo.
3. follow instructions to configure mongo environment (local)
4. First run: Allow access
   ![AllowAccessDialog](../../../wiki_src/images/MongoDAllowAccess.jpg)
5. Run `npm run start:win` to start the windows build

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
