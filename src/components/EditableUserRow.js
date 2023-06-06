import { Button, TextField } from "@mui/material";
import { useState } from "react";

function EditableUserRow(props) {

    const { users, setUsers, user, expenseById, setUserToEdit } = props;
    const [newFname, setNewFname] = useState(user.fname);
    const [newLname, setNewLname] = useState(user.lname);

    // O(n) time | O(n) space - n is the number of users.
    function updateUser(id) {
        if (newFname.length && newLname.length) {
            let newData = [...users];
            newData.forEach(user => {
                if (user.id === id) {
                    user.fname = newFname;
                    user.lname = newLname;
                }
            });
            setUsers(newData);
            setUserToEdit(null);
        } else {
            console.log('invalid input')
        }
    }

    return <>
        <td>
            <TextField 
                value={newFname} 
                onChange={e => setNewFname(e.target.value)}
                variant="outlined" 
                size="small"
            />
        </td>
        <td>
            <TextField 
                value={newLname} 
                onChange={e => setNewLname(e.target.value)}
                variant="outlined" 
                size="small"
            />
        </td>
        <td>{expenseById[user.id]? "$" + expenseById[user.id]: 0}</td>  
        <td className="action-buttons">
            <Button 
                variant="contained"
                onClick={() => setUserToEdit(null)}
            >
                Cancel
            </Button>
            <Button 
                variant="contained"
                onClick={() => updateUser(user.id)}
            >
                Update
            </Button>
        </td> 
    </>
}

export default EditableUserRow;