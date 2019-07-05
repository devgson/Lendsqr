const express = require("express");
const router = express.Router();
const loan = require("./loanController");

router.get("/loans", loan.getAllLoans);
router.post("/loan/:loanId/user/:userId", loan.applyForLoan);

module.exports = router;
