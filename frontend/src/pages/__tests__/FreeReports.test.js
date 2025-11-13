import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FreeReports from '../FreeReports';

// Mock fetch
global.fetch = jest.fn();

// Wrapper component with Router
const FreeReportsWithRouter = () => (
  <BrowserRouter>
    <FreeReports />
  </BrowserRouter>
);

describe('FreeReports', () => {
  beforeEach(() => {
    fetch.mockClear();
    localStorage.clear();
  });

  test('renders sign up form when user has no access', () => {
    render(<FreeReportsWithRouter />);
    
    expect(screen.getByPlaceholderText(/your name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/your occupation/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /get free access/i })).toBeInTheDocument();
  });

  test('shows reports when user has access', () => {
    localStorage.setItem('freeReportsAccess', 'true');
    
    render(<FreeReportsWithRouter />);
    
    expect(screen.getByText(/free learning resources/i)).toBeInTheDocument();
    expect(screen.queryByPlaceholderText(/your email/i)).not.toBeInTheDocument();
  });

  test('validates email format', async () => {
    render(<FreeReportsWithRouter />);
    
    const nameInput = screen.getByPlaceholderText(/your name/i);
    const emailInput = screen.getByPlaceholderText(/your email/i);
    const occupationInput = screen.getByPlaceholderText(/your occupation/i);
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(occupationInput, { target: { value: 'Developer' } });
    
    const submitButton = screen.getByRole('button', { name: /get free access/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument();
    });
  });

  test('requires occupation field', async () => {
    render(<FreeReportsWithRouter />);
    
    const nameInput = screen.getByPlaceholderText(/your name/i);
    const emailInput = screen.getByPlaceholderText(/your email/i);
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    
    const submitButton = screen.getByRole('button', { name: /get free access/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/please select your occupation/i)).toBeInTheDocument();
    });
  });

  test('successfully registers user', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true })
    });
    
    render(<FreeReportsWithRouter />);
    
    const nameInput = screen.getByPlaceholderText(/your name/i);
    const emailInput = screen.getByPlaceholderText(/your email/i);
    const occupationInput = screen.getByPlaceholderText(/your occupation/i);
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(occupationInput, { target: { value: 'Developer' } });
    
    const submitButton = screen.getByRole('button', { name: /get free access/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        '/api/free-reports/register',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'John Doe',
            email: 'john@example.com',
            occupation: 'Developer'
          })
        })
      );
    });
    
    await waitFor(() => {
      expect(localStorage.getItem('freeReportsAccess')).toBe('true');
      expect(screen.getByText(/free learning resources/i)).toBeInTheDocument();
    });
  });

  test('handles registration error', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));
    
    render(<FreeReportsWithRouter />);
    
    const nameInput = screen.getByPlaceholderText(/your name/i);
    const emailInput = screen.getByPlaceholderText(/your email/i);
    const occupationInput = screen.getByPlaceholderText(/your occupation/i);
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(occupationInput, { target: { value: 'Developer' } });
    
    const submitButton = screen.getByRole('button', { name: /get free access/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });
});