import cdf from 'norm-dist/cdf.js'

/**
 * Uniform Distribution
 * @param {number} low - range lower bound
 * @param {number} high - range lower bound
 * @param {number} [prob] - confidence interval
 * @returns {number => number} - random number generator
 */
 export default function(low, high, prob=0.5) {
	if (high <= low) throw Error('high <= low')
	var rng = (high - low) / prob,
			min = (high + low - rng)/2

	/**
 	 * @param {number} [zSeed]
	 * @returns {number}
	 */
	return function(zSeed) {
		var p = zSeed === undefined ? Math.random() : cdf(zSeed)
		return min + p * rng
	}
}
