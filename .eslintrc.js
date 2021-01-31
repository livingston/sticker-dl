const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  "extends": [
    "oclif",
    "oclif-typescript"
  ],
  "rules": {
    "object-curly-spacing": OFF,
    "semi": OFF,
  }
};
