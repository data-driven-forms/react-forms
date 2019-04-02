class DefaultSchemaError extends Error {
  constructor(...args) {
    super(...args);
    this.name = 'DefaultSchemaError';
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = (new Error(args[0])).stack;
    }
  }
}

export default DefaultSchemaError;
