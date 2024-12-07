export const assertNever = (_: never): never => {
  throw Error("Assertion error: Unreachable");
};
