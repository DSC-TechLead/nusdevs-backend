import { getEventData } from '@api/get_event_data.api';
import { HttpException } from '@exceptions/HttpException';
import mockEvents from '@mock_data/events.data';

describe('getEventData', () => {
  it('should return event data for a valid ID', async () => {
    const validEventId = '1';
    const event = await getEventData(validEventId);

    expect(event).toBeDefined();

    const expectedEvent = mockEvents.find((ev) => ev.event_id === validEventId);
    expect(event).toEqual(expectedEvent);
  });

  it('should throw a 404 error if the event ID is not found', async () => {
    const invalidEventId = 'invalid-id';

    await expect(getEventData(invalidEventId)).rejects.toThrow(HttpException);
    await expect(getEventData(invalidEventId)).rejects.toThrow(
      `Event with ID ${invalidEventId} not found`
    );
  });
});
