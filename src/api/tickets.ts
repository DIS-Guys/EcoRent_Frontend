import { Ticket } from '../types/Ticket';
import { client } from '../utils/sendRequest';

export const createTicket = async ({ userEmail, message }: Ticket) => {
  return client.post('/api/tickets/createTicket', { userEmail, message });
};
