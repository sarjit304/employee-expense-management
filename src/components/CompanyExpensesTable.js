import { useEffect, useState } from "react";

function CompanyExpensesTable(props) {

    const { expenses } = props;
    const [expenseByCategory, setExpenseByCategory] = useState({});

    useEffect(() => {

        // O(n) time | O(c) space - n is length of the expenses array, c is number of categories (by default 3).
        function calculateExpenseByCategory() {
            let data = {}
            expenses.forEach(expense => {
                if (expense.category in data) {
                    data[expense.category] += expense.cost;
                } else {
                    data[expense.category]  = expense.cost;
                }
            });
            return data; 
        }
        setExpenseByCategory(calculateExpenseByCategory());
    }, [expenses]);

    return <table>
        <thead>
            <tr>
                <th>Category</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            {Object.keys(expenseByCategory).map((category, idx) => {
                return <tr key={idx}>
                    <td>{category}</td>
                    <td>{"$" + expenseByCategory[category]}</td>
                </tr>
            })}
        </tbody>
    </table>
}

export default CompanyExpensesTable;