import '@testing-library/jest-dom';
import { validateEnv } from '@config/index';
import { config } from 'dotenv';
validateEnv();
config({ path: `tests/unit/.env.test.local` });

// console.log('Loaded test environment variables:', process.env);
