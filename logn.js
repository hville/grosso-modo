var icdf = require('norm-dist/icdf')

/**
 * LogNormal Distribution
 * @param {number} low - range lower bound
 * @param {number} high - range lower bound
 * @param {number} [prob] - confidence interval
 * @returns {Function} - random number generator
 */
module.exports = function(low, high, prob) {
	if (low <= 0 || high <= low) throw Error('LogNormal values must be 0 < L < H')
	var mu = Math.log(high*low) / 2,
			si = Math.log(high/low) / icdf( (1 + (prob || 0.5)) / 2 ) / 2
	/**
 	 * @param {number} [zSeed]
	 * @returns {number}
	 */
	return function(zSeed) {
		return Math.exp((zSeed === undefined ? icdf(Math.random()) : zSeed) * si + mu)
	}
}
