class Expense { // Creates a blueprint for Expense objects

    constructor(
        id,
        description,
        amount,
        category
    ){
// Assign 
        this.id = id;
        this.description = description;
        this.amount = amount;
        this.category = category;
    }
}

class ExpenseTracker { // Class responsible for managing expenses

    constructor(){

        this.expenses = [];// Creates an empty array to store expenses
    }

    addExpense(expense){

        this.expenses = [
            ...this.expenses, expense
        ];
    }

    removeExpense(id){

        this.expenses =
        this.expenses.filter(
            expense =>
            expense.id !== id
        );
    }

    getTotalExpenses(){

        return this.expenses.reduce((total, expense) => total + expense.amount,
            0
        );
    }

    filterExpenses(category){

        return this.expenses.filter(
            expense => expense.category === category
        );
    }
}

module.exports = {Expense,ExpenseTracker
};