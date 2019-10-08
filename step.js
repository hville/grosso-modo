var icdf = require('norm-dist/icdf')

/**
 * Bernouilli Trial
 * @param {number} fail - failure value
 * @param {number} succ - success value
 * @param {number} [prob] - probability of success
 * @returns {Function} - random number generator
 */
module.exports = function(fail, succ, prob) { // prob == P(X==H)
	var edge = -icdf(prob || 0.5)

	/**
	 * @param {number} [zSeed]
	 * @returns {number}
	 */
	return function(zSeed) {
		return ((zSeed === undefined ? icdf(Math.random()) : zSeed) > edge) ? succ : fail
	}
}
