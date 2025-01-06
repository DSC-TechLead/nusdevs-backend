import { Application } from 'express';
import request from 'supertest';
import GetAllEventsRoute from '@routes/get_all_events_data.route';
import App from '@app';
import { getAllEvents } from '@api/get_all_events_data.api';

jest.mock('@api/get_all_events_data.api');

describe('GetAllEventsRoute', () => {
  let app: Application;

  beforeEach(() => {
    const getAllEventsRoute = new GetAllEventsRoute();
    app = new App([getAllEventsRoute]).getServer();
  });

  it('should return 200 and all events data', async () => {
    const mockEvents = [
      {
        event_id: '1',
        event_name: 'Event 1',
        event_date: '2025-01-01T12:00:00Z',
        created_at: '2025-01-01T12:00:00Z',
        updated_at: '2025-01-02T12:00:00Z',
      },
      {
        event_id: '2',
        event_name: 'Event 2',
        event_date: '2025-01-01T12:00:00Z',
        created_at: '2025-01-01T12:00:00Z',
        updated_at: '2025-01-02T12:00:00Z',
      },
    ];

    (getAllEvents as jest.Mock).mockResolvedValue(mockEvents);

    const res = await request(app).get('/events');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockEvents);
    expect(getAllEvents).toHaveBeenCalledTimes(1);
  });

  it('should handle server errors gracefully', async () => {
    (getAllEvents as jest.Mock).mockRejectedValue(new Error('Internal Server Error'));

    const res = await request(app).get('/events');

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ errors: ['Server error'] });
    expect(getAllEvents).toHaveBeenCalledTimes(1);
  });
});
