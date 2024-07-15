document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("expense-form");
    const expenseIdInput = document.getElementById("expense-id");
    const expenseNameInput = document.getElementById("expense-name");
    const expenseAmountInput = document.getElementById("expense-amount");
    const expenseList = document.getElementById("expense-list");

    // Load expenses from local storage
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    function saveExpenses() {
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }

    function renderExpenses() {
        expenseList.innerHTML = "";
        expenses.forEach((expense, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${expense.name} - Rs ${expense.amount}
                <div>
                    <button class="edit-btn" data-index="${index}">Edit</button>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                </div>
            `;
            expenseList.appendChild(li);
        });
    }

    function addExpense(name, amount) {
        expenses.push({ name, amount });
        saveExpenses();
        renderExpenses();
    }

    function updateExpense(id, name, amount) {
        expenses[id] = { name, amount };
        saveExpenses();
        renderExpenses();
    }

    function deleteExpense(index) {
        expenses.splice(index, 1);
        saveExpenses();
        renderExpenses();
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const id = expenseIdInput.value.trim();
        const name = expenseNameInput.value.trim();
        const amount = parseFloat(expenseAmountInput.value.trim());

        if (name !== "" && !isNaN(amount) && amount > 0) {
            if (id) {
                updateExpense(id, name, amount);
            } else {
                addExpense(name, amount);
            }
            expenseIdInput.value = "";
            expenseNameInput.value = "";
            expenseAmountInput.value = "";
            form.querySelector("button").textContent = "Add Expense";
        }
    });

    expenseList.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-btn")) {
            const index = event.target.getAttribute("data-index");
            deleteExpense(index);
        } else if (event.target.classList.contains("edit-btn")) {
            const index = event.target.getAttribute("data-index");
            const expense = expenses[index];
            expenseIdInput.value = index;
            expenseNameInput.value = expense.name;
            expenseAmountInput.value = expense.amount;
            form.querySelector("button").textContent = "Update Expense";
        }
    });

    renderExpenses();
});
