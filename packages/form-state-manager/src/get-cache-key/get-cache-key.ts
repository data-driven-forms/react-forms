function getCacheKey(keyTemplate: any): string {
  if (keyTemplate === null) {
    return 'null';
  }

  if (typeof keyTemplate === 'undefined') {
    return 'undefined';
  }

  if (typeof keyTemplate === 'string' || typeof keyTemplate === 'number' || typeof keyTemplate === 'boolean') {
    return keyTemplate.toString();
  }

  if (Array.isArray(keyTemplate)) {
    let result = '';
    for (let index = 0; index < keyTemplate.length; index++) {
      result = result.concat(getCacheKey({ [index.toString()]: keyTemplate[index] }));
    }

    return result;
  }

  if (typeof keyTemplate === 'object') {
    const keys = Object.keys(keyTemplate);
    let result = '';
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      result = result.concat(key + getCacheKey(keyTemplate[key]));
    }

    return result;
  }

  throw new Error(`Invalid cache keyTemplate type! ${keyTemplate}. Given type: ${typeof keyTemplate}`);
}

export default getCacheKey;
