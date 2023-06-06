import { useState } from "react";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { EXPENSE_CATEGORIES } from "../constants";

function NewExpenseForm(props) {

    const { users, expenses, setExpenses, setShowNewExpenseForm } = props;
    const [user, setUser] = useState(users[0].id.toString());
    const [category, setCategory] = useState(EXPENSE_CATEGORIES[0]);
    const [description, setDescription] = useState('');
    const [cost, setCost] = useState(0);

    // O(1) time | O(m) space - m number of expenses
    function handleCreate(e) {
        e.preventDefault();
        if (description.length && cost > 0){
            const newData = [...expenses];
            const newExpenseId = generateNewExpenseId();
            const newExpense = {
                id: parseInt(user),
                expense_id: newExpenseId,
                category: category,
                description: description,
                cost: parseFloat(cost)
            }
            newData.unshift(newExpense);
            setExpenses(newData);
            setShowNewExpenseForm(false);
        } else {
            console.log('invalid input');
        }
    }

    // O(m) time | O(1) space -  n is the number of expenses
    function generateNewExpenseId() {
        let expense_ids = expenses.map(expense => expense.expense_id);
        return Math.max(...expense_ids) + 1;
    }

    return <form className="new-data-form">

        <FormControl>
            <InputLabel id="users-dropdown">User</InputLabel>
            <Select 
                labelId="users-dropdown"
                onChange={e => setUser(e.target.value)}
                value={user}
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

        <FormControl>
            <InputLabel id="categories-dropdown">Category</InputLabel>
            <Select 
                labelId="categories-dropdown"
                value={category} 
                onChange={e => setCategory(e.target.value)}
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

        <TextField 
            label="Description"
            onChange={e => setDescription(e.target.value)}
            required
            variant="outlined" 
            size="small"
        />

        <TextField 
            label="Cost"
            onChange={e => setCost(e.target.value)}
            required
            variant="outlined" 
            size="small"
        />

        <Button 
            variant="contained"
            onClick={e => handleCreate(e)}
        >
            Create
        </Button>
    </form>
}

export default NewExpenseForm;