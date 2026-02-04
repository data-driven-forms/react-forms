const deepEqual = (a: any, b: any, depth: number = 0): boolean => {
  if (depth > 4) {
    console.error('Recursion limit of 5 has been exceeded.');
    return false;
  }

  if (a === b) {
    return true;
  }

  if (Array.isArray(a) && Array.isArray(b) && a.length === b.length) {
    return a.every((item, index) => deepEqual(item, b[index]));
  }

  if (typeof a === 'object' && typeof b === 'object' && a !== null && b !== null) {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) {
      return false;
    }

    for (const key of keysA) {
      if (!keysB.includes(key) || !deepEqual(a[key], b[key], depth + 1)) {
        return false;
      }
    }

    return true;
  }

  return false;
};

export default deepEqual;
