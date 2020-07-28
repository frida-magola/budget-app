/**********************************************************
 * BUDGET GLOBAL APP CONTROLLER
 * Handle budgetController and uiController
 * ********************************************************
 */

let controller = (function (budgetCtrl, uiCtrl) {
  //Private setup eventListener function for budget app
  let setupEventsListener = function () {
    //add btn selector
    const DOM = uiCtrl.getDOMstrings();
    document
      .querySelector(DOM.DOMstrings.inputBtn)
      .addEventListener('click', ctrlAddItem);

    //return fields data when enter key is press
    document.addEventListener('keypress', function (event) {
      // console.log(event);
      if (event.keyCode === 13 || event.which === 13) {
        //   console.log("ENTER");
        ctrlAddItem();
      }
    });

    //event delegation
    document
      .querySelector(DOM.DOMstrings.container)
      .addEventListener('click', ctrlDeleteItem);

    //change event
    document
      .querySelector(DOM.DOMstrings.inputType)
      .addEventListener('change', function () {
        uiCtrl.changedType();
      });
  };

  //update budget function
  let updateBudget = function () {
    //1. calculate the budget
    budgetCtrl.calculateBudget();

    //2. Return the budget
    let budget = budgetCtrl.getBudget();

    //3. Display the budget on the UI
    // console.log(budget);
    uiCtrl.displayBudget(budget);
  };

  //update percentage
  let updatePercentage = function () {
    //1. calculate percentage
    budgetCtrl.calculatePercentage();

    //2. read percentage from the budget controller
    let percentage = budgetCtrl.getPercentage();
    // console.log(percentage);

    //3. update the UI with the new percentage
    uiCtrl.displayPercentage(percentage);
  };

  //Private function add item ctrl
  let ctrlAddItem = function () {
    //Declare all the variable
    let input, newItem;

    //1. get input fields inputs data
    input = uiCtrl.getInput();
    // console.log(input);

    //validation of the fields
    if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
      //2. add the item to the budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);
      // console.log(newItem);

      //3. add a new item to the UI
      uiCtrl.addListItem(newItem, input.type);

      //4.clear input data after inserting into the DOM
      uiCtrl.clearFields();

      //5. calculate and update the budget
      updateBudget();

      //6. calculate and update the percentage
      updatePercentage();
    }
  };

  //ctrl delete button function
  let ctrlDeleteItem = function (event) {
    let itemId, splitId, type, ID;
    itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if (itemId) {
      //inc-1
      splitId = itemId.split('-');
      type = splitId[0];
      ID = parseInt(splitId[1]);

      //1. delete item from the data structure
      budgetCtrl.deleteItem(type, ID);

      //2. delete the item from the UI
      uiCtrl.deleteListItem(itemId);

      //3. update and show the new budget
      updateBudget();

      //4. update the percentage
      updatePercentage();
    }
    // console.log(itemId);
  };

  //public function init
  return {
    init: function () {
      console.log('Application has started!');
      uiCtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1,
      });
      uiCtrl.displayDate();
      setupEventsListener();
    },
  };
})(budgetController, uiController);
