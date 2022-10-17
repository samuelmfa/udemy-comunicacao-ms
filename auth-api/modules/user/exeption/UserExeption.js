class UserExeption extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.message = message;
    this.name = this.construtor.name;
    Error.captureStackTrace(this.this.construtor);
  }
}

module.exports = UserExeption;
