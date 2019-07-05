const moment = require("moment");
const existingUsers = [
  {
    userId: "1",
    name: "Ren Money",
    email: "renmoney@yahoo.com",
    password: "renmoney",
    loans: []
  },
  {
    userId: "2",
    name: "Kia kia",
    email: "kiakia@yahoo.com",
    password: "kiakia",
    loans: []
  }
];

exports.getExistingUsers = existingUsers;

exports.getUser = function(userId) {
  return existingUsers.find(user => user.userId === userId);
};

exports.addNewUser = function(userDetails) {
  userDetails.userId = String(existingUsers.length + 1);
  userDetails.loans = [];
  existingUsers.push(userDetails);
  return userDetails;
};

exports.updateUserLoanData = function(userId, loan) {
  const userIndex = existingUsers.findIndex(users => users.userId === userId);
  const newLoan = {
    loanId: loan.loanId,
    loanStartDate: moment(),
    loanEndDate: moment().add(parseInt(loan.tenure), "months")
  };
  existingUsers[userIndex].loans.push(newLoan);
  return existingUsers[userIndex];
};
