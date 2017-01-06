var rndZ = require('random-z'),
		N = require('norm-dist'),
		WalkZ = require('walk-z')

//P(low <= X < high)
module.exports = {
	norm: norm,
	logn: logn,
	step: step,
	walk: walk,
	rate: rate,
}

/**
 * Normal Distribution
 * @param {number} low - range lower bound
 * @param {number} high - range lower bound
 * @param {number} [prob] - confidence interval
 * @returns {Function} - random number generator
 */
function norm(low, high, prob) {
	var mu = (high + low) / 2,
			si = (high - low) / N.icdf( (1 + (prob || 0.5)) / 2 ) / 2

	return function(zSeed) {
		return (zSeed === undefined ? rndZ() : zSeed) * si + mu
	}
}

/**
 * LogNormal Distribution
 * @param {number} low - range lower bound
 * @param {number} high - range lower bound
 * @param {number} [prob] - confidence interval
 * @returns {Function} - random number generator
 */
function logn(low, high, prob) {
	if (low <= 0 || high <= low) throw Error('LogNormal values must be 0 < L < H')
	var mu = Math.log(high*low) / 2,
			si = Math.log(high/low) / N.icdf( (1 + (prob || 0.5)) / 2 ) / 2

	return function(zSeed) {
		return Math.exp((zSeed === undefined ? rndZ() : zSeed) * si + mu)
	}
}

/**
 * Bernouilli Trial
 * @param {number} fail - failure value
 * @param {number} succ - success value
 * @param {number} [prob] - probability of success
 * @returns {Function} - random number generator
 */
function step(fail, succ, prob) { // prob == P(X==H)
	var edge = -N.icdf(prob || 0.5)

	return function(zSeed) {
		return ((zSeed === undefined ? rndZ() : zSeed) > edge) ? succ : fail
	}
}

/**
 * Random Walk Sum
 * @param {number} low - range lower bound at t1
 * @param {number} high - range lower bound at t1
 * @param {number} [prob] - confidence interval at t1
 * @returns {Function} - random number generator
 */
function walk(low, high, prob) {
	var wk = WalkZ(),
			mu = (high + low) / 2,
			si = (high - low) / N.icdf( (1 + (prob || 0.5)) / 2 ) / 2

	return function(time, zSeed) {
		return wk(time, (zSeed === undefined ? rndZ() : zSeed)) * si + mu
	}
}

/**
 * Random Walk Product
 * @param {number} low - range lower bound at t1
 * @param {number} high - range lower bound at t1
 * @param {number} [prob] - confidence interval at t1
 * @returns {Function} - random number generator
 */
function rate(low, high, prob) {
	var wk = WalkZ(),
			mu = Math.log(high*low) / 2,
			si = Math.log(high/low) / N.icdf( (1 + (prob || 0.5)) / 2 ) / 2

	return function(time, zSeed) {
		return Math.exp(wk(time, zSeed === undefined ? rndZ() : zSeed) * si + mu)
	}
}
