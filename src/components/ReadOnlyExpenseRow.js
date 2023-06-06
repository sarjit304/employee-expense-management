import { Button } from "@mui/material";

function ReadOnlyExpenseRow(props) {

    const { expense, nameById, deleteExpense, setExpenseToEdit } = props;

    return <>
        <td>{nameById[expense.id]}</td>
        <td>{expense.category}</td>
        <td>{expense.description}</td>
        <td>{"$" + expense.cost}</td>
        <td className="action-buttons">
            <Button 
                variant="contained"
                onClick={() => setExpenseToEdit(expense.expense_id)}
            >
                Edit
            </Button>
            <Button 
                variant="contained"
                onClick={() => deleteExpense(expense.expense_id)}
            >
                Delete
            </Button>
        </td>
    </>
}

export default ReadOnlyExpenseRow;