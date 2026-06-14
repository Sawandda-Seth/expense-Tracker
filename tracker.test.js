const { Expense, ExpenseTracker } = require("./tracker");
 describe( "Expense Tracker", () => { 
    let tracker; beforeEach(() => { 
        tracker = new ExpenseTracker(); 
    });
     test( "should add expense", () => { 
        tracker.addExpense( new Expense( 1, "Lunch", 500, "Food" ) );
         expect( tracker.expenses.length ).toBe(1); 
        }); 
     test( "should remove expense", () => { 
        tracker.addExpense( new Expense( 1, "Lunch", 500, "Food" ) ); 
        tracker.removeExpense(1);
         expect( tracker.expenses.length ).toBe(0); 
        }); 
     test( "should calculate total", () => { 
         tracker.addExpense( new Expense( 1, "Lunch", 500, "Food" ) ); 
          tracker.addExpense( new Expense( 2, "Taxi", 300, "Transport" ) ); 
            expect( tracker.getTotalExpenses() ).toBe(800); });
             test( "should filter category", () => { 
                tracker.addExpense( new Expense( 1, "Lunch", 500, "Food" ) ); 
                tracker.addExpense( new Expense( 2, "Taxi", 300, "Transport" ) ); 
                expect( tracker.filterExpenses( "Food" ).length ).toBe(1);
             }); 
            });


