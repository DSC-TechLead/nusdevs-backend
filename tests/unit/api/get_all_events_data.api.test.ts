import { getAllEvents } from '@api/get_all_events_data.api';
import mockEvents from '@mock_data/events.data';

describe('getAllEvents', () => {
  it('should return all events', async () => {
    const events = await getAllEvents();

    expect(Array.isArray(events)).toBe(true);

    expect(events).toEqual(mockEvents);

    expect(events.length).toBe(mockEvents.length);

    events.forEach((event, index) => {
      expect(event).toHaveProperty('event_id', mockEvents[index].event_id);
      expect(event).toHaveProperty('event_name', mockEvents[index].event_name);
      expect(event).toHaveProperty('event_date', mockEvents[index].event_date);
    });
  });
});
