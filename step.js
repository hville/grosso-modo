var iZ = require('norm-dist/icdf'),
		N = require('norm-dist')

/**
 * Bernouilli Trial
 * @param {number} fail - failure value
 * @param {number} succ - success value
 * @param {number} [prob] - probability of success
 * @returns {Function} - random number generator
 */
module.exports = function(fail, succ, prob) { // prob == P(X==H)
	var edge = -N.icdf(prob || 0.5)

	/**
	 * @param {number} [zSeed]
	 * @returns {number}
	 */
	return function(zSeed) {
		return ((zSeed === undefined ? iZ(Math.random()) : zSeed) > edge) ? succ : fail
	}
}
