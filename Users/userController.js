const { getExistingUsers, addNewUser, getUser } = require("./userData");

exports.getAUser = (req, res, next) => {
  const userId = req.params.userId;
  const user = getUser(userId);
  if (!user) {
    return res.status(400).json({
      error: `User with the following Id : ${userId} does not exist`
    });
  }
  res.status(200).json({ data: user });
};

exports.getAllUsers = (req, res, next) => {
  const user = getExistingUsers;
  res.status(200).json({ data: user });
};

exports.addUser = (req, res, next) => {
  const { name, email, password } = req.body;
  const userAlreadyExists = getExistingUsers.filter(
    user => user.email === email
  )[0];
  if (userAlreadyExists) {
    return res.status(400).json({
      error: `A user with the email : ${email} already exists`
    });
  }
  const newUser = addNewUser({ name, email, password });
  res.status(200).json({
    data: newUser,
    message: "A new User has been created"
  });
};

exports.userLogin = (req, res, next) => {
  const { email, password } = req.body;
  const user = getExistingUsers.find(user => user.email === email);
  if (!user) {
    return res.status(401).json({
      error: `Wrong Email or password`
    });
  }
  if (user.password !== password) {
    return res.status(401).json({
      error: `Wrong Email or password`
    });
  }
  res.status(200).json({ data: user });
};
