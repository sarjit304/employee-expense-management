import { useState } from "react";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { EXPENSE_CATEGORIES } from "../constants";

function EditableExpensesRow(props) {

    const { users, expense, setExpenseToEdit, expenses, setExpenses } = props;
    const [userId, setUserId] = useState(expense.id.toString());
    const [newCategory, setNewCategory] = useState(expense.category)
    const [newDescription, setNewDescription] = useState(expense.description);
    const [newCost, setNewCost] = useState(expense.cost);

    // O(m) time | O(m) space - m is the number of expenses.
    function updateExpense(id) {
        if (newDescription.length > 1 && parseFloat(newCost) > 0) {
            let newData = [...expenses];
            newData.forEach(expense => {
                if (expense.expense_id === id) {
                    expense.id = userId;
                    expense.category = newCategory;
                    expense.description = newDescription;
                    expense.cost = parseFloat(newCost);
                }
            });
            setExpenses(newData);
            setExpenseToEdit(null);
        } else {
            console.log("invalid input")
        }

    }

    return <>
        <td>
            <FormControl>
                <InputLabel id="users-dropdown">User</InputLabel>
                <Select 
                    labelId="users-dropdown"
                    onChange={e => setUserId(e.target.value)}
                    value={userId}
                    size="small"
                >
                    {users.map(user => {
                        return <MenuItem
                            value={user.id} 
                            key={user.id}
                        >
                            {user.fname + " " + user.lname}
                        </MenuItem>
                    })}
                </Select>
            </FormControl>
        </td>
        <td>

        <FormControl>
            <InputLabel id="categories-dropdown">Category</InputLabel>
            <Select 
                labelId="categories-dropdown"
                value={newCategory} 
                onChange={e => setNewCategory(e.target.value)}
                size="small"
            >
                {EXPENSE_CATEGORIES.map(category => {
                    return <MenuItem
                        value={category} 
                        key={category}
                    >
                        {category}
                    </MenuItem>
                })}
            </Select>
        </FormControl>
        </td>
        <td>
            <TextField 
                label="Description"
                value={newDescription} 
                onChange={e => setNewDescription(e.target.value)}
                required
                variant="outlined" 
                size="small"
            />
        </td>
        <td>
            <TextField 
                label="Cost"
                value={newCost}
                onChange={e => setNewCost(e.target.value)}
                required
                variant="outlined" 
                size="small"
            />
        </td>
        <td className="action-buttons">
            <Button 
                variant="contained"
                onClick={() => setExpenseToEdit(null)}
            >
                Cancel
            </Button>
            <Button 
                variant="contained"
                onClick={() => updateExpense(expense.expense_id)}
            >
                Update
            </Button>
        </td>
    </>
}

export default EditableExpensesRow;