const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("../Users/userRoute"));
app.use(require("../Loans/loanRoute"));

app.listen(PORT, () => {
  console.log(`Server is listening on port : ${PORT}`);
});
