import { validationResult } from 'express-validator';
import GetAllEventsDataController from '@controllers/get_all_events_data.controller.ts';
import { Request, Response, NextFunction } from 'express';
import { logger } from '@utils/logger';

jest.mock('express-validator', () => ({
  validationResult: jest.fn(),
}));

jest.mock('@utils/logger', () => ({
  logger: {
    error: jest.fn(),
  },
}));

describe('GetAllEventsDataController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;
  let controller: GetAllEventsDataController;
  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    controller = new GetAllEventsDataController();
  });

  it('should return 400 if validation errors exist', async () => {
    const mockValidationResult = {
      isEmpty: jest.fn().mockReturnValue(false),
      array: jest.fn().mockReturnValue([{ msg: 'Error' }]),
    };

    (validationResult as unknown as jest.Mock).mockReturnValue(mockValidationResult);

    await controller.index(req as Request, res as Response, next);

    expect(logger.error).toHaveBeenCalledWith('Validation error:', { errors: [{ msg: 'Error' }] });
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ errors: [{ msg: 'Error' }] });
  });
});
