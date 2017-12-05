var rndZ = require('random-z'),
		N = require('norm-dist')

/**
 * LogNormal Distribution
 * @param {number} low - range lower bound
 * @param {number} high - range lower bound
 * @param {number} [prob] - confidence interval
 * @returns {function(number):number} - random number generator
 */
module.exports = function logn(low, high, prob) {
	if (low <= 0 || high <= low) throw Error('LogNormal values must be 0 < L < H')
	var mu = Math.log(high*low) / 2,
			si = Math.log(high/low) / N.icdf( (1 + (prob || 0.5)) / 2 ) / 2

	return function(zSeed) {
		return Math.exp((zSeed === undefined ? rndZ() : zSeed) * si + mu)
	}
}
