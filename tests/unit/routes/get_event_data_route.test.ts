import request from 'supertest';
import App from '@app';
import GetEventDataRoute from '@routes/get_event_data.route';
import { getEventData } from '@api/get_event_data.api';

jest.mock('@api/get_event_data.api');

describe('GetEventDataRoute', () => {
  let app: App;

  beforeEach(() => {
    app = new App([new GetEventDataRoute()]);
  });

  afterEach(async () => {
    await app.close();
    jest.resetAllMocks();
  });

  it('should return 200 and event data for a valid ID', async () => {
    const mockEvent = {
      event_id: '1',
      event_name: 'Event 1',
      event_date: '2025-01-01T12:00:00Z',
      created_at: '2025-01-01T12:00:00Z',
      updated_at: '2025-01-02T12:00:00Z',
    };
    (getEventData as jest.Mock).mockResolvedValue(mockEvent);

    const res = await request(app.getServer()).get('/events/1/data');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockEvent);
    expect(getEventData).toHaveBeenCalledWith('1');
  });

  it('should handle server errors gracefully', async () => {
    (getEventData as jest.Mock).mockRejectedValue(new Error('Server error'));

    const res = await request(app.getServer()).get('/events/invalid-id/data');

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ errors: ['Server error'] });
    expect(getEventData).toHaveBeenCalledWith('invalid-id');
  });

  it('should return 400 if validation fails', async () => {
    const res = await request(app.getServer()).get('/events/invalid_id/data');

    expect(res.status).toBe(400);
    expect(res.body.errors).toBeDefined();
    expect(res.body.errors[0].msg).toBe('Event ID must be a valid UUID');
  });
});
