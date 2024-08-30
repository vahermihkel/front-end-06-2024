import { fireEvent, render, screen } from '@testing-library/react';
import Avaleht from '../pages/Avaleht';
import { MemoryRouter } from 'react-router-dom';

test('renders less products if filter is clicked', () => {
  render(
    <MemoryRouter>
      <Avaleht />
    </MemoryRouter>
  );
  const lisaOstukorviButtons = screen.getAllByText("Lisa ostukorvi");
  const buttonsInitialCount = lisaOstukorviButtons.length;
  const buttonElement = screen.getByText("Filtreeri odavamad kui 50 000");
  fireEvent.click(buttonElement);

  const lisaOstukorviAfterButtons = screen.getAllByText("Lisa ostukorvi");
  const buttonsAfterClickCount = lisaOstukorviAfterButtons.length;
  expect(buttonsInitialCount).toBeGreaterThan(buttonsAfterClickCount);
  
});

test('adds item to localStorage', () => {
  render(
    <MemoryRouter>
      <Avaleht />
    </MemoryRouter>
  );
  const lisaOstukorviButton = screen.getAllByText("Lisa ostukorvi")[0];
  fireEvent.click(lisaOstukorviButton);
  const LS = JSON.parse(localStorage.getItem("ostukorv"));
  const nobeName = LS[0].nimi;

  expect(nobeName).toBe("Nobe");
  
});
