import { useEffect, useState } from "react";
import NewExpenseForm from "./NewExpenseForm";
import ReadOnlyExpenseRow from "./ReadOnlyExpenseRow";
import EditableExpensesRow from "./EditableExpensesRow";
import { Button } from "@mui/material";

function ExpenseTable(props) {

    const { users, expenses, setExpenses } = props;
    const [nameById, setNameById] = useState({});
    const [showNewExpenseForm, setShowNewExpenseForm] = useState(false);
    const [expenseToEdit, setExpenseToEdit] = useState(null);

    useEffect(() => {
        // O(n) time | O(n) space - n is number of users
        function getNamesById() {
            let data = {};
            users.forEach(user => {
                if (!(user.id in data)) {
                    data[user.id] = user.fname + " " + user.lname;
                }
            })
            return data;
        };
        setNameById(getNamesById());
    }, [users]);

    // O(m) time | O(m) space - m is number of expenses
    function deleteExpense(id) {
        let newExpenses = expenses.filter(expense => expense.expense_id !== id);
        setExpenses(newExpenses);
    }

    return <>
        <Button 
            variant="contained"
            onClick={() => setShowNewExpenseForm(!showNewExpenseForm)}
            style={{margin: 10}}
        >
            Add Expense
        </Button>
        {showNewExpenseForm ? 
            <NewExpenseForm
                users={users} 
                expenses={expenses} 
                setExpenses={setExpenses} 
                setShowNewExpenseForm={setShowNewExpenseForm}
            /> : 
            null
        }
        <table>
            <thead>
                <tr>
                    <th>Full Name</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Cost</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {expenses.map(expense => {
                    return <tr key={expense.expense_id}>
                        {expenseToEdit === expense.expense_id? 
                            <EditableExpensesRow 
                                users={users}
                                expenses={expenses}
                                setExpenses={setExpenses}
                                expense={expense}
                                setExpenseToEdit={setExpenseToEdit}
                            />:
                            <ReadOnlyExpenseRow 
                                expense={expense}
                                nameById={nameById}
                                deleteExpense={deleteExpense}
                                setExpenseToEdit={setExpenseToEdit}
                            />
                        }
                    </tr>
                })}
            </tbody>
        </table>
    </>
}

export default ExpenseTable;