import { Counter, Registry, collectDefaultMetrics } from 'prom-client';
import { SVC_TAG, NODE_ENV } from '@config/index';
import { Request, Response, NextFunction } from 'express';

// Create a new registry
const metricsRegister = new Registry();

// Set default labels to apply to all metrics
metricsRegister.setDefaultLabels({
  app: String(SVC_TAG),
  env: NODE_ENV,
});

// Collect default system/process metrics
collectDefaultMetrics({ register: metricsRegister });

// Create a custom metric: http_requests_total
const httpRequestsTotalMetric = new Counter({
  name: 'http_requests_total',
  help: 'Count of all HTTP requests',
  registers: [metricsRegister],
});

/**
 * Middleware to increment HTTP request count metric.
 * Add this to your Express middleware stack so every incoming request increments the counter.
 */
const metricsMiddleware = (_req: Request, _res: Response, next: NextFunction) => {
  try {
    httpRequestsTotalMetric.inc();
    next();
  } catch (error) {
    next(error);
  }
};

export { metricsRegister, metricsMiddleware };
