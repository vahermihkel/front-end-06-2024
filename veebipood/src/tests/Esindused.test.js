import { fireEvent, render, screen } from '@testing-library/react';
import Esindused from '../pages/Esindused';
import { MemoryRouter } from 'react-router-dom';

test('renders "Lõunakeskus" tekst if Tartu is clicked', () => {
  render(
    <MemoryRouter>
      <Esindused />
    </MemoryRouter>
  );
  const buttonElement = screen.getByText("Tartu");
  fireEvent.click(buttonElement);
  const linkElement = screen.getByText("Lõunakeskus");
  expect(linkElement).toBeInTheDocument();
});

test('renders "Fama" tekst if Narva is clicked', () => {
  render(
    <MemoryRouter>
      <Esindused />
    </MemoryRouter>
  );
  const buttonElement = screen.getByText("Narva");
  fireEvent.click(buttonElement);
  const linkElement = screen.getByText("Fama");
  expect(linkElement).toBeInTheDocument();
});

