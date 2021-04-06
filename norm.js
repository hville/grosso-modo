import icdf from 'norm-dist/icdf.js'

/**
 * Normal Distribution
 * @param {number} low - range lower bound
 * @param {number} high - range lower bound
 * @param {number} [prob] - confidence interval
 * @returns {number => number} - random number generator
 */
export default function(low, high, prob=0.5) {
	if (high <= low) throw Error('high <= low')
	const mu = (high + low) / 2,
				si = (high - low) / icdf( (1 + prob) / 2 ) / 2

	/**
 	 * @param {number} [zSeed]
	 * @returns {number}
	 */
	return function(zSeed) {
		return (zSeed === undefined ? icdf(Math.random()) : zSeed) * si + mu
	}
}
