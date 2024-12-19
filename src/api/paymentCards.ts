import { client } from '../utils/sendRequest';
import { PaymentCard } from '../types/PaymentCard.ts';

export const addPaymentCard = async ({
  cardNumber,
  expiryDate,
  ownerName,
}: PaymentCard) => {
  return client.post('/api/paymentCards/addPaymentCard', {
    cardNumber,
    expiryDate,
    ownerName,
  });
};

export const getUserPaymentCards = async () => {
  return client.get<PaymentCard[]>(
    '/api/paymentCards/getPaymentCardsByOwnerId'
  );
};

export const deleteCard = async (id: string) => {
  return client.delete(`/api/paymentCards/deletePaymentCard/${id}`);
};
