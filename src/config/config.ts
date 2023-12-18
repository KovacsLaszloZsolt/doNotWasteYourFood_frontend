type Primitive = string | boolean | number;

export const getEnv = (
  type: 'boolean' | 'string' | 'number',
  value: string | undefined,
  defaultValue: Primitive
): Primitive => {
  if (value !== undefined) {
    switch (type) {
      case 'boolean':
        return value.toLowerCase() === 'true';
      case 'string':
        return value;
      case 'number':
        const parsedNumber = parseFloat(value);
        return isNaN(parsedNumber) ? defaultValue : parsedNumber;
    }
  }
  return defaultValue;
};

export const config = Object.freeze({
  backendUrl: getEnv('string', process.env.EXPO_BACKEND_URL, 'http://127.0.0.1:1337')
});
