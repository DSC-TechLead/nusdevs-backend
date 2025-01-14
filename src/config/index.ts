import { config } from 'dotenv';
import { cleanEnv, str, port, bool } from 'envalid';

config({ path: `.env.${process.env.NODE_ENV || 'local-dev'}.local` });

const validateEnv = () => {
  if (process.env.NODE_ENV === 'test') {
    console.log('Skipping environment validation in test mode');
    process.env.CREDENTIALS = process.env.CREDENTIALS || 'true';
    process.env.ORIGIN = process.env.ORIGIN || '*';
    process.env.PORT = process.env.PORT || '3000';

    return process.env;
  }

  return cleanEnv(process.env, {
    DB_USER: str(),
    DB_HOST: str(),
    DB_NAME: str(),
    DB_PASSWORD: str(),
    DB_PORT: str(),
    NODE_ENV: str({
      choices: ['local-dev', 'development', 'test', 'production', 'staging'],
      default: 'local-dev',
    }),
    PORT: port({ default: 3000 }),
    LOG_DIR: str({ default: 'logs' }),
    ORIGIN: str({ default: '*' }),
    CREDENTIALS: bool({ default: true }),
    SVC_TAG: str({ default: 'nusdevs-backend-api' }),
    SVC_NAME: str({ default: 'NUSdevs Backend Service API' }),
    DATABASE_ARN: str(),
    SECRET_ARN: str(),
    DATABASE_NAME: str(),
  });
};

export const {
  DB_USER,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  NODE_ENV,
  PORT,
  LOG_DIR,
  ORIGIN,
  CREDENTIALS,
  SVC_TAG,
  SVC_NAME,
  DATABASE_ARN,
  SECRET_ARN,
  DATABASE_NAME,
} = validateEnv();

// Let's see if we have the bandwidth to create a staging env
const short_envs = {
  'local-dev': 'dev',
  development: 'dev',
  staging: 'stag',
  production: 'prod',
};

export const ENV_SHORT = short_envs[NODE_ENV];
export { validateEnv };
