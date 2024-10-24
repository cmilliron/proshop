export function throwError(code, message) {
  res.status(code);
  throw new Error(message);
}
