const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  "env": {
    "node": true,
  },
  "extends": [
    "oclif",
    "oclif-typescript"
  ],
  "rules": {
    "object-curly-spacing": OFF,
    "semi": OFF,
    "no-process-exit": OFF,
    "unicorn/no-process-exit": OFF,
    "unicorn/prevent-abbreviations": OFF,

    "unicorn/filename-case": [ERROR, {
      "cases": {
        "camelCase": true,
        "pascalCase": true,
      }
    }],
  },
};
