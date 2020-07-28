/**********************************************************
 * BUDGET UI CONTROLLER
 * UI interface controller
 * ********************************************************
 */
let uiController = (function () {
  //Get DOM input elements
  const DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expensesLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage',
    container: '.container',
    expensePercentageLabel: '.item__percentage',
    dateLabel: '.budget__title--month',
  };

  //formating number
  const formatNumber = function (num, type) {
    let numSplit, int, dec, sign;
    /*************
     * + or - before number
     * exactly 2 decimals points
     * comma separating the thousands
     * ex 2373.5674 = + 2,373.57
     * ex2 2000 = +2,000.00
     */
    //1. calculate the absolute path of the number
    //Math.abs//remove the sign before the number
    num = Math.abs(num);
    num = num.toFixed(2); // 2373.5674 = + 2,373.57

    //split the number, comma separating the thousands
    numSplit = num.split('.');
    int = numSplit[0];
    if (int.length > 3) {
      int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3); // if input is 2310 out 2,310
    }

    dec = numSplit[1];

    return (type === 'exp' ? '-' : '+') + '' + int + '.' + dec;
  };

  //loop node list helper function
  let nodeListForEach = function (list, callback) {
    for (let i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  };

  return {
    //define public method will accessible outside of this function
    getInput: function () {
      const type = document.querySelector(DOMstrings.inputType).value;
      const description = document.querySelector(DOMstrings.inputDescription).value;
      const value = parseFloat(document.querySelector(DOMstrings.inputValue).value);

      return {
        type,
        description,
        value,
      };
    },

    addListItem: function (obj, type) {
      let html, newHtml, element;

      // create html string with placeholder text
      if (type === 'inc') {
        element = DOMstrings.incomeContainer;
        html =
          '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === 'exp') {
        element = DOMstrings.expensesContainer;
        html =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      //replace the placeholder text with the some actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

      //Insert the HTML to the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },

    deleteListItem: function (selectID) {
      let el = document.getElementById(selectID);
      el.parentNode.removeChild(el);
    },

    clearFields: function () {
      let fields, fielsArr;
      fields = document.querySelectorAll(
        DOMstrings.inputDescription + ', ' + DOMstrings.inputValue
      );
      fielsArr = Array.prototype.slice.call(fields);
      fielsArr.forEach(function (current, index, array) {
        current.value = '';
      });
      fielsArr[0].focus();
    },

    displayBudget: function (obj) {
      let type;
      obj.budget > 0 ? (type = 'inc') : (type = 'exp');
      document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(
        obj.budget,
        type
      );
      document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(
        obj.totalInc,
        'inc'
      );
      document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(
        obj.totalExp,
        'exp'
      );

      if (obj.percentage > 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent =
          obj.percentage + ' %';
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent = '---';
      }
    },

    //Display percentage
    displayPercentage: function (percentage) {
      let fields = document.querySelectorAll(DOMstrings.expensePercentageLabel);

      nodeListForEach(fields, function (current, index) {
        //do code
        if (percentage[index] > 0) {
          current.textContent = percentage[index] + ' %';
        } else {
          current.textContent = '---';
        }
      });
    },

    //function
    displayDate: function () {
      let now, year, currentMonth, months;
      now = new Date();
      months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      currentMonth = now.getMonth();
      year = now.getFullYear();
      document.querySelector(DOMstrings.dateLabel).textContent =
        months[currentMonth] + ' ' + year;
    },

    //inc or exp change
    changedType: function () {
      let fields = document.querySelectorAll(
        DOMstrings.inputType +
          ',' +
          DOMstrings.inputDescription +
          ',' +
          DOMstrings.inputValue
      );
      nodeListForEach(fields, function (current, index) {
        current.classList.toggle('red-focus');
      });

      document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
    },

    //makes all  DOM elements public
    getDOMstrings: function () {
      return {
        DOMstrings,
      };
    },
  };
})();
