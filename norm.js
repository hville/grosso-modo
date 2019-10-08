var icdf = require('norm-dist/icdf')

/**
 * Normal Distribution
 * @param {number} low - range lower bound
 * @param {number} high - range lower bound
 * @param {number} [prob] - confidence interval
 * @returns {Function} - random number generator
 */
module.exports = function(low, high, prob) {
	var mu = (high + low) / 2,
			si = (high - low) / icdf( (1 + (prob || 0.5)) / 2 ) / 2

	/**
 	 * @param {number} [zSeed]
	 * @returns {number}
	 */
	return function(zSeed) {
		return (zSeed === undefined ? icdf(Math.random()) : zSeed) * si + mu
	}
}
