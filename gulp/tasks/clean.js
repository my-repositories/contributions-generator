const del = require('del');

const config = require('../config');

module.exports = function cleanTask() {
    const deleteFn = del.deleteAsync || del;
    return deleteFn(config.path.clean, { force: true });
};
