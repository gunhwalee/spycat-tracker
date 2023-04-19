const axios = require("axios");

exports.trafficParser = function (apikey, host) {
  return function (req, res, next) {
    axios
      .post(
        `http://localhost:4000/api/users/${apikey}/servers/${host}/traffics`,
        {
          type: "traffic",
          path: req.url,
          host: req.headers.host,
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error sending traffic data:", error.message);
      });

    next();
  };
};

exports.errorParser = function (apikey, host) {
  return function (err, req, res, next) {
    axios
      .post(
        `http://localhost:4000/api/users/${apikey}/servers/${host}/errors`,
        {
          type: "error",
          errorName: err.name,
          errorMessage: err.message,
          errorStack: err.stack,
          path: req.url,
          method: req.method,
          host: req.headers.host,
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error sending error data:", error.message);
      });

    next(err);
  };
};
