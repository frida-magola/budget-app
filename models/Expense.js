// create  function constructor for expense
let Expense = function (id, description, value) {
  this.id = id;
  this.description = description;
  this.value = value;
  this.percentage = -1;
};
