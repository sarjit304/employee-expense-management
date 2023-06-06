import { useEffect, useState } from "react";
import NewUserForm from "./NewUserForm";
import ReadOnlyUserRow from "./ReadOnlyUserRow";
import EditableUserRow from "./EditableUserRow";
import { Button } from "@mui/material";

function UserTable(props) {

    let { users, expenses, setUsers, setExpenses } = props;
    const [userToEdit, setUserToEdit] = useState(null);
    const [expenseById, setExpenseById] = useState({});
    const [showNewUserForm, setShowNewUserForm] = useState(false);

    useEffect(() => {

        // O(n) time | O(m) space - n is length of the expenses array, m is number of users.
        function calculateTotalExpenseOfEachUser() {
            let data = {}
            expenses.forEach(expense => {
                if (expense.id in data) {
                    data[expense.id] += expense.cost;
                } else {
                    data[expense.id] = expense.cost;
                }
            })
            return data;
        }
        setExpenseById(calculateTotalExpenseOfEachUser());
    }, [expenses])

    // O(max(n, m)) time | O(max(n, m)) space - n is number of users, m is number of expenses.
    function deleteUser(id) {
        let newUsers = users.filter(user => user.id !== id);
        setUsers(newUsers);
        let newExpenses = expenses.filter(expense => expense.id !== id);
        setExpenses(newExpenses);
    }

    return <>
        <Button 
            variant="contained"
            onClick={() => setShowNewUserForm(!showNewUserForm)}
            style={{margin: 10}}
        >
            Add User
        </Button>
        {showNewUserForm ? 
            <NewUserForm 
                users={users} 
                setUsers={setUsers} 
                setShowNewUserForm={setShowNewUserForm}/> 
            : null
        }
        <table>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Total Expenses</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => {
                    return <tr key={user.id}>
                        {userToEdit === user.id?
                            <EditableUserRow 
                                users={users} 
                                setUsers={setUsers} 
                                user={user}
                                expenseById={expenseById}
                                setUserToEdit={setUserToEdit}
                            />: 
                            <ReadOnlyUserRow 
                                user={user}
                                expenseById={expenseById}
                                setUserToEdit={setUserToEdit}
                                deleteUser={deleteUser}
                            />
                        }
                    </tr>
                })}
            </tbody>
        </table>
    </>
}

export default UserTable;