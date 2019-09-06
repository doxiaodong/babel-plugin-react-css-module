const { resolve } = require('path');

module.exports = {
  plugins: [[resolve(__dirname, '../../../src/index.ts')]],
};
