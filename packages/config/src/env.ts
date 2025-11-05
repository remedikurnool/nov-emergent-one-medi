// Environment Configuration Helper
export function getEnv(key: string, defaultValue?: string): string {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] || defaultValue || '';
  }
  return defaultValue || '';
}

export function getEnvOrThrow(key: string): string {
  const value = getEnv(key);
  if (!value) {
    throw new Error(`Environment variable ${key} is required but not set`);
  }
  return value;
}
