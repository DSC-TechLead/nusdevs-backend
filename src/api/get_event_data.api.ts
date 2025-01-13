import { HttpException } from '@exceptions/HttpException';
import { EventData } from '@interfaces/models.interface';
import mockEvents from '@mock_data/events.data';

const getEventData = async (id: string): Promise<EventData> => {
  console.log('Searching for event ID:', id);

  const event = mockEvents.find((event) => event.event_id === id);

  if (!event) {
    throw new HttpException(404, `Event with ID ${id} not found`);
  }

  return event;
};

export { getEventData };
