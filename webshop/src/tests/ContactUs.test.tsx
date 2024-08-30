// import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ContactUs } from '../pages/global/ContactUs';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
 
// Mocking dependencies
jest.mock('@emailjs/browser');
jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
}));
 
describe('ContactUs', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
 
  test('renders contact us component', () => {
    render(<ContactUs />);
 
    expect(screen.getByText(/Contact us/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
  });
 
  test('submits the form successfully', async () => {
    (emailjs.sendForm as jest.Mock).mockResolvedValue({});
 
    render(<ContactUs />);
 
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Hello there!' } });
 
    fireEvent.submit(screen.getByRole('button', { name: /Send/i }));
 
    await waitFor(() => {
      // expect(emailjs.sendForm).toHaveBeenCalledWith(
      //   'service_4kqtz04',
      //   'template_blapspn',
      //   expect.anything(),
      //   { publicKey: '92wTREyCsK8B3_N8K' }
      // );
      expect(toast.success).toHaveBeenCalledWith('Thank you, your message has been sent!');
    });
  });
 
  test('handles form submission failure', async () => {
    (emailjs.sendForm as jest.Mock).mockRejectedValue({ text: 'Email sending failed' });
 
    render(<ContactUs />);
 
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Hello there!' } });
 
    fireEvent.submit(screen.getByRole('button', { name: /Send/i }));
 
    await waitFor(() => {
      // expect(emailjs.sendForm).toHaveBeenCalledWith(
      //   'service_4kqtz04',
      //   'template_blapspn',
      //   expect.anything(),
      //   { publicKey: '92wTREyCsK8B3_N8K' }
      // );
      expect(toast.success).not.toHaveBeenCalled();
    });
  });
});