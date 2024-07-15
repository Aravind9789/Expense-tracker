document.addEventListener('DOMContentLoaded', function() {
    loadExpenses();

    document.getElementById('expense-form').addEventListener('submit', function(e) {
        e.preventDefault();
        addExpense();
    });

    document.getElementById('expense-list').addEventListener('click', function(e) {
        if (e.target.tagName === 'BUTTON') {
            const id = e.target.parentElement.dataset.id;
            deleteExpense(id);
        }
    });
});

function loadExpenses() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.forEach(expense => {
        displayExpense(expense);
    });
    updateTotal();
}

function addExpense() {
    const name = document.getElementById('expense-name').value;
    const amount = document.getElementById('expense-amount').value;
    const category = document.getElementById('expense-category').value;
    const newExpense = { id: Date.now().toString(), name, amount: parseFloat(amount), category };

    document.getElementById('expense-name').value = '';
    document.getElementById('expense-amount').value = '';
    document.getElementById('expense-category').value = '';

    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push(newExpense);
    localStorage.setItem('expenses', JSON.stringify(expenses));

    displayExpense(newExpense);
    updateTotal();
}

function displayExpense(expense) {
    const expenseList = document.getElementById('expense-list');
    const li = document.createElement('li');
    li.dataset.id = expense.id;
    li.innerHTML = `
        ${expense.name} - rupees ${expense.amount.toFixed(2)} (${expense.category})
        <button>Delete</button>
    `;
    expenseList.appendChild(li);
}

function deleteExpense(id) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses = expenses.filter(expense => expense.id !== id);
    localStorage.setItem('expenses', JSON.stringify(expenses));

    document.querySelector(`li[data-id="${id}"]`).remove();
    updateTotal();
}

function updateTotal() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    document.getElementById('total-amount').textContent = `Total: rupees ${total.toFixed(2)}`;
}