class Expense {

    constructor(
        id,
        description,
        amount,
        category
    ){

        this.id = id;
        this.description = description;
        this.amount = amount;
        this.category = category;
    }
}

class ExpenseTracker {

    constructor(){

        this.expenses = [];
    }

    addExpense(expense){

        this.expenses = [
            ...this.expenses,
            expense
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

        return this.expenses.reduce(
            (total, expense) =>
            total + expense.amount,
            0
        );
    }

    filterExpenses(category){

        return this.expenses.filter(
            expense =>
            expense.category === category
        );
    }
}

module.exports = {
    Expense,
    ExpenseTracker
};