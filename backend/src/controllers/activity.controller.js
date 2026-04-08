const { readData
} = require("../utils/fileDB");

const getActivity = (req, res) => {
  const captures = readData("captures.json");

  const latest = captures.slice(-20).reverse();

  res.json(latest);
};

module.exports = {
  getActivity
};