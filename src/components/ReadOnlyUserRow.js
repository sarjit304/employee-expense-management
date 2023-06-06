import { Button } from "@mui/material";

function ReadOnlyUserRow(props) {

    const { user, expenseById, setUserToEdit, deleteUser } = props;

    return <>
        <td>{user.fname}</td>
        <td>{user.lname}</td> 
        <td>{expenseById[user.id]? "$" + expenseById[user.id]: 0}</td>  
        <td className="action-buttons">
            <Button 
                variant="contained"
                onClick={() => setUserToEdit(user.id)}
            >
                Edit
            </Button>
            <Button 
                variant="contained"
                onClick={() => deleteUser(user.id)}
            >
                Delete
            </Button>
        </td> 
    </>
}

export default ReadOnlyUserRow;