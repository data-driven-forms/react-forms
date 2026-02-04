const fnToString = <T extends (...args: unknown[]) => unknown>(fn: T | string = ''): string => fn.toString().replace(/\s+/g, ' ');

export default fnToString;
