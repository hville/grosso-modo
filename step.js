import icdf from 'norm-dist/icdf.js'

/**
 * Bernouilli Trial
 * @param {number} fail - failure value
 * @param {number} succ - success value
 * @param {number} [prob] - probability of success
 * @returns {number => number} - random number generator
 */
 export default function(fail, succ, prob=0.5) { // prob == P(X==H)
	const edge = -icdf(prob)

	/**
	 * @param {number} [zSeed]
	 * @returns {number}
	 */
	return function(zSeed) {
		return ((zSeed === undefined ? icdf(Math.random()) : zSeed) > edge) ? succ : fail
	}
}
