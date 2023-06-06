import { Button, TextField } from "@mui/material";
import { useState } from "react";

function NewUserForm(props) {

    const { users, setUsers, setShowNewUserForm } = props;
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');

    // O(1) time | O(n) space - n number of users
    function createNewUser(e) {
        if (fname.length && lname.length) {
            e.preventDefault()
            const data = [...users];
            const id = generateNewId();
            const newUser = {
                id: id,
                fname: fname,
                lname: lname,
            }
            data.unshift(newUser);
            setUsers(data);
            setShowNewUserForm(false)
        } else {
            console.log('invalid input')
        }
    }

    // O(n) time | O(1) space -  n is the number of users
    function generateNewId() {
        let ids = users.map(user => user.id);
        return Math.max(...ids) + 1;
    }

    return <form className="new-data-form">
        <TextField 
            label="First Name"
            onChange={e => setFname(e.target.value)}
            required
            variant="outlined" 
            size="small"
        />
        <TextField 
            label="Last Name"
            onChange={e => setLname(e.target.value)}
            required
            variant="outlined" 
            size="small"
        />
        <Button 
            variant="contained"
            onClick={e => createNewUser(e)}
        >
            Create User
        </Button>
    </form>

} 

export default NewUserForm;