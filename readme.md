# Backend for NUSDevs.com

This is api application layer for NUSDevs.com

### Project setup

#### 1. Install Node


#### 2. Project dependencies

##### 1) Install PostgreSQL

We use PostgreSQL as database. Please search pg setup tutorials on Google for your local machine.

If you are using macOS, you can setup PostgresSQL in the following way:

```
brew install postgresql
initdb /usr/local/var/postgres
brew services start postgresql
psql -h localhost -d postgres -c 'create user root with superuser;'
```

If you receive an during the `initdb /usr/local/var/postgres` step such as:

`initdb: error: could not create directory "/usr/local/var": Permission denied`

Try:
```
sudo mkdir /usr/local/var/postgres
sudo chmod 775 /usr/local/var/postgres
sudo chown $(whoami) /usr/local/var/postgres
```

and then run `initdb /usr/local/var/postgres` again.

Insert setup for seed data herej
```
```

##### 2) Install & configure AWS CLI

```
brew install awscli
```

Ask whoever's the techlead to create your AWS identity account. Upon setting up your
AWS identity select BackendDevelopers, and then Management Console. Once inside 
the AWS Console, choose SecretsManager. Please double check you are in correct 
region (on the top right corner). Search for `<insert path/to/secret here>`.
Click on the item, and choose `Retrieve Secret Value`.
You will use the aws access key value and secret access key value below.


use the following example to configure AWS CLI.

```
aws configure --profile nusdevs-backend-api-dev
AWS Access Key ID [****************F4FR]: # paste key id here
AWS Secret Access Key [****************kPh1]: # paste secret here
Default region name [None]: # paste region name here
Default output format [None]: json
```

and then modify `.env.local` and `.env.test.local` in project root, add line:
```
AWS_PROFILE=nusdevs-backend-api-dev
```

#### Congrats! Now to run the backend:

