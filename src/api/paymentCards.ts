import { client } from '../utils/sendRequest';
import { PaymentCard } from '../types/PaymentCard.ts';

export const createPaymentCard = async ({ cardNumber, expiryDate, ownerName }: PaymentCard) => {
  return client.post('/api/paymentCards/createPaymentCard', { cardNumber, expiryDate, ownerName });
};

export const getUserPaymentCards = async () => {
  return client.get<PaymentCard[]>('/api/paymentCards/getPaymentCardsByOwnerId');
};

export const deleteCard = async (id: string) => {
  return client.delete(`/api/paymentCards/deletePaymentCard/${id}`);
};