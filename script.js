// Expense Class
class Expense { // Creates a blueprint for an Expense object
    constructor(id, description, amount, category) {
        // Stores the data
        this.id = id;
        this.description = description;
        this.amount = amount;
        this.category = category;
    }
}

// Expense Tracker Class

class ExpenseTracker {// Manages all expense operations
    constructor() {
        //Runs if JSON parsing fails.
          // Try to load saved expenses from Local Storage
    try {
        this.expenses =
          // Convert JSON data back into a JavaScript array
            JSON.parse(localStorage.getItem("expenses")) || []; //Creates a fresh empty array.
    } catch (error) {   // If Local Storage data is corrupted,
        this.expenses = []; //Creates a fresh empty array.
    }
}

    saveExpenses() {   // Convert the expenses array into JSON
        localStorage.setItem("expenses", JSON.stringify(this.expenses)); //Reads saved expenses from localStorage.
    }
 // Adds a new expense into the array
    addExpense(expense) {
        this.expenses = [...this.expenses, expense]; //spread operator
        // Save updated expenses
        this.saveExpenses();
    }
// Removes an expense using its ID
    removeExpense(id) {
        // Filter returns all expenses
        // except the one matching the ID
        this.expenses = this.expenses.filter(
            expense => expense.id !== id
        );
 // Save updated expenses
        this.saveExpenses();
    }
  // Returns the total amount spent
    getTotalExpenses() {
        return this.expenses.reduce(
             // total = running total
            // expense = current expense
            (total, expense) => total + expense.amount,
            0  // Start counting from 0
        );
    }
 // Returns expenses matching a category
    filterExpenses(category) {
        //Uses the filter method
        return this.expenses.filter(
            expense => expense.category === category
        );
    }

    // Rest Operator

    addManyExpenses(...expenses) {
         // Spread operator inserts all expenses into the exsiting array
        this.expenses.push(...expenses);
        this.saveExpenses();
        // Save updated data
    }
}

// Create Tracker Object
const tracker = new ExpenseTracker();

// DOM Elements
const expenseList = document.getElementById("expenseList");// Gets the HTML element where expenses will be displayed
const totalExpenses = document.getElementById("totalExpenses");// Gets the element showing total expenses
const expenseCount = document.getElementById("expenseCount");// Gets the element showing number of expenses

// Render Expenses
//Displays expenses on the page.
function renderExpenses(expenses = tracker.expenses) {
  // Clear previously displayed expenses
    expenseList.innerHTML = "";
 // Loop through each expense
    expenses.forEach(({ id, description, amount, category }) => {
 // Add expense card to the page
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
 // Update statistics after rendering
    updateStatistics();
}

// Update Statistics
function updateStatistics() {
    totalExpenses.textContent = `KES ${tracker.getTotalExpenses()}`;// Display total amount spent
    expenseCount.textContent = tracker.expenses.length;// Display total number of expenses
}

// Add Expense
function addExpense() {

    const description = document.getElementById("description").value.trim();// Get description input value
    const amount = Number(document.getElementById("amount").value);  // Get amount and convert to number
    const category = document.getElementById("category").value; // Get selected category

    // Validation
    // Ensure description exists
    if (!description || amount <= 0) {
        alert("Please enter a valid description and amount.");
        return;
    }

    const expense = new Expense(
         // Generates a unique ID using timestamp
        Date.now(),
        description, // User entered 
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
    renderExpenses();// Refresh display
}

// Add Expense Button
document
    .getElementById("addBtn")
    .addEventListener("click", addExpense);

// Filter Expenses
document
    .getElementById("filterCategory")
    .addEventListener("change", (e) => {// Runs whenever dropdown value changes

        const category = e.target.value; // Get selected category

        if (category === "All") {
            renderExpenses();// Show all expenses
            return;
        }
   //Displays all expenses
        renderExpenses(
            tracker.filterExpenses(category)
        );
    });

// Load Expenses on Page Load
// Automatically displays saved expenses
// from localStorage when the page opens
renderExpenses();

