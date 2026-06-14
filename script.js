// Expense Class
class Expense {
    constructor(id, description, amount, category) {
        this.id = id;
        this.description = description;
        this.amount = amount;
        this.category = category;
    }
}

// Expense Tracker Class
class ExpenseTracker {
    constructor() {
        this.expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    }

    saveExpenses() {
        localStorage.setItem("expenses", JSON.stringify(this.expenses));
    }

    addExpense(expense) {
        this.expenses = [...this.expenses, expense];
        this.saveExpenses();
    }

    removeExpense(id) {
        this.expenses = this.expenses.filter(
            expense => expense.id !== id
        );

        this.saveExpenses();
    }

    getTotalExpenses() {
        return this.expenses.reduce(
            (total, expense) => total + expense.amount,
            0
        );
    }

    filterExpenses(category) {
        return this.expenses.filter(
            expense => expense.category === category
        );
    }

    // Rest Operator
    addManyExpenses(...expenses) {
        this.expenses.push(...expenses);
        this.saveExpenses();
    }
}

// Create Tracker Object
const tracker = new ExpenseTracker();

// DOM Elements
const expenseList = document.getElementById("expenseList");
const totalExpenses = document.getElementById("totalExpenses");
const expenseCount = document.getElementById("expenseCount");

// Render Expenses
function renderExpenses(expenses = tracker.expenses) {

    expenseList.innerHTML = "";

    expenses.forEach(({ id, description, amount, category }) => {

        expenseList.innerHTML += `
            <div class="glass rounded-xl p-4 flex justify-between items-center">

                <div>
                    <h3 class="font-bold">${description}</h3>
                    <p>KES ${amount}</p>
                    <span class="text-purple-300">${category}</span>
                </div>

                <button
                    onclick="deleteExpense(${id})"
                    class="bg-red-600 px-4 py-2 rounded"
                >
                    Delete
                </button>

            </div>
        `;
    });

    updateStatistics();
}

// Update Statistics
function updateStatistics() {
    totalExpenses.textContent = `KES ${tracker.getTotalExpenses()}`;
    expenseCount.textContent = tracker.expenses.length;
}

// Add Expense
function addExpense() {

    const description = document.getElementById("description").value.trim();
    const amount = Number(document.getElementById("amount").value);
    const category = document.getElementById("category").value;

    // Validation
    if (!description || amount <= 0) {
        alert("Please enter a valid description and amount.");
        return;
    }

    const expense = new Expense(
        Date.now(),
        description,
        amount,
        category
    );

    tracker.addExpense(expense);

    // Clear Inputs
    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";

    renderExpenses();
}

// Delete Expense
function deleteExpense(id) {
    tracker.removeExpense(id);
    renderExpenses();
}

// Add Expense Button
document
    .getElementById("addBtn")
    .addEventListener("click", addExpense);

// Filter Expenses
document
    .getElementById("filterCategory")
    .addEventListener("change", (e) => {

        const category = e.target.value;

        if (category === "All") {
            renderExpenses();
            return;
        }

        renderExpenses(
            tracker.filterExpenses(category)
        );
    });

// Load Expenses on Page Load
renderExpenses();

