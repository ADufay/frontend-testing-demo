import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export const whenClickOnSubmitButton = async () => {
  const submitInput = await screen.findByText('Envoyez le message');
  await userEvent.click(submitInput);
};
