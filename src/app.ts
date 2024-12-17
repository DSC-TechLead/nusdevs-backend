import cors from 'cors';
import express from 'express';
import { NODE_ENV, PORT, ORIGIN, SVC_NAME, CREDENTIALS } from '@config/index';
import { Routes } from '@interfaces/routes.interface';
import { logger } from '@utils/logger';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import errorMiddleware from '@middlewares/error.middleware';
import jwtAuthMiddleware from '@middlewares/jwt_auth.middleware';
import { metricsMiddleware } from '@middlewares/metrics.middleware';
import { getHttpLogFormat } from '@utils/http_logs';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';
import hpp from 'hpp';
import { rdsQuery } from '@services/rds';
import { Server } from 'http';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;
  public appInstance: Server | null = null;
  private httpLogFormat: express.RequestHandler;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'local-dev';
    this.port = PORT || 3000;
    this.httpLogFormat = getHttpLogFormat();

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  public async listen(): Promise<void> {
    try {
      await this.initializeDatabase();

      this.appInstance = this.app
        .listen(this.port, () => {
          logger.info(
            `🚀 Starting ${SVC_NAME} in ${this.env} environment, listening on port ${this.port}`,
            {
              env: this.env,
              port: this.port,
            }
          );
        })
        .on('error', (error: Error) => {
          logger.error(`Error starting the server on port ${this.port} and env ${this.env}`, {
            error: error.message,
            env: this.env,
            port: this.port,
          });
        });

      // Increase the default keepAliveTimeout to 120 seconds
      this.appInstance.keepAliveTimeout = 120 * 1000;
      // This should be bigger than keepAliveTimeout + your server's expected response time
      this.appInstance.headersTimeout = 130 * 1000;
    } catch (error) {
      logger.error(`Failed to start the server: ${error.message}`);
      process.exit(1);
    }
  }

  public async close(): Promise<void> {
    if (this.appInstance) {
      await this.appInstance.close();
      this.appInstance = null;
    }
  }

  public getServer(): express.Application {
    return this.app;
  }

  private initializeMiddlewares(): void {
    // HTTP logging
    this.app.use(this.httpLogFormat);

    // Security & misc middlewares
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());

    // Metrics and authentication
    this.app.use(metricsMiddleware);
    this.app.use(jwtAuthMiddleware);
  }

  private initializeRoutes(routes: Routes[]): void {
    routes.forEach((route) => {
      this.app.use('/', route.router);
    });
  }

  private initializeSwagger(): void {
    const options = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: String(SVC_NAME),
          version: '1.0.0',
        },
      },
      apis: ['swagger.yaml'], // Adjust as needed for your project
    };
    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling(): void {
    this.app.use(errorMiddleware);
  }

  /**
   * Initialize a database connection or verify connectivity.
   * For RDS Data API, we typically don't maintain a persistent connection,
   * but we can do a quick check to ensure that queries work.
   */
  private async initializeDatabase(): Promise<void> {
    try {
      logger.info('Initializing database connection...');
      // Simple test query
      const testQuery = 'SELECT 1 as test';
      const result = await rdsQuery({ sql: testQuery });
      if (result?.length) {
        logger.info(`Successfully verified database connectivity for ${DATABASE_NAME}.`);
      } else {
        throw new Error('Database connectivity test returned no results.');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        logger.error('Error initializing database connection:', { error: error.message });
      } else {
        logger.error('Error initializing database connection:', { error });
      }
      throw new Error('Database initialization failed. Terminating server startup.');
    }
  }
}

export default App;
