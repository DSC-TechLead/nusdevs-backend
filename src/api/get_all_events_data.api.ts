import { EventData } from '@interfaces/models.interface';
import mockEvents from '@mock_data/events.data';


const getAllEvents = async (): Promise<EventData[]> => {
  console.log('Fetch all events');
  return mockEvents;
};

export { getAllEvents };
