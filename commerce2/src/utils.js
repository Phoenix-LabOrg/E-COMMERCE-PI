const { fileURLToPath } = require('url');
const { dirname } = require('path');
const __dirname = dirname(fileURLToPath(require.main.index));
module.exports = __dirname;



//const __dirname = require('./utils');