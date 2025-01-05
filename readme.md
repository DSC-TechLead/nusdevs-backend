# Backend for NUSDevs.com

This is api application layer for NUSDevs.com

### Project setup

#### 1. About Node Version

Before you doing anything please make sure you have the correct version of **NODE** installed and the latest version of **PNPM**. Recommand to use [nvm](https://github.com/nvm-sh/nvm) to install and manage different versions of nodejs (and npm).

Node version should be 22.x (`22.12.0` recommended). You can run `nvm use` and nvm will pick the correct version for you automatically. In fact, it is highly recommended for the the command `nvm use` to be added to your shell rc file for you to automatically configure your node version between projects. [Refer to the instructions.](https://github.com/nvm-sh/nvm?tab=readme-ov-file#calling-nvm-use-automatically-in-a-directory-with-a-nvmrc-file)

## Application

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

#### Running Prisma Locally

First run `docker compose up -d` to run the postgres container on port 5432.

See `package.json` file for specific commands.

- `pnpm run db:gen` generates the Prisma client in `/node_modules`.
- `pnpm run db:migrate` applies pending migrations to the database (adding new tables data).
- `pnpm run db:studio` opens Prisma Studio, a GUI for managing your database.
- `pnpm run db:reset` resets the database by applying all migrations from scratch (deleting all row data).
- `pnpm run db:seed` runs the seed script to populate the database with initial data.

Order to run:
`pnpm run db:gen` -> `pnpm run db:migrate` -> `pnpm run db:seed`

### Committing

Run `pnpm run commit` to use the `commitlint` tool for formatting.

#### Congrats! Now to run the backend:
