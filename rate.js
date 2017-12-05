var rndZ = require('random-z'),
		N = require('norm-dist'),
		WalkZ = require('walk-z')

/**
 * Random Walk Product
 * @param {number} low - range lower bound at t1
 * @param {number} high - range lower bound at t1
 * @param {number} [prob] - confidence interval at t1
 * @returns {function(number, number): number} - random number generator
 */
module.exports = function rate(low, high, prob) {
	var wk = WalkZ(),
			mu = Math.log(high*low) / 2,
			si = Math.log(high/low) / N.icdf( (1 + (prob || 0.5)) / 2 ) / 2

	return function(time, zSeed) {
		return Math.exp(wk(time, zSeed === undefined ? rndZ() : zSeed) * si + mu)
	}
}
