var iZ = require('norm-dist/icdf'),
		N = require('norm-dist'),
		WalkZ = require('walk-z')

/**
 * Random Walk Product
 * @param {number} low - range lower bound at t1
 * @param {number} high - range lower bound at t1
 * @param {number} [prob] - confidence interval at t1
 * @returns {Function} - random number generator
 */
module.exports = function(low, high, prob) {
	var wk = WalkZ(),
			mu = Math.log(high*low) / 2,
			si = Math.log(high/low) / N.icdf( (1 + (prob || 0.5)) / 2 ) / 2

	/**
 	 * @param {number} time
	 * @param {number} [zSeed]
	 * @returns {number}
	 */
	return function(time, zSeed) {
		return Math.exp(wk(time, zSeed === undefined ? iZ(Math.random()) : zSeed) * si + mu)
	}
}
