class ExpressError extends Error {
  constructor(statusCode, message) {
    super(); // call the Error constructor
    this.statusCode = statusCode;
    this.message = message;
  }
}

module.exports = ExpressError;
