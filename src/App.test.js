import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header', () => {
  render(<App />);
  const header = screen.getByText(/dashboard/i);
  expect(header).toBeInTheDocument();
});

test('renders users table buttons', () => {
  render(<App />);
  const usersTable = screen.getByText(/USERS TABLE/i);
  expect(usersTable).toBeInTheDocument();
})

test('renders expenses table buttons', () => {
  render(<App />);
  const expensesTable = screen.getAllByText(/EXPENSES TABLE/i);
  expect(expensesTable[0]).toBeInTheDocument();
})

test('renders company expenses table buttons', () => {
  render(<App />);
  const companyExpensesTable = screen.getByText(/COMPANY EXPENSES TABLE/i);
  expect(companyExpensesTable).toBeInTheDocument();
})
