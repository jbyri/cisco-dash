index = (req, res) => {
  res.json({
    message: "Welcome to custom-react-boilerplate!",
    documentation_url: "https://github.com/wnamen/custom-react-boilerplate",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"}
    ]
  });
}

module.exports.index = index;




// base_url: "http://tunely.herokuapp.com",
