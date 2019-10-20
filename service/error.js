function handleError(fn) {
  return function(...params) {
    const [req, res, next] = params;
    return fn(...params).catch(err => {
      return res.status(400).json({
        _status: {
          msg: err.message,
          className: "failed"
        }
      });
    });
  };
}

module.exports = {
  handleError
};
