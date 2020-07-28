/**********************************************************
 * BUDGET CONTROLLER
 * ********************************************************
 */
let budgetController = (function () {
  //calculate the sum by type income or expenses
  let calculateTotal = function (type) {
    let sum = 0;
    data.allItems[type].forEach(function (cur) {
      sum += cur.value;
    });

    data.totals[type] = sum;
  };

  //data object varible
  let data = {
    allItems: {
      exp: [],
      inc: [],
    },
    totals: {
      exp: 0,
      inc: 0,
    },
    budget: 0,
    percentage: -1,
  };

  //create a methode percentage with prototype
  Expense.prototype.calcPercentage = function (totalIncome) {
    if (totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100);
    } else {
      this.percentage = -1;
    }
  };

  //get percentage
  Expense.prototype.getPercentage = function () {
    return this.percentage;
  };

  //public functions
  return {
    addItem: function (type, desc, val) {
      let newItem, ID;

      //create new id in the array based on inc or exp
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      //create a new item 'inc' or 'exp' based on the type
      if (type === 'exp') {
        newItem = new Expense(ID, desc, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, desc, val);
      }

      //push it on our data structure
      data.allItems[type].push(newItem);

      //return new item element
      return newItem;
    },

    //function delete item
    deleteItem: function (type, id) {
      //id = 6
      //data.allItems[type][id]
      //ids = [1,2,3,5]
      //index=3

      // get an array of the ids
      const ids = data.allItems[type].map(function (current) {
        return current.id;
      });

      //retrieve the index we want to remove
      const index = ids.indexOf(id);

      if (index !== -1) {
        //delete index from the array
        data.allItems[type].splice(index, 1);
      }
    },

    //calcul budget
    calculateBudget: function () {
      //1. calculate total income and expenses
      calculateTotal('inc');
      calculateTotal('exp');

      //2. calculate the budget : income - expense
      data.budget = data.totals.inc - data.totals.exp;

      //3. calculate the percentage of income that we spent
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
        //Expense = inc 100 and exp 300 perc = 100/300 = 0.3333 *100
      } else {
        data.percentage = -1;
      }
    },

    //calcul percentage
    calculatePercentage: function () {
      /**
       * a = 10
       * b = 20
       * c = 40
       * income = 100
       * a = 10/100 = 10%
       * b = 20/100 = 20%
       * c = 40/100 = 40%
       */
      data.allItems.exp.forEach(function (current) {
        current.calcPercentage(data.totals.inc);
      });
    },

    //get percentage
    getPercentage: function () {
      let allPercentage = data.allItems.exp.map(function (current) {
        return current.getPercentage();
      });

      return allPercentage;
    },

    //get Budget
    getBudget: function () {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage,
      };
    },

    testing: function () {
      console.log(data);
    },
  };
})();
