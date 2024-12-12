import { config } from 'dotenv';
import { cleanEnv, str } from 'envalid';

config({ path: `.env.${process.env.NODE_ENV || 'local-dev'}.local` });

const validateEnv = () =>
  cleanEnv(process.env, {
    DB_USER: str(),
    DB_HOST: str(),
    DB_NAME: str(),
    DB_PASSWORD: str(),
    DB_PORT: str(),
  });

export const {
  DB_USER,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
} = validateEnv();

// Let's see if we have the bandwidth to create a staging env
const short_envs = {
  'local-dev': 'dev',
  development: 'dev',
  staging: 'stag',
  production: 'prod',
};
