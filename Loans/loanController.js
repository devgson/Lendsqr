const moment = require("moment");
const { getExistingLoans } = require("./loanData");
const { updateUserLoanData, getUser } = require("../Users/userData");

const canUserApplyforNewLoan = function(user) {
  const activeLoans = user.loans.filter(loan => {
    return moment(loan.loanEndDate).isAfter(moment());
  });
  return activeLoans.length > 0 ? false : true;
};

exports.getAllLoans = (req, res, next) => {
  const loans = getExistingLoans;
  res.status(200).json({ data: loans });
};

exports.applyForLoan = (req, res, next) => {
  const userId = req.params.userId;
  const loanId = req.params.loanId;
  if (!userId)
    return res.status(400).json({
      error: "The User ID is required"
    });
  if (!loanId)
    return res.status(400).json({
      error: "The Loan ID is required"
    });
  const user = getUser(userId);
  if (!user)
    return res.status(400).json({
      error: "The User with that ID cannot be found"
    });
  const loan = getExistingLoans.find(loans => loans.loanId === loanId);
  if (!loan) {
    return res.status(400).json({
      error: "The loan does not exist"
    });
  }
  if (canUserApplyforNewLoan(user) === false) {
    return res.status(200).json({
      error: "You currently have a running loan and cannot apply for a new loan"
    });
  }
  const updatedUser = updateUserLoanData(userId, loan);
  res.status(200).json({
    data: updatedUser,
    message: "You have successfully applied for a loan"
  });
};
