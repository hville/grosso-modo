var rndZ = require('random-z'),
		N = require('norm-dist'),
		WalkZ = require('walk-z')

/**
 * Random Walk Sum
 * @param {number} low - range lower bound at t1
 * @param {number} high - range lower bound at t1
 * @param {number} [prob] - confidence interval at t1
 * @returns {function(number, number): number} - random number generator
 */
module.exports = function walk(low, high, prob) {
	var wk = WalkZ(),
			mu = (high + low) / 2,
			si = (high - low) / N.icdf( (1 + (prob || 0.5)) / 2 ) / 2

	return function(time, zSeed) {
		return wk(time, (zSeed === undefined ? rndZ() : zSeed)) * si + mu
	}
}
