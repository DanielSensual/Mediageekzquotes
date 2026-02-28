const { DEFAULT_RATES } = require('../engine');

module.exports = (_req, res) => {
    res.json(DEFAULT_RATES);
};
