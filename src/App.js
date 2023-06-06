import { useState } from 'react';
import './App.css';
import { USERS, EXPENSES } from './data';
import UserTable from './components/UserTable';
import ExpenseTable from './components/ExpenseTable';
import CompanyExpensesTable from './components/CompanyExpensesTable';
import Header from './components/Header';
import { Button } from '@mui/material';

function App() {

	const [users, setUsers] = useState(USERS);
	const [expenses, setExpenses] = useState(EXPENSES);
	const [table, setTable] = useState('UserTable');

	return (
	<div className='app'>
		<Header />
		<hr />

		<div className='action-buttons nav'>
			<Button 
				variant="outlined"
				onClick={() => setTable('UserTable')}
			>
				Users Table
			</Button>
			<Button 
				variant="outlined"
				onClick={() => setTable('ExpensesTable')}
			>
				Expenses Table
			</Button>
			<Button 
				variant="outlined"
				onClick={() => setTable('CompanyExpensesTable')}
			>
				Company Expenses Table
			</Button>
		</div>
		<hr />

		{table === 'UserTable'? 
		<UserTable 
			users={users} 
			expenses={expenses} 
			setUsers={setUsers} 
			setExpenses={setExpenses}
		/>: null}
		{table === 'ExpensesTable'? 
		<ExpenseTable 
			users={users} 
			expenses={expenses} 
			setExpenses={setExpenses}
		/>: null}
		{table === 'CompanyExpensesTable'? 
		<CompanyExpensesTable 
			expenses={expenses}
		/>: null}
	</div>
	);
}

export default App;
