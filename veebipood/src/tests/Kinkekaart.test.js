import { fireEvent, render, screen } from '@testing-library/react';
import Kinkekaart from '../pages/Kinkekaart';

test('renders suurenda kogust tekst', () => {
  render(<Kinkekaart />);
  const linkElement = screen.getByText(/suurenda kogust!/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders "Suurendasid kogust" tekst if button is clicked', () => {
  render(<Kinkekaart />);
  const buttonElement = screen.getByText("+");
  fireEvent.click(buttonElement);
  const linkElement = screen.getByText(/Suurendasid kogust!/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders "Vähendasid kogust" tekst if button is clicked', () => {
  render(<Kinkekaart />);
  const buttonIncreaseElement = screen.getByText("+");
  fireEvent.click(buttonIncreaseElement);
  const buttonDecreaseElement = screen.getByText("-");
  fireEvent.click(buttonDecreaseElement);
  const linkElement = screen.getByText("Vähendasid kogust!");
  expect(linkElement).toBeInTheDocument();
});
