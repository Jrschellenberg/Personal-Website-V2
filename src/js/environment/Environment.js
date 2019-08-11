export default class Environment {
  static isDevelopment = process.env.NODE_ENV !== 'production';

  static isTestEnvironemnt = process.env.NODE_ENV === 'test';

  static isDevelopment() {
    return Environment.isDevelopment;
  }
  static isProduction() {
    return !Environment.isDevelopment;
  }
  static isTestEnvironment() {
    return Environment.isTestEnvironemnt;
  }
}
